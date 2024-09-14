import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getPendingWeekGoals } from "../../functions/get-pending-week-goals";

export const getPendingWeekGoalsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/pending-goals", async () => {
    const { pendingGoals } = await getPendingWeekGoals();

    return { pendingGoals };
  });
};
