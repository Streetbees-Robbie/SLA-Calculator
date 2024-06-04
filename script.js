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

const collectionTPSRanges = [
    { min: 0, max: 99, value: "N/A" },
    { min: 100, max: 199, value: 10 },
    { min: 200, max: 299, value: 11 },
    { min: 300, max: 399, value: 13 },
    { min: 400, max: 499, value: 15 },
    { min: 500, max: 749, value: 17 },
    { min: 750, max: 999, value: 18 },
    { min: 1000, max: 1500, value: 19 },
    { min: 1501, max: Infinity, value: "Consult Ops" }
];

function getCollectionTPS(sampleValue) {
    return collectionTPSRanges.find(range => sampleValue >= range.min && sampleValue <= range.max).value;
}

document.getElementById('sample_per_market').addEventListener('input', function() {
    const sampleValue = parseInt(this.value) || 0;
    const tpsValue = getCollectionTPS(sampleValue);
    document.getElementById('collection_tps').value = tpsValue;
});

function updateSelectedCountries() {
    const selectedCountries = Array.from(document.getElementById('countries').selectedOptions)
        .map(option => option.text)
        .join(', ');
    document.getElementById('selected-countries').innerText = `Selected Countries: ${selectedCountries}`;
}

function calculateSLA() {
    const samplePerMarket = parseFloat(document.getElementById('sample_per_market').value) || 0;
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
    const surveyTime = samplePerMarket * tpsValue * multiplier;
    const dashboardTime = numberOfDashboards * 840.0;
    const finalSLATime = staticTime + surveyTime + dashboardTime;

    const totalMinutes = finalSLATime;
    const dailyMinutes = 24 * 60; // 1440 minutes per full day

    // Convert total minutes to full days, rounded up
    const fullDays = Math.ceil(totalMinutes / dailyMinutes);

    document.getElementById('result').innerText = `SLA Time: ${fullDays} days`;
}
