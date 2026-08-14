function calculateAverage(grades) {
    if (!grades || grades.length === 0) return 0;
    const sum = grades.reduce((acc, g) => acc + g, 0);
    return sum / grades.length;
}
module.exports = calculateAverage;
