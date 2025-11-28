import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 특정 파일에 대한 규칙을 오버라이드
  {
    files: ["tailwind.config.js", "postcss.config.mjs"], // require()를 사용하는 파일들
    rules: {
      "@typescript-eslint/no-require-imports": "off", // 해당 규칙 비활성화
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
