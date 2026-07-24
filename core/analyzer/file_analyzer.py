from pathlib import Path

from core.parser.tree_sitter_parser import TreeSitterParser
from core.parser.ast_extractor import ASTExtractor


class FileAnalyzer:

    def __init__(self):

        self.parser = TreeSitterParser()
        self.extractor = ASTExtractor()

    def analyze(self, file_path):

        file_path = Path(file_path)

        tree = self.parser.parse(file_path, "python")

        result = self.extractor.extract(tree, file_path)

        return {

    "file_name": file_path.name,

    "file_path": str(file_path),

    "source_code": file_path.read_text(
        encoding="utf-8",
        errors="ignore"
    ),

    "imports": result["imports"],

    "classes": result["classes"],

    "functions": result["functions"]

}