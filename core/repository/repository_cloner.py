from pathlib import Path
import subprocess

# Try to import GitPython's Repo. If unavailable, provide a minimal fallback
try:
    from git import Repo
except Exception:
    class Repo:  # minimal fallback implementing clone_from using system git
        @staticmethod
        def clone_from(url, to_path):
            res = subprocess.run(["git", "clone", url, str(to_path)], check=True)
            return res
import shutil


class RepositoryCloner:

    def __init__(self):
        self.storage_path = Path("storage/repositories")
        self.storage_path.mkdir(parents=True, exist_ok=True)

    def clone(self, repo_url):

        repo_name = repo_url.rstrip("/").split("/")[-1]

        if repo_name.endswith(".git"):
            repo_name = repo_name[:-4]

        destination = self.storage_path / repo_name

        # Repository already exists
        if destination.exists():
            print(f"[INFO] Repository '{repo_name}' already exists.")
            return destination

        try:
            print(f"[INFO] Cloning {repo_name}...")
            Repo.clone_from(repo_url, destination)
            print("[SUCCESS] Repository cloned successfully.")
            return destination

        except Exception as e:
            print(f"[ERROR] {e}")
            return None

    def delete_repository(self, repo_name):

        repository = self.storage_path / repo_name

        if repository.exists():
            shutil.rmtree(repository)
            print(f"[INFO] Deleted '{repo_name}'.")
        else:
            print("[INFO] Repository not found.")