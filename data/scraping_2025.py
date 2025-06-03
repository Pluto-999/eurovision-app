from bs4 import BeautifulSoup
import requests

url = "https://en.wikipedia.org/wiki/Eurovision_Song_Contest_2025"

page = requests.get(url)

soup = BeautifulSoup(page.text, "html.parser")
# print(soup.prettify())

participants_table = soup.find("table", class_ = "wikitable plainrowheaders sticky-header")
# print(participants_table.prettify())

countries = []
artists = []
songs = []

titles = participants_table.find_all("tr")
# print(titles)

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)
# print(table_entries)


def find_string(index, counter, spaces_required, entry):
    while index < len(entry) and counter < spaces_required:
        char = entry[index]
        index += 1
        if char == "\n":
            counter += 1

    return index


def create_string(index, entry):
    string = ""
    while index < len(entry):
        char = entry[index]
        if char == "\n":
            break
        index += 1
        string += char
    return string

# Loop through every entry in the table to get the countries
def add_countries():
    for entry in table_entries:

        string = create_string(0, entry)

        countries.append(string)

# Loop through every entry in the table to get the Artist
def add_artists():
    for entry in table_entries:

        index = find_string(0, 0, 4, entry)

        string = create_string(index, entry)

        artists.append(string)

# Loop through every entry in the table to get the Song
def add_songs():
    for entry in table_entries:

        index = find_string(0, 0, 6, entry)
        
        string = create_string(index, entry)

        songs.append(string)


add_countries()
add_artists()
add_songs()


# print(countries)
# print(artists)
# print(songs)

each_entry = [[]]

index = 0

while index < len(countries) and index < len(artists) and index < len(songs):
    each_entry.append([countries[index], artists[index], songs[index]])
    index += 1

each_entry.pop(0)
print(each_entry)
    


######################################

final_countries = []
final_running_order = []
final_points = []
final_position = []


final_results_table = soup.find_all("table", class_ = "sortable wikitable plainrowheaders")
# print(final_results_table[2].prettify())

titles = final_results_table[2].find_all("tr")

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)
# print(table_entries)


for entry in table_entries:

    index = find_string(0, 0, 2, entry)

    string = create_string(index, entry)

    final_countries.append(string.strip())

# print(countries_results)

for entry in table_entries:
    string = create_string(0, entry)

    final_running_order.append(int(string))

# print(final_running_order)


for entry in table_entries:
    index = find_string(0, 0, 8, entry)

    string = create_string(index, entry)

    final_points.append(int(string))

# print(final_points)

for entry in table_entries:
    index = find_string(0, 0, 10, entry)

    string = create_string(index, entry)

    final_position.append(int(string))

# print(final_position)

final_entries = [[]]

index = 0

while index < len(final_countries) and index < len(final_running_order) and index < len(final_points) and index < len(final_position):
    final_entries.append([final_position[index], final_countries[index], final_points[index], final_running_order[index]])
    index += 1

final_entries.pop(0)
final_entries.sort()
# print(final_entries)