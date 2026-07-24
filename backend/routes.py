from fastapi import APIRouter

from backend.models import RepositoryRequest

from core.repository.repository_cloner import RepositoryCloner
from core.scanner.repository_scanner import RepositoryScanner
from core.analyzer.language_detector import LanguageDetector
from core.analyzer.repository_engine import RepositoryEngine
from core.analyzer.file_analyzer import FileAnalyzer
from core.retriever.repository_retriever import RepositoryRetriever
from core.retriever.repository_reader import RepositoryReader
from core.ai.repository_prompt_builder import RepositoryPromptBuilder
from core.ai.gemini_client import GeminiClient

router = APIRouter()
repository_context = {}

@router.post("/analyze")
def analyze_repository(request: RepositoryRequest):
    global repository_context

    # Clone Repository
    cloner = RepositoryCloner()
    local_repo = cloner.clone(request.github_url)

    # Scan Repository
    scanner = RepositoryScanner(local_repo)
    scan_result = scanner.scan()

    # Detect Project Information
    detector = LanguageDetector()
    project_info = detector.detect(local_repo)

    # Analyze Repository
    engine = RepositoryEngine()
    metrics = engine.analyze_repository(local_repo)
    repository_context = {
    "repo_path": local_repo,
    "source_files": scan_result["source_files"],
    "repository_name": scan_result["repository_name"]
}

    # Debug
    print("\n========== DEBUG ==========")
    print("SCAN RESULT:")
    print(scan_result)

    print("\nPROJECT INFO:")
    print(project_info)

    print("\nMETRICS:")
    print(metrics)
    print("===========================\n")
    print(repository_context)
    return {

        "repository_name": scan_result.get("repository_name", "Unknown"),

        "primary_language": project_info.get("primary_language", "Unknown"),

        "framework": project_info.get("framework", "Unknown"),

        "package_manager": project_info.get("package_manager", "Unknown"),

        "build_system": project_info.get("build_system", "Unknown"),

        "folder_tree": scan_result.get("folder_tree", {}),

        "files": metrics.get("files", 0),

        "classes": metrics.get("classes", 0),

        "functions": metrics.get("functions", 0),

        "imports": metrics.get("imports", 0),

    }


from core.ai.ai_summarizer import AISummarizer


@router.post("/file-analysis")
def analyze_file(request: dict):

    analyzer = FileAnalyzer()

    file_details = analyzer.analyze(request["file_path"])

    ai = AISummarizer()

    ai_result = ai.summarize(file_details)

    return {

    "file_name": file_details["file_name"],

    "file_path": file_details["file_path"],

    "imports": file_details["imports"],

    "classes": file_details["classes"],

    "functions": file_details["functions"],

    "source_code": file_details["source_code"],

    "summary": ai_result["summary"]

}


@router.post("/ask-ai")
def ask_ai(request: dict):

    analyzer = FileAnalyzer()

    file_details = analyzer.analyze(request["file_path"])

    ai = AISummarizer()

    result = ai.ask(
        file_details,
        request["question"]
    )

    return result

@router.post("/ask-repository")
def ask_repository(request: dict):

    retriever = RepositoryRetriever()
    print("Total source files:", len(repository_context["source_files"]))

    for file in repository_context["source_files"][:20]:
        print(file)

    relevant_files = retriever.find_relevant_files(
        request["question"],
        repository_context["source_files"]
    )
    print("Relevant files:", relevant_files)

    reader = RepositoryReader()

    file_contents = reader.read_files(relevant_files)
    prompt_builder = RepositoryPromptBuilder()

    prompt = prompt_builder.build(
    request["question"],
    file_contents
)

    gemini = GeminiClient()

    answer = gemini.generate(prompt)

    return {
    "answer": answer
}

    