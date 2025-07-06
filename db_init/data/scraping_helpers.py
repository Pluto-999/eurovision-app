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
    quote_mark_counter = 0

    while index < len(entry):
        char = entry[index]
        if quote_mark_counter >= 2:
            return string[1:-1]
        if char == "\n" or char == "[" or char == "(":
            break
        if char == '"':
            quote_mark_counter += 1
        index += 1
        string += char

    return string