
function sortHelper(sortBy, sortOrder, data) {
    const copy = [...data]
    
    if (sortOrder === "asc") {
        if (sortBy === "country") {
            copy.sort((a, b) => a.country.localeCompare(b.country))
        }
        else if (sortBy === "position") {
            copy.sort((a, b) => a.position - b.position)
        }
        else if (sortBy === "running_order") {
            copy.sort((a, b) => a.running_order - b.running_order)
        }
        else if (sortBy === "year") {
            copy.sort((a, b) => a.year - b.year)
        }
    }
    else {
        if (sortBy === "country") {
            copy.sort((a, b) => b.country.localeCompare(a.country))
        }
        else if (sortBy === "position") {
            copy.sort((a, b) => b.position - a.position)
        }
        else if (sortBy === "running_order") {
            copy.sort((a, b) => b.running_order - a.running_order)
        }
        else if (sortBy === "year") {
            copy.sort((a, b) => b.year - a.year)
        }
    }

    return copy
}

export default sortHelper