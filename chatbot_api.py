from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()


def get_openai_response(user_message):
    OpenAI.api_key = os.getenv('OPENAI_API_KEY')
    response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt="You are a veteran player in Valorant who can explain Valorant concepts to new players in a casual and friendly manner.\nUser: " + user_message,
        max_tokens=150,
        temperature=0
    )
    return response.choices[0].text.strip()
