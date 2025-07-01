from dotenv import load_dotenv
import os
import base64
import requests
import json
from scraping_2025 import each_entry, final_results, semi_1_results, semi_2_results, full_results
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


def add_spotify_track(list, artist_index, track_index):
    for entry in list:
        artist_name = entry[artist_index]
        track_name = entry[track_index]
        track = search_for_track(token, artist_name, track_name, 2025)
        if track not in entry:
            entry.append(track)
    return list


each_entry_with_spotify = add_spotify_track(each_entry, 1, 2)

final_results_with_spotify = add_spotify_track(final_results, 5, 6)

semi_1_results_with_spotify = add_spotify_track(semi_1_results, 5, 6)

semi_2_results_with_spotify = add_spotify_track(semi_2_results, 5, 6)

full_results_with_spotify = add_spotify_track(full_results, 5, 6)


# print("ALL ENTRIES: ", each_entry)
# print("-----------------------------------------------------------------------------")
# print("FINAL RESULTS: ", final_results)
# print("-----------------------------------------------------------------------------")
# print("SEMI 1 RESULTS: ", semi_1_results)
# print("-----------------------------------------------------------------------------")
# print("SEMI 2 RESULTS: ", semi_2_results)
# print("-----------------------------------------------------------------------------")
# print("FULL RESULTS: ", full_results)

