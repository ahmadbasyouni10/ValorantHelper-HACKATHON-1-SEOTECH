import openai
import os

def deploy_chatgpt(user_message):
    openai.api_key = os.getenv('OPENAI_API_KEY')
    response= openai.ChatCompletions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a veteran player in Valorant who can explain Valorant concepts to new players in a casual and friendly manner."},
            {"role": "user", "content": user_message}
        ]
    )
    return response.choices[0].message['content']