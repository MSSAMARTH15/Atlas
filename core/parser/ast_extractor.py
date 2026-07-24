class ASTExtractor:

    def __init__(self):
        self.result = {
            "file": "",
            "imports": [],
            "classes": [],
            "functions": []
        }

    def extract(self, root, file_path):

        self.result = {
        "file": file_path.name,
        "imports": [],
        "classes": [],
        "functions": []
        }

        self._walk(root)

        return self.result

    def _walk(self, node):

        # -------- Imports --------

        if node.type == "import_statement":

            text = node.text.decode("utf-8")

            self.result["imports"].append(text)

        # -------- Classes --------

        elif node.type == "class_definition":

            name = node.child_by_field_name("name")

            if name:
                self.result["classes"].append(name.text.decode("utf-8"))

        # -------- Functions --------

        elif node.type == "function_definition":

            name = node.child_by_field_name("name")

            if name:
                self.result["functions"].append(name.text.decode("utf-8"))

        for child in node.children:
            self._walk(child)