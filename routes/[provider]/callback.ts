import { Handlers } from "$fresh/server.ts";
import { handleCallback } from "deno-kv-oauth";
import { Provider, googleOauth2Client } from "../../utils/oauth2_client.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const provider = stringToProvider(ctx.params.provider.toLowerCase());

    if (!provider) {
      return new Response("invalid provider", { status: 400 });
    }

    let response: Response;

    switch (provider) {
      case Provider.GOOGLE: {
        response = await handleGoogleCallback(req);

        break;
      }
      default:
        return new Response("unimplemented", { status: 501 });
    }

    return response;
  },
};

const stringToProvider = (str: string): Provider | null => {
  switch (str) {
    case "google":
      return Provider.GOOGLE;
    default:
      return null;
  }
};

const handleGoogleCallback = async (req: Request): Promise<Response> => {
  // Return object also includes `accessToken` and `sessionId` properties.
  const {
    response,
    sessionId: _sesionId,
    accessToken,
  } = await handleCallback(req, googleOauth2Client);

  const profileResponse = await fetch(
    "https://openidconnect.googleapis.com/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const json = await profileResponse.json();
  const profile = {
    ...json,
    picture: new URL(json.picture),
    kind: Provider.GOOGLE,
  };

  console.log(profile);

  return response;
};
