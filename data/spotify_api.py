from dotenv import load_dotenv
import os
import base64
import requests
import json
import scraping_2025

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
        return
    
    # print(data)

    spotify_id = data["tracks"]["items"][0]["id"]
    spotify_name = data["tracks"]["items"][0]["name"]
    spotify_url = data["tracks"]["items"][0]["external_urls"]["spotify"]

    print(spotify_name)
    print(spotify_url)



token = get_token()

songs_2025 = [[]]

print(scraping_2025.each_entry)

for entry in scraping_2025.each_entry:
    artist_name = entry[1]
    song_name = entry[2]
    search_for_track(token, artist_name, song_name, 2025)

search_for_track(token, "Nina Žižić", 'Dobrodošli" (Добродошли)', 2025)