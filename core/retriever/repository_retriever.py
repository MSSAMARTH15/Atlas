from pathlib import Path


class RepositoryRetriever:

    def find_relevant_files(self, question, source_files):

        question = question.lower()

        stop_words = {
            "tell", "me", "about", "the", "a", "an",
            "what", "is", "explain", "describe",
            "how", "does", "do", "can", "you"
        }

        keywords = [
            word.strip(".,?!")
            for word in question.split()
            if word.strip(".,?!") not in stop_words
        ]

        matched_files = []

        for file_path in source_files:

            path = Path(file_path)

            filename = path.name.lower()

            path_string = str(path).lower()

            # Skip documentation, tests and cache
            if (
                "docs" in path_string
                or "__pycache__" in path_string
                or "test" in filename
                or filename.endswith(".html")
            ):
                continue

            # Exact filename match gets highest priority
            if filename in question:
                matched_files.insert(0, file_path)
                continue

            if any(keyword in filename for keyword in keywords):
                matched_files.append(file_path)
                continue

            try:

                with open(file_path, "r", encoding="utf-8") as file:
                    content = file.read(3000).lower()

                if any(keyword in content for keyword in keywords):
                    matched_files.append(file_path)

            except Exception:
                continue

        return matched_files[:5]