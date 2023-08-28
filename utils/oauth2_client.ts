import { createGoogleOAuth2Client } from "deno-kv-oauth";

export enum Provider {
    GOOGLE = "google",
}

export interface GoogleProfile {
    kind: Provider.GOOGLE,
    sub: string,
    name: string,
    given_name: string,
    family_name: string,
    picture: URL,
    email: string,
    email_verified: boolean,
    locale: string,
}

export type Profile = GoogleProfile

export const googleOauth2Client = createGoogleOAuth2Client({
    defaults: {
        scope: ["openid", "email", "profile"],
    },
    redirectUri: `http://${Deno.env.get("HOST")}:${Deno.env.get("PORT")}/google/callback`,
});
