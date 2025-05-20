/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "none",
  plugins: ["prettier-plugin-tailwindcss"]
};

export default config;
