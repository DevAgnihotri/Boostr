How to get your GitHub OAuth Client ID and Client Secret

This file shows the exact steps to create a GitHub OAuth (OAuth App) and where to put the values in your Next.js project.

1. Decide callback (redirect) URL for your app

- For local development using the default Next.js port use:
  - http://localhost:3000/api/auth/callback/github
- If you're deploying, set it to your site URL, e.g.:
  - https://your-domain.com/api/auth/callback/github
- This project uses NextAuth at `app/api/auth/[...nextauth]/route.js`, so the callback URL above is correct for the GitHub provider.

2. Create an OAuth App on GitHub

- Open: https://github.com/settings/developers
- Click "OAuth Apps" (left sidebar)
- Click "New OAuth App"
- Fill the form:
  - Application name: (e.g. "My Next.js App")
  - Homepage URL: https://your-domain.com (or http://localhost:3000 for dev)
  - Application description: optional
  - Authorization callback URL: <the callback URL from step 1> (e.g. http://localhost:3000/api/auth/callback/github)
- Click "Register application"

3. Copy the credentials

- After registering you will see:
  - Client ID (visible immediately)
  - Client Secret (click "Generate a new client secret" if none or if you need a new one)
- Copy both values. Treat the Client Secret like a password — do NOT commit it to source control.

4. Add them to your project environment

- Create a file named `.env.local` in the project root (this file is for local-only secrets and should be in `.gitignore`). Example contents:

GITHUB_ID=your_client_id_here
GITHUB_SECRET=your_client_secret_here
NEXT_PUBLIC_URL=http://localhost:3000
MONGO_URI=mongodb://<username>:<password>@host:port/dbname

# other keys used by this project (example):

# RAZORPAY_KEY=...

# RAZORPAY_SECRET=...

- Restart your dev server after adding or changing `.env.local` so the new env vars are loaded.

5. Security & best practices

- Never commit `.env.local` to git. Make sure `.gitignore` contains it.
- For deployed environments (Vercel, Netlify, Heroku, etc.) set `GITHUB_ID` and `GITHUB_SECRET` in the host's environment/config panel — do NOT put them into the repo.
- Rotate the client secret if it ever leaks: GitHub allows you to regenerate it.

6. Testing the connection

- Start your dev server:
  - npm run dev
- Visit your app and click "Sign in with GitHub". You should be redirected to GitHub to authorize and then back to your app with a session if successful.

7. Troubleshooting

- "Invalid redirect_uri" error: check the Authorization callback URL on GitHub exactly matches the URL used by NextAuth (including http/https and trailing slashes).
- Missing credentials error: ensure `.env.local` exists, variables are spelled `GITHUB_ID` and `GITHUB_SECRET`, and server was restarted.
- If you see provider configuration errors in Next.js server logs, paste the error message into a search or here and I can help debug.

If you want, I can:

- Add a small dev-only guard to `app/api/auth/[...nextauth]/route.js` so the GitHub provider is only registered when both env vars are present.
- Create a `.env.local.example` with all recommended env keys.
- Walk through creating the OAuth app in real-time while you share screens/logs.

End of instructions.
