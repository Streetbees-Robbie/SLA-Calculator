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

// Values based on sample per market ranges
function getCollectionTPS(sampleValue) {
    if (sampleValue < 100) {
        return "N/A";
    } else if (sampleValue < 200) {
        return 10;
    } else if (sampleValue < 300) {
        return 11;
    } else if (sampleValue < 400) {
        return 13;
    } else if (sampleValue < 500) {
        return 15;
    } else if (sampleValue < 750) {
        return 17;
    } else if (sampleValue < 1000) {
        return 18;
    } else if (sampleValue <= 1500) {
        return 19;
    } else {
        return "Consult Ops";
    }
}

document.getElementById('sample_per_market').addEventListener('input', function() {
    const sampleValue = parseInt(this.value) || 0;
    const tpsValue = getCollectionTPS(sampleValue);
    
    document.getElementById('collection_tps').value = tpsValue;
});

function calculateSLA() {
    const samplePerMarket = parseFloat(document.getElementById('sample_per_market').value) || 0;
    const numberOfMarkets = parseFloat(document.getElementById('number_of_markets').value) || 0;
    const numberOfDashboards = parseInt(document.getElementById('number_of_dashboards').value) || 0;
    const difficulty = document.getElementById('difficulty').value;
    const collectionTPS = document.getElementById('collection_tps').value;

    if (collectionTPS === "N/A" || collectionTPS === "Consult Ops") {
        document.getElementById('result').innerText = `SLA Time: ${collectionTPS}`;
        return;
    }

    const multiplier = difficultyMultipliers[difficulty];
    const tpsValue = parseInt(collectionTPS);

    const staticTime = 1020.0;
    const totalSurveyTime = samplePerMarket * numberOfMarkets * tpsValue;
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
