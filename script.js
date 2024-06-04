const difficultyMultipliers = {
    "ITM & Media (Easy)": 1.5,
    "ITM & Media (Medium)": 2.0,
    "ITM & Media (Hard)": 3.0,
    "Media (Easy)": 1.0,
    "Media (Medium)": 1.5,
    "Media (Hard)": 2.0,
    "Standard (Easy)": 1.0,
    "Standard (Medium)": 1.2,
    "Standard (Hard)": 1.5
};

const collectionSliderValues = {
    100: 10, 200: 11, 300: 13, 400: 15, 500: 17, 750: 18, 1000: 19
};

document.getElementById('sample_per_market').addEventListener('input', function() {
    const sample_value = parseInt(this.value) || 0;
    let tps_value = 10; // Default value
    for (let [key, value] of Object.entries(collectionSliderValues)) {
        if (sample_value >= key) {
            tps_value = value;
        }
    }
    document.getElementById('collection_tps').value = tps_value;
});

function calculateSLA() {
    const samplePerMarket = parseFloat(document.getElementById('sample_per_market').value) || 0;
    const numberOfMarkets = parseFloat(document.getElementById('number_of_markets').value) || 0;
    const numberOfDashboards = parseInt(document.getElementById('number_of_dashboards').value) || 0;
    const difficulty = document.getElementById('difficulty').value;
    const collection_tps = parseInt(document.getElementById('collection_tps').value) || 10;

    const multiplier = difficultyMultipliers[difficulty];

    const staticTime = 1020.0;
    const totalSurveyTime = samplePerMarket * numberOfMarkets * collection_tps;
    const additionalDashboardTime = numberOfDashboards > 2 ? 840.0 : 0.0;
    const finalSLATime = (staticTime + totalSurveyTime + additionalDashboardTime) * multiplier;

    const totalMinutes = finalSLATime;
    const workDayMinutes = 9 * 60; // 9 hours per workday

    // Convert total minutes to working days
    let workingDays = Math.ceil(totalMinutes / workDayMinutes);
    const weeks = Math.floor(workingDays / 5);
    workingDays += (weeks * 2); // Add weekend days for each full week

    document.getElementById('result').innerText = `SLA Time: ${workingDays} working days`;
}
