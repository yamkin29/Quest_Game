// Автофикс (форматирование, organizeImports, безопасные фиксы) на staged-файлах;
// исправления lint-staged сам возвращает в индекс.
// package-lock.json и прочие lock-файлы Biome игнорирует по умолчанию.
const config = {
  "*.{js,jsx,ts,tsx,json,jsonc,css,graphql}":
    "biome check --write --no-errors-on-unmatched",
};

export default config;
