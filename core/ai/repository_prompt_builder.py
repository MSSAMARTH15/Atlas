class RepositoryPromptBuilder:

    def build(self, question, file_contents):

        prompt = f"""
You are an expert software engineer.

Answer the following question about the repository.

Question:
{question}

Repository Files:
"""

        for file in file_contents:

            prompt += f"""

File: {file['path']}

{file['content']}
"""

        return prompt