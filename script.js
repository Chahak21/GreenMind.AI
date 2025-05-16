document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Update pH value display when slider is moved
    const phSlider = document.getElementById('phLevel');
    const phValue = document.getElementById('phValue');
    
    if (phSlider && phValue) {
        phSlider.addEventListener('input', function() {
            phValue.textContent = this.value;
            updateFormProgress();
        });
    }
    
    // Form progress bar
    const formProgress = document.getElementById('formProgress');
    const landForm = document.getElementById('landForm');
    
    function updateFormProgress() {
        if (!landForm || !formProgress) return;
        
        const inputs = landForm.querySelectorAll('input, select');
        let filledInputs = 0;
        
        inputs.forEach(input => {
            if (input.value) {
                filledInputs++;
            }
        });
        
        const progressPercentage = (filledInputs / inputs.length) * 100;
        formProgress.style.width = `${progressPercentage}%`;
    }
    
    // Add event listeners to all form inputs for progress tracking
    if (landForm) {
        const inputs = landForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', updateFormProgress);
        });
    }
    
    // Form submission handler
    const results = document.getElementById('results');
    const recommendationsContainer = document.getElementById('recommendationsContainer');
    const backToForm = document.getElementById('backToForm');
    
    if (landForm) {
        landForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            landForm.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Get form values
            const formData = {
                area: parseFloat(document.getElementById('area').value),
                soilType: document.getElementById('soilType').value,
                phLevel: parseFloat(document.getElementById('phLevel').value),
                rainfall: document.getElementById('rainfall').value,
                temperature: document.getElementById('temperature').value,
                waterAvailability: document.getElementById('waterAvailability').value,
                goal: document.getElementById('goal').value
            };
            
            // Simulate processing delay for better UX
            setTimeout(() => {
                // Generate recommendations
                const recommendations = generateRecommendations(formData);
                
                // Display recommendations
                displayRecommendations(recommendations, formData);
                
                // Show results section, hide form
                landForm.closest('.form-container').classList.add('hidden');
                results.classList.remove('hidden');
                
                // Scroll to results
                results.scrollIntoView({ behavior: 'smooth' });
                
                // Reset button text
                landForm.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-search"></i> Get Recommendations';
            }, 1000);
        });
    }
    
    if (backToForm) {
        backToForm.addEventListener('click', function() {
            // Hide results, show form
            results.classList.add('hidden');
            document.querySelector('.form-container').classList.remove('hidden');
            
            // Scroll to form
            document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Print results functionality
    const printResults = document.getElementById('printResults');
    if (printResults) {
        printResults.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Save results functionality
    const saveResults = document.getElementById('saveResults');
    if (saveResults) {
        saveResults.addEventListener('click', function() {
            // Create a blob with the HTML content
            const resultsHTML = document.getElementById('recommendationsContainer').innerHTML;
            const blob = new Blob([`
                <html>
                <head>
                    <title>AgriAdvisor Recommendations</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        h2, h3, h4 { color: #2e7d32; }
                        .crop-item { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
                        .crop-tag { display: inline-block; background: #60ad5e; color: white; padding: 3px 8px; border-radius: 3px; margin-right: 5px; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <h1>AgriAdvisor Crop Recommendations</h1>
                    <p>Generated on ${new Date().toLocaleDateString()}</p>
                    ${resultsHTML}
                </body>
                </html>
            `], { type: 'text/html' });
            
            // Create a download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'AgriAdvisor_Recommendations.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Show success message
            alert('Recommendations saved successfully!');
        });
    }
    
    // Share results functionality
    const shareResults = document.getElementById('shareResults');
    if (shareResults) {
        shareResults.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'AgriAdvisor Crop Recommendations',
                    text: 'Check out my crop recommendations from AgriAdvisor!'
                })
                .catch(error => console.log('Error sharing:', error));
            } else {
                // Fallback for browsers that don't support Web Share API
                prompt('Copy this link to share your results:', window.location.href);
            }
        });
    }
    
    // Initialize tooltips
    const infoTooltips = document.querySelectorAll('.info-tooltip');
    infoTooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            this.querySelector('.tooltip-text').style.visibility = 'visible';
            this.querySelector('.tooltip-text').style.opacity = '1';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            this.querySelector('.tooltip-text').style.visibility = 'hidden';
            this.querySelector('.tooltip-text').style.opacity = '0';
        });
    });
});

// Declare cropDatabase variable
const cropDatabase = [
    {
        name: 'Tomato',
        description: 'A popular garden crop.',
        growingTips: 'Grow in full sun and well-draining soil.',
        soilTypes: ['Loamy', 'Sandy'],
        phRange: { min: 6.0, max: 6.8 },
        waterNeeds: ['Moderate'],
        temperature: ['Warm', 'Hot'],
        category: 'Vegetable'
    },
    // Add more crops here
];

// Generate recommendations based on input data
function generateRecommendations(formData) {
    // Filter crops based on user input
    const matchingCrops = cropDatabase.filter(crop => {
        // Check if crop matches soil type
        const soilMatch = crop.soilTypes.includes(formData.soilType);
        
        // Check if crop matches rainfall
        const rainfallMatch = crop.rainfall.includes(formData.rainfall);
        
        // Check if crop matches temperature
        const temperatureMatch = crop.temperature.includes(formData.temperature);
        
        // Check if crop matches water availability
        const waterMatch = crop.waterNeeds.includes(formData.waterAvailability);
        
        // Check if crop matches pH level
        const phMatch = formData.phLevel >= crop.phRange.min && formData.phLevel <= crop.phRange.max;
        
        // Check if crop matches goal
        const goalMatch = crop.category === formData.goal;
        
        // Return true if all conditions match
        return soilMatch && rainfallMatch && temperatureMatch && waterMatch && phMatch && goalMatch;
    });
    
    // If no exact matches, try with more relaxed criteria
    let relaxedCrops = [];
    if (matchingCrops.length < 3) {
        relaxedCrops = cropDatabase.filter(crop => {
            // Check if crop matches soil type
            const soilMatch = crop.soilTypes.includes(formData.soilType);
            
            // Check if crop matches either rainfall or water availability
            const waterMatch = crop.rainfall.includes(formData.rainfall) || 
                              crop.waterNeeds.includes(formData.waterAvailability);
            
            // Check if crop matches temperature
            const temperatureMatch = crop.temperature.includes(formData.temperature);
            
            // Check if crop matches goal
            const goalMatch = crop.category === formData.goal;
            
            // Return true if soil matches and at least water or temperature matches
            return soilMatch && (waterMatch || temperatureMatch) && goalMatch;
        });
    }
    
    // Generate fertility tips based on soil type and pH
    const fertilityTips = generateFertilityTips(formData);
    
    // Generate water management tips
    const waterTips = generateWaterTips(formData);
    
    // Generate planting season recommendations
    const plantingSeasonTips = generatePlantingSeasonTips(formData);
    
    return {
        exactMatches: matchingCrops,
        relaxedMatches: relaxedCrops,
        fertilityTips,
        waterTips,
        plantingSeasonTips
    };
}

// Display recommendations in the results section
function displayRecommendations(recommendations, formData) {
    const container = document.getElementById('recommendationsContainer');
    container.innerHTML = '';
    
    // Create recommendations HTML
    let html = '';
    
    // Add land summary
    html += `
        <div class="land-summary">
            <h3><i class="fas fa-map-marker-alt"></i> Your Land Summary</h3>
            <p><strong>Area:</strong> ${formData.area} acres</p>
            <p><strong>Soil Type:</strong> ${formData.soilType}</p>
            <p><strong>pH Level:</strong> ${formData.phLevel}</p>
            <p><strong>Rainfall:</strong> ${formData.rainfall}</p>
            <p><strong>Temperature:</strong> ${formData.temperature}</p>
            <p><strong>Water Availability:</strong> ${formData.waterAvailability}</p>
            <p><strong>Goal:</strong> ${formData.goal}</p>
        </div>
    `;
    
    // Add crop recommendations
    html += `
        <div class="crop-recommendation">
            <h3><i class="fas fa-seedling"></i> Recommended Crops/Trees</h3>
    `;
    
    if (recommendations.exactMatches.length > 0) {
        html += '<p>These crops are an excellent match for your land conditions:</p>';
        html += '<div class="crop-list">';
        recommendations.exactMatches.forEach(crop => {
            html += `
                <div class="crop-item">
                    <h4>${crop.name}</h4>
                    <p>${crop.description}</p>
                    <p><strong>Growing Tips:</strong> ${crop.growingTips}</p>
                    <div class="crop-details">
                        <span class="crop-tag">pH: ${crop.phRange.min}-${crop.phRange.max}</span>
                        <span class="crop-tag">Water: ${crop.waterNeeds.join(', ')}</span>
                        <span class="crop-tag">Temperature: ${crop.temperature.join(', ')}</span>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    } else if (recommendations.relaxedMatches.length > 0) {
        html += '<p>No exact matches found, but these crops may grow with proper management:</p>';
        html += '<div class="crop-list">';
        recommendations.relaxedMatches.forEach(crop => {
            html += `
                <div class="crop-item">
                    <h4>${crop.name}</h4>
                    <p>${crop.description}</p>
                    <p><strong>Growing Tips:</strong> ${crop.growingTips}</p>
                    <div class="crop-details">
                        <span class="crop-tag">pH: ${crop.phRange.min}-${crop.phRange.max}</span>
                        <span class="crop-tag">Water: ${crop.waterNeeds.join(', ')}</span>
                        <span class="crop-tag">Temperature: ${crop.temperature.join(', ')}</span>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    } else {
        html += '<p>No matches found for your criteria. Consider adjusting your land parameters or exploring different crop categories.</p>';
    }
    
    html += '</div>';
    
    // Add fertility tips
    html += `
        <div class="crop-recommendation">
            <h3><i class="fas fa-flask"></i> Soil Fertility Tips</h3>
            <p>${recommendations.fertilityTips}</p>
        </div>
    `;
    
    // Add water management tips
    html += `
        <div class="crop-recommendation">
            <h3><i class="fas fa-tint"></i> Water Management</h3>
            <p>${recommendations.waterTips}</p>
        </div>
    `;
    
    // Add planting season tips
    html += `
        <div class="crop-recommendation">
            <h3><i class="fas fa-calendar-alt"></i> Planting Season</h3>
            <p>${recommendations.plantingSeasonTips}</p>
        </div>
    `;
    
    container.innerHTML = html;
}

// Generate fertility tips based on soil type and pH
function generateFertilityTips(formData) {
    let tips = '';
    
    // Tips based on soil type
    switch (formData.soilType) {
        case 'Clay':
            tips += 'Clay soil tends to be nutrient-rich but can become compacted. Add organic matter like compost to improve drainage and structure. Consider adding gypsum to break up heavy clay. ';
            break;
        case 'Sandy':
            tips += 'Sandy soil drains quickly and loses nutrients easily. Add plenty of compost and organic matter to improve water retention and nutrient content. Consider using slow-release fertilizers. ';
            break;
        case 'Loamy':
            tips += 'Loamy soil is ideal for most crops. Maintain its quality by adding compost annually and practicing crop rotation. ';
            break;
        case 'Silt':
            tips += 'Silt soil is fertile but can become compacted. Add organic matter to improve structure and avoid working the soil when wet. ';
            break;
        case 'Peaty':
            tips += 'Peaty soil is acidic and high in organic matter. It may need lime to adjust pH and additional nutrients like phosphorus and potassium. ';
            break;
        case 'Chalky':
            tips += 'Chalky soil is alkaline and often lacks nutrients. Add organic matter and use acidifying fertilizers if growing acid-loving plants. ';
            break;
    }
    
    // Tips based on pH
    if (formData.phLevel < 5.5) {
        tips += 'Your soil is quite acidic. Consider adding agricultural lime to raise the pH for most crops. ';
    } else if (formData.phLevel > 7.5) {
        tips += 'Your soil is alkaline. For most crops, add sulfur or organic matter like pine needles to lower the pH. ';
    } else {
        tips += 'Your soil pH is in a good range for most crops. Maintain it with regular additions of balanced compost. ';
    }
    
    // General tips
    tips += 'Regular soil testing is recommended to monitor nutrient levels and pH changes over time. Consider using cover crops during off-seasons to improve soil structure and fertility.';
    
    return tips;
}

// Generate water management tips
function generateWaterTips(formData) {
    let tips = '';
    
    // Tips based on rainfall and water availability
    if (formData.rainfall === 'Low' || formData.waterAvailability === 'Low') {
        tips += 'Consider implementing water conservation techniques such as drip irrigation, mulching, and rainwater harvesting. Choose drought-resistant crops when possible. ';
        
        if (formData.soilType === 'Sandy') {
            tips += 'Sandy soil drains quickly, so more frequent but lighter watering is recommended. Adding organic matter will improve water retention. ';
        }
    } else if (formData.rainfall === 'High' || formData.waterAvailability === 'High') {
        tips += 'Ensure proper drainage to prevent waterlogging and root rot. Consider raised beds or drainage ditches if needed. ';
        
        if (formData.soilType === 'Clay') {
            tips += 'Clay soil retains water, which can lead to waterlogging. Improve drainage with organic matter and avoid overwatering. ';
        }
    } else {
        tips += 'Maintain consistent soil moisture with regular monitoring. Water deeply but infrequently to encourage deep root growth. ';
    }
    
    // General water management tips
    tips += 'Apply mulch around plants to conserve moisture, suppress weeds, and regulate soil temperature. Morning watering is generally best to reduce evaporation and fungal disease risk. Consider installing a soil moisture sensor to optimize irrigation timing and amounts.';
    
    return tips;
}

// Generate planting season tips
function generatePlantingSeasonTips(formData) {
    let tips = '';
    
    // Tips based on temperature
    switch (formData.temperature) {
        case 'Cool':
            tips += 'In your cool climate, plant cool-season crops in early spring and fall. Protect tender plants from frost with row covers or cold frames. Consider extending your growing season with greenhouses or high tunnels. ';
            break;
        case 'Moderate':
            tips += 'Your moderate climate allows for a wide planting window. Spring and fall are ideal for most crops, while heat-loving plants should be planted after all danger of frost has passed. Consider succession planting to maximize harvests throughout the season. ';
            break;
        case 'Hot':
            tips += 'In your hot climate, plant heat-sensitive crops in the cooler seasons (late fall, winter, early spring). Heat-loving crops can be planted as temperatures rise. Provide afternoon shade for sensitive plants during the hottest months. Consider a summer cover crop to protect soil during extreme heat. ';
            break;
    }
    
    // Tips based on rainfall pattern
    if (formData.rainfall === 'High') {
        tips += 'Time your planting to avoid periods of heaviest rainfall, especially for seeds and seedlings that can be washed away. Consider raised beds to improve drainage during wet periods. ';
    } else if (formData.rainfall === 'Low') {
        tips += 'Plant at the beginning of the rainy season when possible to take advantage of natural precipitation. Consider using drought-resistant varieties and water-conserving techniques like deep mulching. ';
    }
    
    // General seasonal tips
    tips += 'Consider using succession planting techniques to extend your harvest season. Monitor local weather forecasts and be prepared to protect plants from unexpected temperature extremes. Keep a garden journal to track planting dates and results for future reference.';
    
    return tips;
}