import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: '/Users/Long/.gemini/antigravity-ide/scratch/sawc/tina/__generated__/.cache/1779358943355', url: 'http://localhost:4001/graphql', token: 'dummy', queries,  });
export default client;
  