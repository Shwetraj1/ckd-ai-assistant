from openai import OpenAI
from app.core.config import (
    AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_KEY,
    AZURE_OPENAI_DEPLOYMENT
)

client = OpenAI(
    base_url=f"{AZURE_OPENAI_ENDPOINT}/openai/v1",
    api_key=AZURE_OPENAI_KEY
)

def ask_azure_openai(system_prompt: str, user_message: str):
    response = client.chat.completions.create(
        model=AZURE_OPENAI_DEPLOYMENT,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]
    )
    
    # Correct extraction for new OpenAI Python SDK
    return response.choices[0].message.content
