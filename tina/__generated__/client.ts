import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: '/Users/Long/Desktop/SAWC tina/tina/__generated__/.cache/1779441722201', url: 'http://localhost:4001/graphql', token: 'dummytoken', queries,  });
export default client;
  