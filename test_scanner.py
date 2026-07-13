print("Program Started")

from core.scanner.repository_scanner import RepositoryScanner

print("Import Successful")

scanner = RepositoryScanner(".")

print("Scanner Created")

result = scanner.scan()

print("Scan Completed")

print(result)

print("Program Finished")