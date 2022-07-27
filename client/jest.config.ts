import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.(scss)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
};
export default config;
