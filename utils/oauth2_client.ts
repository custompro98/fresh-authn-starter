import { createGoogleOAuth2Client } from "deno-kv-oauth";

type OAuth2Client = ReturnType<typeof createGoogleOAuth2Client>;

interface DiscoveryDocument {
  userinfo_endpoint: URL;
}

interface OAuthPackage {
  discovery: DiscoveryDocument;
  client: OAuth2Client;
}

export type Profile = GoogleProfile;

export enum Provider {
  GOOGLE = "google",
}

// GOOGLE
export interface GoogleProfile {
  kind: Provider.GOOGLE;
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: URL;
  email: string;
  email_verified: boolean;
  locale: string;
}

const googleOauth2Client = createGoogleOAuth2Client({
  defaults: {
    scope: ["openid", "email", "profile"],
  },
  redirectUri: `http://${Deno.env.get("HOST")}:${Deno.env.get("PORT")}/${
    Provider.GOOGLE
  }/callback`,
});

export const googleOAuth: OAuthPackage = {
  client: googleOauth2Client,
  discovery: {
    userinfo_endpoint: new URL(
      "https://openidconnect.googleapis.com/v1/userinfo"
    ),
  },
};
