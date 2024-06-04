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

function getCollectionTPS(sampleValue) {
    if (sampleValue < 100) return "N/A";
    if (sampleValue < 200) return 10;
    if (sampleValue < 300) return 11;
    if (sampleValue < 400) return 13;
    if (sampleValue < 500) return 15;
    if (sampleValue < 750) return 17;
    if (sampleValue < 1000) return 18;
    if (sampleValue <= 1500) return 19;
    return "Consult Ops";
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
    const dailyMinutes = 24 * 60; // 1440 minutes per full day

    // Convert total minutes to full days, rounded up
    const fullDays = Math.ceil(totalMinutes / dailyMinutes);

    document.getElementById('result').innerText = `SLA Time: ${fullDays} days`;
}
