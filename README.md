This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

---


## Local Development
This application uses Redis for its data persistence. The easist way to get a dev instance is to sign up to redislabs.com.

You will need a `.env.local` file which contains details of the Redis instance your are using. For example:
```
REDIS_HOST="redis-xxxxx.xxx.eu-west-1-2.ec2.cloud.redislabs.com"
REDIS_PORT=xxxxx
REDIS_PASSWORD="xxxxxxxxxxxxxxx"
```

You may run into the issue where you run out of connections due to `yarn dev` recreating the redis connection - I'm still working on that.

To run a production build locally, you need to run `yarn build && yarn start`

## Deployment
We're deploying on Heroku, so we need a few extra pieces of information in the package.json file.

This tells Heroku which version of Node to use:
```
"engines": {
  "node": "14"
},
```
This allows Heroku to cache builds for faster deployment
```
"cacheDirectories": [
  ".next/cache"
]
```
The start command needs to obey the `$PORT` evironment variable:
```
"scripts": {
  ...
  "start": "next start  -p $PORT",
  ...
},
```

When deploying for live usage, you need to make sure you are using a Redis instance which persists to disk (I think the cheapest non-free tier has this) and you need to ensure that that the eviction is set to `allkeys-lru` so that when we run out of memory (about 5,000 games) the old ones get purged first.
```
heroku redis:maxmemory --policy allkeys-lru --app glowgolfscorecard
```

# Themes
There are (going to be) two themes for the app - summer and and winter. The neon one is used for glow-golf and the summer one is the one used for daytime golf. 

To toggle between them, set the THEME case-insensitive environment variable to "SUMMER" for the summer theme, and any thing else for the winter one (i.e. unset it, or set it to anything else).

When deployed on Heroku, the deployment will need rebuilding each time as Next bakes in the env vars at build time and the live updating options will break some of the optimizations which appear to be more useful than live updating themes
