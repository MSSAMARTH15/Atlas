from pathlib import Path
from collections import Counter

from core.config.settings import (
    IGNORED_FOLDERS,
    SUPPORTED_LANGUAGES,
)


class RepositoryScanner:

    def __init__(self, repository_path):
        self.repository_path = Path(repository_path)

    def scan(self):

        source_files = []
        ignored_files = []
        language_counter = Counter()
        folders = set()

        tree = {}

        for path in self.repository_path.rglob("*"):

            if any(folder in path.parts for folder in IGNORED_FOLDERS):
                ignored_files.append(str(path))
                continue

            relative = path.relative_to(self.repository_path)

            current = tree

            for part in relative.parts[:-1]:
                current = current.setdefault(part, {})

            if path.is_dir():

                folders.add(path)

                current.setdefault(relative.name, {})

                continue

            extension = path.suffix.lower()
            important_files = {
    ".gitignore",
    "readme.md",
    "license",
    "dockerfile",
    "docker-compose.yml",
    "docker-compose.yaml",
    "makefile",
    "requirements.txt",
    "pyproject.toml",
    "package.json",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "composer.json",
    "pom.xml",
    "build.gradle",
    "cargo.toml",
    "go.mod"
}

            if extension in SUPPORTED_LANGUAGES:

                language = SUPPORTED_LANGUAGES[extension]

                language_counter[language] += 1

                source_files.append(str(path))

            elif path.name.lower() in important_files:

                source_files.append(str(path))

            current.setdefault("__files__", []).append(
    {
        "name": relative.name,
        "path": str(path)
    }
)

        return {

            "repository_name": self.repository_path.name,

            "total_files": len(source_files),

            "total_folders": len(folders),

            "languages": dict(language_counter),

            "source_files": source_files,

            "ignored_files": ignored_files,

            "folder_tree": tree,

        }