import z from "zod";

const envschema = z.object({
  DATABASE_URL: z.string().url(),
});

export const env = envschema.parse(process.env);
