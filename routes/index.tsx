import { Handlers, PageProps } from "$fresh/server.ts";
import { getSessionAccessToken, getSessionId } from "deno-kv-oauth";
import { Profile, googleOAuth } from "../utils/oauth2_client.ts";

export const handler: Handlers<Profile | null> = {
  async GET(req, ctx) {
    const sessionId = await getSessionId(req);

    if (!sessionId) {
      return ctx.render(null);
    }

    const accessToken = await getSessionAccessToken(
      googleOAuth.client,
      sessionId
    );
    const response = await fetch(googleOAuth.discovery.userinfo_endpoint, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const user: Profile = await response.json();
    return ctx.render(user);
  },
};

export default function Home({ data }: PageProps<Profile>) {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        {data ? (
          <div className="flex flex-col items-center">
            <span className="py-1">{data.email}</span>
            <img
              className="py-1"
              src={data.picture.toString()}
              width="64"
              height="64"
            />
            <a href="/signout">Sign out</a>
          </div>
        ) : (
          <a href="/signin">Sign in</a>
        )}
      </div>
    </div>
  );
}
