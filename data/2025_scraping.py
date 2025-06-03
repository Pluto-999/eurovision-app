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
for entry in table_entries:
    # string = ""
    # index = 0
    # while index < len(entry):
    #     char = entry[index]
    #     if char == "\n":
    #         break
    #     index += 1
    #     string += char

    index = 0
    string = create_string(index, entry)

    countries.append(string)

# Loop through every entry in the table to get the Artist
for entry in table_entries:
    # string = ""
    index = 0
    counter = 0
    # while index < len(entry) and counter < 4:
    #     char = entry[index]
    #     index += 1
    #     if char == "\n":
    #         counter += 1
    index = find_string(index, counter, 4, entry)


    # while index < len(entry):
    #     char = entry[index]
    #     if char == "\n":
    #         break
    #     index += 1
    #     string += char

    string = create_string(index, entry)

    artists.append(string)

# Loop through every entry in the table to get the Song
for entry in table_entries:
    # string = ""
    index = 0
    counter = 0
    # while index < len(entry) and counter < 6:
    #     char = entry[index]
    #     index += 1
    #     if char == "\n":
    #         counter += 1
    index = find_string(index, counter, 6, entry)


    # while index < len(entry):
    #     char = entry[index]
    #     if char == "\n":
    #         break
    #     index += 1
    #     string += char
    
    string = create_string(index, entry)

    songs.append(string)


print(countries)
print(artists)
print(songs)

