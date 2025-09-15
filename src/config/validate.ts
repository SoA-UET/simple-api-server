import { Config } from "./config.interface";
import { validationSchema } from "./schema";

export function validateConfig(config: Record<any, any>): Config {
  const { error, value: validatedConfig } = validationSchema.validate(config, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return validatedConfig as Config;
}
