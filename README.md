# BeerBuddy Web
This is the web application for BeerBuddy.  This app is comprised of Next.js, React, and GraphQL (Apollo).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5440](http://localhost:5440) with your browser to see the result.

### Secrets
This application relies on an API secret used for accessing the third-party data with [BreweryDB](https://brewerydb.com).  If you choose to play with the beer and brewery data locally, you will need an API key with BreweryDB.  Since you probaby do not have one laying around, you can still work with a limted dataset using their sandbox API.  This is stored in the `.env` file as `BREWERYDB_SANDBOX_API_HOST`.

I have updated the application to use the BreweryDB sandbox API by default with the `USE_SANDBOX_API` environment variable. Unforutantely, the sandbox API is currently under maintenance from BreweryDB team and is being improved.

If you do happen to have a valid API key however, update `USE_SANDBOX_API` to be `false`, and add in `BREWERYDB_API_KEY` to an `.env.local` file.  This should allow the app to recognize working with the full-featured API instead.

**The production app uses the full-featured API. Use the demo link below to view the app.**

## Deployments
The app currently deploys to a Heroku environment.  The current production application can be accessed [here](https://beerbuddy-web.herokuapp.com/).
