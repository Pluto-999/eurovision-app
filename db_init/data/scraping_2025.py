from bs4 import BeautifulSoup
import requests
import json
import os
from scraping_helpers import find_string, create_string
from spotify_api import add_spotify_track
from youtube_api import add_yt_data

url = "https://en.wikipedia.org/wiki/Eurovision_Song_Contest_2025"

page = requests.get(url)

soup = BeautifulSoup(page.text, "html.parser")

participants_table = soup.find("table", class_ = "wikitable plainrowheaders sticky-header")

countries = []
artists = []
songs = []

titles = participants_table.find_all("tr")

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)


all_entries = []
all_entries_dict = {} # for this, we need country, year, artist, song, spotifty_url, yt_thumbnail, yt_url

# Loop through every entry in the table to get the countries

for entry in table_entries:

    country = create_string(0, entry)

    artist_index = find_string(4, entry)
    artist = create_string(artist_index, entry)

    song_index = find_string(6, entry)
    song = create_string(song_index, entry)

    all_entries.append({
        "country": country.strip(), 
        "year": 2025, 
        "artist": artist, 
        "song": song,
        "spotify_url": add_spotify_track(artist, song, 2025),
        # "yt_thumbnail": add_yt_data(country)[0],
        # "yt_url": add_yt_data(country)[1]
        }
    )

all_entries_dict["all_entries"] = all_entries

with open("./json_data/entries_2025.json", "w") as outfile:
    json.dump(all_entries_dict, outfile, ensure_ascii=False)


################### FINAL RESULTS ################### 
final_results = []
final_results_dict = {} # for this, we need country, year, position, points, running_order

final_results_table = soup.find_all("table", class_ = "sortable wikitable plainrowheaders")[2]

titles = final_results_table.find_all("tr")

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)

for entry in table_entries:

    position_index = find_string(10, entry)
    position = create_string(position_index, entry)

    country_index = find_string(2, entry)
    country = create_string(country_index, entry)

    points_index = find_string(8, entry)
    points = create_string(points_index, entry)

    running_order = create_string(0, entry)

    final_results.append({
        "country": country.strip(), 
        "year": 2025, 
        "position": int(position), 
        "points": int(points), 
        "running_order": int(running_order)
        }
    )

final_results_dict["final_entries"] = final_results

with open("./json_data/final_results_2025.json", "w") as outfile:
    json.dump(final_results_dict, outfile)



################### SEMI-FINAL 1 RESULTS ###################

semi_1_results = []
semi_1_results_dict = {} # for this, we need country, year, position, points, running_order, semi_number, is_nq

semi_1_results_table = soup.find_all("table", class_ = "sortable wikitable plainrowheaders")[0]

titles = semi_1_results_table.find_all("tr")

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)

for entry in table_entries:
    position_index = find_string(10, entry)
    position = create_string(position_index, entry)

    country_index = find_string(2, entry)
    country = create_string(country_index, entry)

    points_index = find_string(8, entry)
    points = create_string(points_index, entry)

    running_order = create_string(0, entry)

    # add nq bool
    nq = False
    if int(position) > 10:
        nq = True

    semi_1_results.append({
        "country": country.strip(), 
        "year": 2025, 
        "position": int(position), 
        "points": int(points), 
        "running_order": int(running_order),
        "semi_number": 1,
        "is_nq": nq
    })


semi_1_results_dict["semi_1_entries"] = semi_1_results

with open("./json_data/semi_1_results_2025.json", "w") as outfile:
    json.dump(semi_1_results_dict, outfile)

################### SEMI-FINAL 2 RESULTS ###################

semi_2_results = []
semi_2_results_dict = {} # for this, we need country, year, position, points, running_order, semi_number, is_nq

semi_2_results_table = soup.find_all("table", class_ = "sortable wikitable plainrowheaders")[1]

titles = semi_2_results_table.find_all("tr")

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)

for entry in table_entries:
    position_index = find_string(10, entry)
    position = create_string(position_index, entry)

    country_index = find_string(2, entry)
    country = create_string(country_index, entry)

    points_index = find_string(8, entry)
    points = create_string(points_index, entry)

    running_order = create_string(0, entry)

    ## add nq bool
    nq = False
    if int(position) > 10:
        nq = True

    semi_2_results.append({
        "country": country.strip(), 
        "year": 2025, 
        "position": int(position), 
        "points": int(points), 
        "running_order": int(running_order),
        "semi_number": 2,
        "is_nq": nq
    })


semi_2_results_dict["semi_2_entries"] = semi_2_results

with open("./json_data/semi_2_results_2025.json", "w") as outfile:
    json.dump(semi_2_results_dict, outfile)