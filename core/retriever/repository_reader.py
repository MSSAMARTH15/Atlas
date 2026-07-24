class RepositoryReader:

    def read_files(self, file_paths):

        contents = []

        for path in file_paths:

            try:
                with open(path, "r", encoding="utf-8") as file:

                    contents.append({
                        "path": path,
                        "content": file.read()
                    })

            except Exception:
                continue

        return contents