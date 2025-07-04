import json
import os

current_dir = os.path.dirname(__file__)
json_path = os.path.join(current_dir, "flags.json")

with open(json_path, "r") as f:
    flags_data = json.load(f)

print(flags_data)