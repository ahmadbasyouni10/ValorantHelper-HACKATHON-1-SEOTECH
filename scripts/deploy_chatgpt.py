import os 
import openai
from scripts import chatgpt_key
from openai import OpenAI

def deploy_chatgpt():
    chatgpt_key.set_key()
    my_api_key = os.getenv('OPENAI_API_KEY')
    openai.api_key = my_api_key

    # Create an OpenAPI client using the key from our environment variable
    client = OpenAI(
        api_key=my_api_key,
    )

    # Specify the model to use and the messages to send
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a veteran player in Valorant who can explain Valorant concepts to new players in a casual and friendly manner."},
            {"role": "user", "content": "What strategy is best for Heaven?"}
        ]
    )
    print(completion.choices[0].message.content) 

def main():
    deploy_chatgpt()

if __name__ == "__main__":
    main()