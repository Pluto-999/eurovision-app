function calculateAverage(data, column) {
    let total = 0
    for (const item of data) {
        total += item[column]
    }

    const average = total / data.length
    return average
    
}

module.exports = calculateAverage