class GraphBuilder:

    def build(self, ast):

        graph = {
            "nodes": [],
            "edges": []
        }

        # File Node
        file_name = ast["file"]

        graph["nodes"].append({
            "id": file_name,
            "type": "file"
        })

        # Import Nodes
        for imp in ast["imports"]:

            graph["nodes"].append({
                "id": imp,
                "type": "import"
            })

            graph["edges"].append({
                "from": file_name,
                "to": imp,
                "relation": "imports"
            })

        # Class Nodes
        for cls in ast["classes"]:

            graph["nodes"].append({
                "id": cls,
                "type": "class"
            })

            graph["edges"].append({
                "from": file_name,
                "to": cls,
                "relation": "contains"
            })

        # Function Nodes
        for func in ast["functions"]:

            graph["nodes"].append({
                "id": func,
                "type": "function"
            })

            graph["edges"].append({
                "from": file_name,
                "to": func,
                "relation": "contains"
            })

        return graph