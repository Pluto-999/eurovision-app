from dotenv import load_dotenv
import os
import base64
import requests
import json

load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

def get_token():
    auth_string = client_id + ":" + client_secret
    auth_base64 = str(base64.b64encode(auth_string.encode("utf-8")), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}

    result = requests.post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result["access_token"]
    return token


def get_auth_header(token):
    return {"Authorization": "Bearer " + token}


def search_for_track(token, artist_name, track_name, year):
    url="https://api.spotify.com/v1/search"
    query_params = {
        "q": f"{track_name} year:{year} artist:{artist_name}",
        "type": "track",
        "limit": 1,
    }

    result = requests.get(url=url, params=query_params, headers=get_auth_header(token))

    data = result.json()
    if len(data["tracks"]["items"]) <= 0:
        print("Song not found ...")
        return ""

    spotify_url = data["tracks"]["items"][0]["external_urls"]["spotify"]

    return spotify_url


token = get_token()


def add_spotify_track(artist_name, track_name):
    track = search_for_track(token, artist_name, track_name, 2025)
    return track


with open("./json_data/entries.json", "r") as openfile:
    data = json.load(openfile)


for each_entry in data["all_entries"]:
    each_entry["spotify_url"] = add_spotify_track(each_entry["artist"], each_entry["song"])


with open("./json_data/entries.json", "w") as outfile:
    json.dump(data, outfile, ensure_ascii=False)
