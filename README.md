# Fresh AuthN Starter

A Deno Fresh starter kit leveraging [Deno KV OAuth](https://fresh.deno.dev/docs/examples/using-deno-kv-oauth).

### Set up

#### Google OAuth

1. Create a new project on [Google Web Console](https://console.cloud.google.com/)
1. Configure the [OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent?project=fresh-authn-starter)
    * *Note:* Scopes needed are:
        * ../auth/userinfo.email
        * ../auth/userinfo.profile
        * openid
1. Create a new OAuth 2.0 Client ID under [Credentials](https://console.cloud.google.com/apis/credentials) with an `Application type` of "Web application"
1. Add `http://localhost:8000/auth/google/callback` as an "Authorized Redirect URI"
    * *Note:* this redirect uri must match the value set in [oauth2_client.ts](utils/oauth2_client.ts)
1. Enter the credentials in a local `.env` file copied from [.env.example](.env.example) (the `# GOOGLE` section)
    * *Note:* the secret names are automatically picked up via [Deno KV Oauth](https://deno.land/x/deno_kv_oauth@v0.4.0/mod.ts?s=createGoogleOAuth2Client)

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
