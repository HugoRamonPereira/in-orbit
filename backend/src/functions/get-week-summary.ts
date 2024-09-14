import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import dayjs from "dayjs";

export async function getWeekSummary() {
  const firstDayOfTheWeek = dayjs().startOf("week").toDate();
  const lastDayOfTheWeek = dayjs().endOf("week").toDate();

  const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfTheWeek))
  );

  const goalsCompletedInAWeek = db.$with("goal_completed_in_a_week").as(
    db
      .select({
        id: goalCompletions.id,
        title: goals.title,
        dateAndTimeOfCompletion: goalCompletions.createdAt,
        dateOfCompletion: sql`
          DATE(${goalCompletions.createdAt})
        `.as('dateOfCompletion')
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfTheWeek),
          lte(goalCompletions.createdAt, lastDayOfTheWeek)
        )
      )
  );

  const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
    db
      .select({
        dateOfCompletion: goalsCompletedInAWeek.dateOfCompletion,
        completions: sql`
           JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ${goalsCompletedInAWeek.id},
              'title', ${goalsCompletedInAWeek.title},
              'dateOfCompletion', ${goalsCompletedInAWeek.dateOfCompletion}
            )
           )
        `.as('completions')
      })
      .from(goalsCompletedInAWeek)
      .groupBy(goalsCompletedInAWeek.dateOfCompletion)
  )

  const result = await db
    .with(goalsCreatedUpToWeek, goalsCompletedInAWeek, goalsCompletedByWeekDay)
    .select({
      completed: sql`(SELECT COUNT(*) FROM ${goalsCompletedInAWeek})`.mapWith(
        Number
      ),
      total:
        sql`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
          Number
        ),
      goalsPerDay: sql`
        JSON_OBJECT_AGG(
          ${goalsCompletedByWeekDay.dateOfCompletion},
          ${goalsCompletedByWeekDay.completions}
        )
      `
    })
    .from(goalsCompletedByWeekDay);

  return {
    summary: result,
  };
}