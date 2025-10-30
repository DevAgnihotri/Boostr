This file contains a short, copy-paste friendly plan to deploy this Next.js app to Netlify and wire it to your MongoDB (Atlas) and OAuth providers.

1. Prepare a production MongoDB (Atlas)

   - Create a free cluster on MongoDB Atlas and a database user (username/password).
   - Whitelist access during testing (0.0.0.0/0) or configure VPC/allowed IPs for production.
- In MongoDB Atlas: Clusters → Connect → “Connect your application” → copy the connection string (SRV).
- Replace placeholders:
    - username → your DB user
    - <password> → your DB user password (URL‑encode special characters)
    - <dbname> → the database name to use
- Example:
    mongodb+srv://username:<password>@cluster0.mongodb.net/mydb?retryWrites=true&w=majority
- Quick tips:
    - Create a database user in Atlas and whitelist your IP (or 0.0.0.0/0 for temporary testing).
    - If your password contains @, /, : or spaces, URL‑encode it (e.g. %40 for @).
    - For local testing you can use: mongodb://localhost:27017/mydb
- Put the final string into Netlify as MONGO_URI (or in .env.local for local dev). Do not commit credentials to git.

2. Add environment variables in Netlify (Site → Settings → Build & deploy → Environment variables)

   - MONGO_URI = <your Atlas connection string> (this app uses process.env.MONGO_URI)
   - NEXTAUTH_URL = https://your-site.netlify.app (use your Netlify or custom domain, HTTPS)
   - NEXTAUTH_SECRET = <a strong random string>
   - GOOGLE_ID, GOOGLE_SECRET (from Google Cloud OAuth client)
   - GITHUB_ID, GITHUB_SECRET (if using GitHub OAuth)
   - Any other secrets you use (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, etc.)

3. Configure Google OAuth (Cloud Console)

   - OAuth client type: Web application
   - Authorized JavaScript origins: https://your-site.netlify.app
   - Authorized redirect URIs: https://your-site.netlify.app/api/auth/callback/google
   - Also keep http://localhost:3000 and http://127.0.0.1:3000 entries for local testing

4. Enable Netlify's Next.js build support

   - (recommended) Add the Netlify Next.js plugin: dev install locally: `npm i -D @netlify/plugin-nextjs`
   - Create `netlify.toml` in project root with a minimal config:

     [build]
     command = "npm run build"

     # leave publish default; the plugin will wire output for dynamic routes

     [[plugins]]
     package = "@netlify/plugin-nextjs"

   - Commit `netlify.toml` and push to your repo connected to Netlify.

5. Deploy / Redeploy on Netlify

   - After adding env vars, trigger a new deploy (push a commit or trigger redeploy in Vercel UI).
   - Netlify will run `npm run build` and the plugin will handle App Router SSR/edge functions.

6. Quick local test before deploy

   - Keep `.env.local` with:
     NEXTAUTH_URL=http://localhost:3000
     MONGO_URI=mongodb+srv://... (or local mongodb)
     GOOGLE_ID= (if testing)
     GOOGLE_SECRET=
   - Restart dev server:
     ```powershell
     npm run dev
     ```

7. Troubleshooting & notes
   - Redirect URIs must match exactly (scheme + host + path). Use HTTPS in production.
   - NEXTAUTH_URL must be the public origin Netlify uses (e.g. https://your-site.netlify.app or your custom domain).
   - If auth fails on preview deploys, add each preview origin to Google Console or test on a production/preview you added.
   - Keep `.env.local` out of git. Use Netlify env vars for production secrets.

If you want, I can add a ready-made `netlify.toml` file, install the Netlify plugin in devDependencies, and add a short checklist to the README for you.
