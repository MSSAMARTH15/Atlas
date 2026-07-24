class RepositoryAnalyzer:

    def analyze(self, graph):

        analysis = {
            "files": 0,
            "classes": 0,
            "functions": 0,
            "imports": 0
        }

        for node in graph["nodes"]:

            if node["type"] == "file":
                analysis["files"] += 1

            elif node["type"] == "class":
                analysis["classes"] += 1

            elif node["type"] == "function":
                analysis["functions"] += 1

            elif node["type"] == "import":
                analysis["imports"] += 1

        return analysis