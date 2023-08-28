import { Handlers } from "$fresh/server.ts";
import { signIn } from "deno-kv-oauth";
import { googleOauth2Client } from "../utils/oauth2_client.ts";

export const handler: Handlers = {
  async GET(req) {
    return await signIn(req, googleOauth2Client);
  },
};
