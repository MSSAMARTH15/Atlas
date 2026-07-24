from pathlib import Path

from core.parser.tree_sitter_parser import TreeSitterParser
from core.parser.ast_extractor import ASTExtractor
from core.graph.graph_builder import GraphBuilder
from core.analyzer.repository_analyzer import RepositoryAnalyzer


class RepositoryEngine:

    def __init__(self):

        self.parser = TreeSitterParser()
        self.extractor = ASTExtractor()
        self.builder = GraphBuilder()
        self.analyzer = RepositoryAnalyzer()

    def analyze_repository(self, repository_path):

        repository_path = Path(repository_path)

        summary = {
            "files": 0,
            "classes": 0,
            "functions": 0,
            "imports": 0
        }

        python_files = list(repository_path.rglob("*.py"))

        for file in python_files:

            try:

                tree = self.parser.parse(file, "python")

                ast = self.extractor.extract(tree, file)

                graph = self.builder.build(ast)

                result = self.analyzer.analyze(graph)

                summary["files"] += result["files"]
                summary["classes"] += result["classes"]
                summary["functions"] += result["functions"]
                summary["imports"] += result["imports"]

            except Exception as e:

                print(f"Skipped {file.name}: {e}")

        return summary