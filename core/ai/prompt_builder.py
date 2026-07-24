class PromptBuilder:

    def build_quick_summary(self, file_details):

        source_code = file_details["source_code"][:600]

        imports = file_details["imports"][:5]
        classes = file_details["classes"][:5]
        functions = file_details["functions"][:10]

        return f"""
You are an expert software engineer.

Analyze this source file.

FILE:
{file_details["file_name"]}

IMPORTS:
{", ".join(imports) if imports else "None"}

CLASSES:
{", ".join(classes) if classes else "None"}

FUNCTIONS:
{", ".join(functions) if functions else "None"}

CODE:

{source_code}

Respond ONLY in Markdown.

## Summary

Explain the purpose of this file in 2-3 sentences.

## Responsibilities

List 3-5 bullet points describing what this file does.
"""

    def build_detailed_summary(self, file_details):

        source_code = file_details["source_code"][:2500]

        imports = file_details["imports"][:15]
        classes = file_details["classes"][:15]
        functions = file_details["functions"][:30]

        return f"""
You are an expert software engineer.

Analyze this source file.

FILE:
{file_details["file_name"]}

IMPORTS:
{", ".join(imports) if imports else "None"}

CLASSES:
{", ".join(classes) if classes else "None"}

FUNCTIONS:
{", ".join(functions) if functions else "None"}

SOURCE CODE:

{source_code}

Respond in Markdown.

## Summary

## Responsibilities

## Important Classes

## Important Functions

## External Dependencies

## Interesting Observations

Only use the provided information.
Do not hallucinate.
"""