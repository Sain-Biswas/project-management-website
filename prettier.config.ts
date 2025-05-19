import type { Config } from "prettier";

export default {
  semi: true,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "none",
  plugins: ["prettier-plugin-tailwindcss"]
} satisfies Config;
