import os

from dotenv import load_dotenv
from google import genai

load_dotenv()


class GeminiClient:

    def __init__(self):

        print("Gemini Step 1")

        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found.")

        self.client = genai.Client(api_key=api_key)

        print("Gemini Step 2")

    def generate(self, prompt):

        print("Gemini Step 3 - Sending Prompt")

        try:

            response = self.client.models.generate_content(
                model="gemini-flash-lite-latest",
                contents=prompt
            )

            print("Gemini Step 4 - Response Received")

            return response.text

        except Exception as e:

            return f"Gemini Error:\n{e}"