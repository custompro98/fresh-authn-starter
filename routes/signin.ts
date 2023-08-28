import { Handlers } from "$fresh/server.ts";
import { signIn } from "deno-kv-oauth";
import { googleOAuth } from "../utils/oauth2_client.ts";

export const handler: Handlers = {
  async GET(req) {
    return await signIn(req, googleOAuth.client);
  },
};
