# ValorantHelper Documentation

## Description

ValorantHelper is an AI ChatBot to provide information for both casual and professional players of Valorant. The backend is supported by the [OpenAI API's](https://platform.openai.com/docs/overview) GPT 3.5 Trubo model to provide dynamic responses alongside data pulled from the [Valorant API](https://valorant-api.com/) for the SQLITE3 databases. Frontend wise, this is a [Flask](https://flask.palletsprojects.com/en/3.0.x/) and [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) along with [Chakra UI](https://v2.chakra-ui.com/) for extra utility for the UI components. 

## Getting Started

Reminder: Make sure to have the necessary installations to run this program (ex: Flask)!

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about APIs and technologies used in this projct, take a look at the following resources:

- [Chakra UI](https://v2.chakra-ui.com/getting-started) - getting started with ChakraUI
- [Flask Documentation](https://flask.palletsprojects.com/en/3.0.x/) - documentation for Flask 3.0
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [OpenAI API](https://platform.openai.com/docs/api-reference/introduction) - OpenAI API reference page
- [Python3](https://www.python.org/doc/) - learning resource from official Python documentation website
- [SQLite3 Documentation](https://docs.python.org/3/library/sqlite3.html) - documentation for the latest version of SQLite3
- [Valorant API Documentation](https://dash.valorant-api.com/) - learn Valorant API features

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
