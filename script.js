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
   }

   const collectionSliderValues = {
       100: 10, 200: 11, 300: 13, 400: 15, 500: 17, 750: 18, 1000: 19
   }

   document.getElementById('collection_tps').addEventListener('input', function() {
       document.getElementById('tps_value').innerText = collectionSliderValues[this.value];
   });

   function calculateSLA() {
       const samplePerMarket = document.getElementById('sample_per_market').value;
       const numberOfMarkets = document.getElementById('number_of_markets').value;
       const numberOfDashboards = document.getElementById('number_of_dashboards').value;
       const difficulty = document.getElementById('difficulty').value;
       const collection_tps = document.getElementById('collection_tps').value;

       if (!samplePerMarket || !numberOfMarkets || !numberOfDashboards || !difficulty || !collection_tps) {
           alert("All fields are required!");
           return;
       }

       const multiplier = difficultyMultipliers[difficulty];
       const tpsValue = collectionSliderValues[collection_tps];

       const staticTime = 1020.0;
       const totalSurveyTime = samplePerMarket * numberOfMarkets * tpsValue;
       const additionalDashboardTime = numberOfDashboards > 2 ? 840.0 : 0.0;
       const finalSLATime = (staticTime + totalSurveyTime + additionalDashboardTime) * multiplier;

       document.getElementById('result').innerText = `SLA Time: ${finalSLATime} minutes`;
   }
