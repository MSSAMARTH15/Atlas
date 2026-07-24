print("Language Detector Loaded")
from pathlib import Path


class LanguageDetector:

    def detect(self, repository_path):

        repository_path = Path(repository_path)

        result = {
            "primary_language": "Unknown",
            "secondary_languages": [],
            "framework": "Unknown",
            "package_manager": "Unknown",
            "build_system": "Unknown"
        }

        # ---------- Python ----------

        if (repository_path / "pyproject.toml").exists():

            result["primary_language"] = "Python"

            pyproject = (
                repository_path / "pyproject.toml"
            ).read_text(errors="ignore").lower()

            if "flask" in pyproject:
                result["framework"] = "Flask"

            elif "django" in pyproject:
                result["framework"] = "Django"

            elif "fastapi" in pyproject:
                result["framework"] = "FastAPI"

            if "poetry" in pyproject:
                result["package_manager"] = "Poetry"
            else:
                result["package_manager"] = "pip"

            result["build_system"] = "setuptools"

        elif (repository_path / "requirements.txt").exists():

            result["primary_language"] = "Python"

            requirements = (
                repository_path / "requirements.txt"
            ).read_text(errors="ignore").lower()

            if "flask" in requirements:
                result["framework"] = "Flask"

            elif "django" in requirements:
                result["framework"] = "Django"

            elif "fastapi" in requirements:
                result["framework"] = "FastAPI"

            result["package_manager"] = "pip"
            result["build_system"] = "setuptools"

        # ---------- JavaScript ----------

        elif (repository_path / "package.json").exists():

            result["primary_language"] = "JavaScript"

            package = (
                repository_path / "package.json"
            ).read_text(errors="ignore").lower()

            if "react" in package:
                result["framework"] = "React"

            elif "vue" in package:
                result["framework"] = "Vue"

            elif "express" in package:
                result["framework"] = "Express"

            result["package_manager"] = "npm"

        # ---------- Java ----------

        elif (repository_path / "pom.xml").exists():

            result["primary_language"] = "Java"

            pom = (
                repository_path / "pom.xml"
            ).read_text(errors="ignore").lower()

            if "spring" in pom:
                result["framework"] = "Spring Boot"

            result["package_manager"] = "Maven"
            result["build_system"] = "Maven"

        elif (repository_path / "build.gradle").exists():

            result["primary_language"] = "Java"
            result["package_manager"] = "Gradle"
            result["build_system"] = "Gradle"

        return result