import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { getPendingWeekGoals } from '../functions/get-pending-week-goals';
import { createGoalRoute } from './routes/create-goal';
import { createGoalCompletionRoute } from './routes/create-goal-completion';
import { getPendingWeekGoalsRoute } from './routes/get-pending-week-goals';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getPendingWeekGoalsRoute)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server Running!');
});