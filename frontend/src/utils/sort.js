function sortHelper(sortBy, sortOrder, data) {
    const copy = [...data]

    if (sortOrder === "asc") {
        if (sortBy === "country") {
            copy.sort((a, b) => a.country.localeCompare(b.country))
        }
        else if (sortBy === "position") {
            copy.sort((a, b) => {
                // finals first, then semis
                if (a.finalOrSemi === "Final" && b.finalOrSemi === "Semi Final") return -1 // negative means a goes before b
                if (a.finalOrSemi === "Semi Final" && b.finalOrSemi === "Final") return 1 // positive means b goes before a
                return a.position - b.position
            })
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
            copy.sort((a, b) => {
                // semis first, then finals
                if (a.finalOrSemi === "Semi Final" && b.finalOrSemi === "Final") return -1
                if (a.finalOrSemi === "Final" && b.finalOrSemi === "Semi Final") return 1
                return b.position - a.position
            })
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