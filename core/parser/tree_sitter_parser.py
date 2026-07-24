from pathlib import Path

from tree_sitter_language_pack import get_parser


class TreeSitterParser:

    def __init__(self):
        self.parsers = {}

    def _get_parser(self, language):

        if language not in self.parsers:
            self.parsers[language] = get_parser(language)

        return self.parsers[language]

    def parse(self, file_path, language):

        file_path = Path(file_path)

        parser = self._get_parser(language)

        source_code = file_path.read_text(
            encoding="utf-8",
            errors="ignore"
        )

        tree = parser.parse(bytes(source_code, "utf8"))

        return tree.root_node