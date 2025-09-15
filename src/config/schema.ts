import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  HOST: Joi.string().default("localhost"),
  PORT: Joi.number().default(3000),
  MONGODB_URI: Joi.string().required(),
});
