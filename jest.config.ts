import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
      "^.+\\.tsx?$": [
        "ts-jest",
        {
          useESM: true,
        },
      ],
    },
  };
};
