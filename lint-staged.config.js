// Auto-fix (formatting, organizeImports, safe fixes) on staged files;
// lint-staged applies the modifications back to the index.
// package-lock.json and other lockfiles are ignored by Biome by default.
const config = {
  "*.{js,jsx,ts,tsx,json,jsonc,css,graphql}":
    "biome check --write --no-errors-on-unmatched",
};

export default config;
