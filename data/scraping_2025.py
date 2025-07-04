from bs4 import BeautifulSoup
import requests
import json
import os

current_dir = os.path.dirname(__file__)
json_path = os.path.join(current_dir, "flags.json")

with open(json_path, "r") as f:
    flags_data = json.load(f)

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



each_entry = []

# Loop through every entry in the table to get the countries

for entry in table_entries:

    country = create_string(0, entry)

    artist_index = find_string(4, entry)
    artist = create_artist_string(artist_index, entry)

    song_index = find_string(6, entry)
    song = create_song_string(song_index, entry)

    each_entry.append([country, artist, song])


for entry in each_entry:
    entry.append(flags_data[entry[0]])



################### FINAL RESULTS ################### 
final_results = []

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

    final_results.append([int(position), country.strip(), int(points), int(running_order), False])

final_results.sort()


################### SEMI-FINAL 1 RESULTS ###################

semi_1_results = []

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

    semi_1_results.append([int(position), country.strip(), int(points), int(running_order), nq])

semi_1_results.sort()


################### SEMI-FINAL 2 RESULTS ###################

semi_2_results = []

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

    # add nq bool
    nq = False
    if int(position) > 10:
        nq = True

    semi_2_results.append([int(position), country.strip(), int(points), int(running_order), nq])

semi_2_results.sort()


nqs = semi_1_results[10:] + semi_2_results[10:]
nqs.sort(key = lambda x: (x[0], -x[2]))


def add_artist_and_song(results):
    for entry in results:
        country = entry[1]
        for entry_2 in each_entry:
            if entry_2[0] == country:
                entry.append(entry_2[1])
                entry.append(entry_2[2])

### ADD ARTIST AND SONG TO RESULTS ###

add_artist_and_song(final_results)

add_artist_and_song(semi_1_results)

add_artist_and_song(semi_2_results)


# results now have: position, country, points, running order, nq bool, artist, song

full_results = final_results + nqs

# print("ALL ENTRIES: ", each_entry)
# print("-----------------------------------------------------------------------------")
# print("FINAL RESULTS: ", final_results)
# print("-----------------------------------------------------------------------------")
# print("SEMI 1 RESULTS: ", semi_1_results)
# print("-----------------------------------------------------------------------------")
# print("SEMI 2 RESULTS: ", semi_2_results)
# print("-----------------------------------------------------------------------------")
# print("FULL RESULTS: ", full_results)
