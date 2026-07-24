from core.ai.prompt_builder import PromptBuilder
from core.ai.chat_prompt_builder import ChatPromptBuilder
from core.ai.gemini_client import GeminiClient


class AISummarizer:

    def __init__(self):

        self.summary_builder = PromptBuilder()

        self.chat_builder = ChatPromptBuilder()

        self.client = GeminiClient()

    def summarize(self, file_details):

        prompt = self.summary_builder.build_quick_summary(file_details)

        summary = self.client.generate(prompt)

        return {

            "summary": summary

        }

    def ask(self, file_details, question):

        prompt = self.chat_builder.build(
            file_details,
            question
        )

        answer = self.client.generate(prompt)

        return {

            "answer": answer

        }