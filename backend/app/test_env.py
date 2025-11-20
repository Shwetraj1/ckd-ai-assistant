import os
from dotenv import load_dotenv

load_dotenv()

print("ENDPOINT:", os.getenv("AZURE_OPENAI_ENDPOINT"))
print("KEY:", os.getenv("AZURE_OPENAI_KEY")[:5] + "*****")
print("DEPLOYMENT:", os.getenv("AZURE_OPENAI_DEPLOYMENT"))
