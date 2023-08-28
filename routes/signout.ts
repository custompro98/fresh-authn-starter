import { Handlers } from "$fresh/server.ts";
import { signOut } from "deno-kv-oauth";

export const handler: Handlers = {
  async GET(req) {
    return await signOut(req);
  },
};
