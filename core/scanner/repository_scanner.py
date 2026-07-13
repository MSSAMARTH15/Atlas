print("Repository Scanner Loaded")
from pathlib import Path
from collections import Counter

from core.config.settings import (
    IGNORED_FOLDERS,
    SUPPORTED_LANGUAGES,
    IGNORED_FILES,
)


class RepositoryScanner:

    def __init__(self, repository_path):
        self.repository_path = Path(repository_path)

    def scan(self):
        source_files = []
        ignored_files = []
        language_counter = Counter()
        folders = set()

        for path in self.repository_path.rglob("*"):
            if path.name in IGNORED_FILES:
                ignored_files.append(str(path))
                continue

            if any(folder in path.parts for folder in IGNORED_FOLDERS):
                ignored_files.append(str(path))
                continue

            if path.is_dir():
                folders.add(path)
                continue

            extension = path.suffix.lower()

            if extension in SUPPORTED_LANGUAGES:
                language = SUPPORTED_LANGUAGES[extension]
                language_counter[language] += 1
                source_files.append(str(path))

        return {
            "repository_name": self.repository_path.resolve().name,
            "total_files": len(source_files),
            "total_folders": len(folders),
            "languages": dict(language_counter),
            "source_files": source_files,
            "ignored_files": ignored_files,
        }