from bs4 import BeautifulSoup
import requests
import json
import os


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


def find_string(spaces_required, entry):
    index = 0
    counter = 0
    while index < len(entry) and counter < spaces_required:
        char = entry[index]
        index += 1
        if char == "\n":
            counter += 1

    return index


def create_string(index, entry):
    string = ""
    found_opening = False
    while index < len(entry):
        char = entry[index]
        if char == "\n":
            break
        if found_opening:
            index += 1
            continue
        if not char.isalnum() and char != " " and char != '"' and char != "'":
            if found_opening:
                found_opening = False
            else:
                found_opening = True
            index += 1
            continue
        index += 1
        string += char
    return string


def create_country_string(index, entry):
    string = ""
    while index < len(entry):
        char = entry[index]
        if char == "\n":
            break
        index += 1
        string += char
    return string

def create_song_string(index, entry):
    quote_mark_counter = 0
    string = ""

    while index < len(entry):
        char = entry[index]
        if char == "\n" or quote_mark_counter >= 2:
            break
        if char == '"':
            quote_mark_counter += 1
        index += 1
        string += char
    return string[1:-1]


def create_artist_string(index, entry):
    string = ""
    
    while index < len(entry):
        char = entry[index]
        if char == "\n" or char == "[":
            break
        index += 1
        string += char
    return string



all_entries = []
all_entries_dict = {} # for this, we need country, year, artist, song

# Loop through every entry in the table to get the countries

for entry in table_entries:

    country = create_string(0, entry)

    artist_index = find_string(4, entry)
    artist = create_artist_string(artist_index, entry)

    song_index = find_string(6, entry)
    song = create_song_string(song_index, entry)

    all_entries.append({
        "country": country.strip(), 
        "year": 2025, 
        "artist": artist, 
        "song": song
        }
    )

all_entries_dict["all_entries"] = all_entries

with open("./json_data/entries.json", "w") as outfile:
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
    country = create_country_string(country_index, entry)

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

with open("./json_data/final_results.json", "w") as outfile:
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
    country = create_country_string(country_index, entry)

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

with open("./json_data/semi_1_results.json", "w") as outfile:
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
    country = create_country_string(country_index, entry)

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

with open("./json_data/semi_2_results.json", "w") as outfile:
    json.dump(semi_2_results_dict, outfile)
