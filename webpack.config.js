import dev from "./config/webpack.config.dev.js";
import pro from "./config/webpack.config.pro.js";

export default function(env, argv) {
  return argv.mode === "development" ? dev() : pro();
}
