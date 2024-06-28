# ValorantHelper
Valorant Helper is a web app built with Next.js, Chakra UI, Flask, SQLite3, the Valorant API, Python, OpenAI, and Chart.js, designed to assist Valorant players with data insights and an intelligent chatbot. The frontend retrieves data from the backend and integrates an OpenAI-powered chatbot for user interactions.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmadbasyouni10/ValorantHelper
   cd ValorantHelper
   
    ```

2. Install Backend Dependencies:
  ```bash
   pip install flask sqlite3 requests openai python-dotenv

  ```

3. Install Frontend Dependencies:
  ```bash
   cd valoranthelper
   npm install @chakra-ui/next-js @chakra-ui/react @emotion/react @emotion/styled axios chart chart.js chartjs-adapter-date-fns cors date-fns dayjs express framer-motion next react react-chartjs-2 react-dom react-icons recharts sqlite3
   npm install --save-dev eslint eslint-config-next
   cd ..

  ```

3. Create a .env file:
* Claim your api key through OpenAI:
  https://openai.com/index/openai-api/
```bash
OPENAI_API_KEY=your_api_token_here
 ```

## How To Run
* Create sqlite3 Database using Valorant API
* Start the Flask server:
```bash
python main.py
python app.py
 ```

* Start the Next.js frontend (in a new terminal):
```bash
cd valorant-helper
npm run dev
 ```

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
