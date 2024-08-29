import os

print("Project root:", os.path.abspath("app"))
print("Static directory:", os.path.abspath("app/static"))
print("Exists:", os.path.isdir("app/static"))