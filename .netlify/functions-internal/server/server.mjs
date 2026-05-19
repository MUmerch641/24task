export { default } from "./main.mjs";
export const config = {
  name: "server handler",
  generator: "nitro@3.0.1-20260518-130639-31265391",
  path: "/*",
  nodeBundler: "none",
  includedFiles: ["**"],
  excludedPath: ["/.netlify/*"],
  preferStatic: true,
};