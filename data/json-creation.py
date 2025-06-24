import jsonschema
from jsonschema import validate
import json

results_schema = {
    "type": "object",
    "properties": {
        "position": {"type": "integer"},
        "country": {"type": "string"},
        "points": {"type": "integer"},
        "running_order": {"type": "integer"},
        "nq": {"type": "boolean"},
        "artist": {"type": "string"},
        "song": {"type": "string"},
        "spotify_url": {"type": "string"},
        "youtube_url": {"type": "string"},
        "youtube_thumbnail": {"type": "string"}
    },
    "required": ["position", "country", "points", "running_order", "artist", "song"]
}

entries_schema = {
    "type": "object",
    "properties": {
        "country": {"type": "string"},
        "artist": {"type": "string"},
        "song": {"type": "string"},
        "spotify_url": {"type": "string"},
        "youtube_url": {"type": "string"},
        "youtube_thumbnail": {"type": "string"}
    }
}


data = {
    "position": "test",
    "country": "test",
}

try:
    validate(instance=data, schema=results_schema)
    print("valid")
except jsonschema.exceptions.ValidationError as e:
    print(f"JSON data is invalid: {e.message}")
