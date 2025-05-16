document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Show the selected tab content
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
    
    // Update pH value display when slider is moved
    const phSlider = document.getElementById('phLevel');
    const phValue = document.getElementById('phValue');
    
    if (phSlider && phValue) {
        phSlider.addEventListener('input', function() {
            phValue.textContent = this.value;
        });
    }
    
    // Basic fertility form submission
    const basicFertilityForm = document.getElementById('basicFertilityForm');
    const fertilityResults = document.getElementById('fertility-results');
    const fertilityContainer = document.getElementById('fertilityContainer');
    
    if (basicFertilityForm) {
        basicFertilityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            basicFertilityForm.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            
            // Get form values
            const formData = {
                soilType: document.getElementById('soilType').value,
                phLevel: parseFloat(document.getElementById('phLevel').value),
                plantGrowth: document.querySelector('input[name="plantGrowth"]:checked').value,
                soilColor: document.querySelector('input[name="soilColor"]:checked').value,
                drainage: document.querySelector('input[name="drainage"]:checked').value,
                organicMatter: document.querySelector('input[name="organicMatter"]:checked').value
            };
            
            // Simulate processing delay for better UX
            setTimeout(() => {
                // Analyze fertility
                const fertilityAnalysis = analyzeBasicFertility(formData);
                
                // Display fertility results
                displayFertilityResults(formData, fertilityAnalysis);
                
                // Show results section, hide form
                document.getElementById('basic-tab').classList.add('hidden');
                fertilityResults.classList.remove('hidden');
                
                // Scroll to results
                fertilityResults.scrollIntoView({ behavior: 'smooth' });
                
                // Reset button text
                basicFertilityForm.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-flask"></i> Analyze Fertility';
            }, 1000);
        });
    }
    
    // Advanced fertility form submission
    const advancedFertilityForm = document.getElementById('advancedFertilityForm');
    
    if (advancedFertilityForm) {
        advancedFertilityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            advancedFertilityForm.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            
            // Get form values
            const formData = {
                soilType: document.getElementById('adv-soilType').value,
                phLevel: parseFloat(document.getElementById('adv-phLevel').value),
                nitrogenLevel: document.getElementById('nitrogenLevel').value ? parseFloat(document.getElementById('nitrogenLevel').value) : null,
                phosphorusLevel: document.getElementById('phosphorusLevel').value ? parseFloat(document.getElementById('phosphorusLevel').value) : null,
                potassiumLevel: document.getElementById('potassiumLevel').value ? parseFloat(document.getElementById('potassiumLevel').value) : null,
                organicMatterPercent: document.getElementById('organicMatterPercent').value ? parseFloat(document.getElementById('organicMatterPercent').value) : null,
                cationExchange: document.getElementById('cationExchange').value ? parseFloat(document.getElementById('cationExchange').value) : null,
                calciumLevel: document.getElementById('calciumLevel').value ? parseFloat(document.getElementById('calciumLevel').value) : null,
                magnesiumLevel: document.getElementById('magnesiumLevel').value ? parseFloat(document.getElementById('magnesiumLevel').value) : null,
                sulfurLevel: document.getElementById('sulfurLevel').value ? parseFloat(document.getElementById('sulfurLevel').value) : null
            };
            
            // Simulate processing delay for better UX
            setTimeout(() => {
                // Analyze fertility
                const fertilityAnalysis = analyzeAdvancedFertility(formData);
                
                // Display fertility results
                displayAdvancedFertilityResults(formData, fertilityAnalysis);
                
                // Show results section, hide form
                document.getElementById('advanced-tab').classList.add('hidden');
                fertilityResults.classList.remove('hidden');
                
                // Scroll to results
                fertilityResults.scrollIntoView({ behavior: 'smooth' });
                
                // Reset button text
                advancedFertilityForm.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-flask"></i> Analyze Fertility';
            }, 1000);
        });
    }
    
    // Back to fertility form button
    const backToFertilityForm = document.getElementById('backToFertilityForm');
    
    if (backToFertilityForm) {
        backToFertilityForm.addEventListener('click', function() {
            // Hide results
            fertilityResults.classList.add('hidden');
            
            // Show the active tab
            const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
            document.getElementById(activeTab + '-tab').classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Print fertility results
    const printFertility = document.getElementById('printFertility');
    
    if (printFertility) {
        printFertility.addEventListener('click', function() {
            window.print();
        });
    }
});

// Analyze basic fertility
function analyzeBasicFertility(formData) {
    // Calculate fertility scores (0-100)
    let overallScore = 0;
    let nutrientScore = 0;
    let structureScore = 0;
    let organicMatterScore = 0;
    let phScore = 0;
    
    // Nutrient score based on soil type, color, and plant growth
    switch (formData.soilType) {
        case 'Loamy':
            nutrientScore += 25;
            break;
        case 'Clay':
            nutrientScore += 20;
            break;
        case 'Silt':
            nutrientScore += 18;
            break;
        case 'Peaty':
            nutrientScore += 15;
            break;
        case 'Sandy':
            nutrientScore += 10;
            break;
        case 'Chalky':
            nutrientScore += 8;
            break;
    }
    
    switch (formData.soilColor) {
        case 'Dark':
            nutrientScore += 15;
            break;
        case 'Medium':
            nutrientScore += 10;
            break;
        case 'Reddish':
            nutrientScore += 8;
            break;
        case 'Light':
            nutrientScore += 5;
            break;
    }
    
    switch (formData.plantGrowth) {
        case 'Excellent':
            nutrientScore += 20;
            break;
        case 'Good':
            nutrientScore += 15;
            break;
        case 'Fair':
            nutrientScore += 10;
            break;
        case 'Poor':
            nutrientScore += 5;
            break;
    }
    
    // Normalize nutrient score to 0-100
    nutrientScore = Math.min(Math.round(nutrientScore * 1.67), 100);
    
    // Structure score based on soil type and drainage
    switch (formData.soilType) {
        case 'Loamy':
            structureScore += 25;
            break;
        case 'Silt':
            structureScore += 20;
            break;
        case 'Sandy':
            structureScore += 15;
            break;
        case 'Peaty':
            structureScore += 15;
            break;
        case 'Clay':
            structureScore += 10;
            break;
        case 'Chalky':
            structureScore += 10;
            break;
    }
    
    switch (formData.drainage) {
        case 'Good':
            structureScore += 25;
            break;
        case 'Fair':
            structureScore += 15;
            break;
        case 'Poor':
            structureScore += 5;
            break;
        case 'Excessive':
            structureScore += 10;
            break;
    }
    
    // Normalize structure score to 0-100
    structureScore = Math.min(Math.round(structureScore * 2), 100);
    
    // Organic matter score
    switch (formData.organicMatter) {
        case 'High':
            organicMatterScore = 90;
            break;
        case 'Medium':
            organicMatterScore = 60;
            break;
        case 'Low':
            organicMatterScore = 30;
            break;
    }
    
    // pH score (optimal range is 6.0-7.0)
    const ph = formData.phLevel;
    if (ph >= 6.0 && ph <= 7.0) {
        phScore = 100;
    } else if (ph >= 5.5 && ph < 6.0) {
        phScore = 80;
    } else if (ph > 7.0 && ph <= 7.5) {
        phScore = 80;
    } else if (ph >= 5.0 && ph < 5.5) {
        phScore = 60;
    } else if (ph > 7.5 && ph <= 8.0) {
        phScore = 60;
    } else if (ph >= 4.5 && ph < 5.0) {
        phScore = 40;
    } else if (ph > 8.0 && ph <= 8.5) {
        phScore = 40;
    } else {
        phScore = 20;
    }
    
    // Calculate overall score (weighted average)
    overallScore = Math.round(
        (nutrientScore * 0.3) +
        (structureScore * 0.25) +
        (organicMatterScore * 0.25) +
        (phScore * 0.2)
    );
    
    // Generate recommendations
    let recommendations = [];
    
    // Nutrient recommendations
    if (nutrientScore < 50) {
        recommendations.push('Your soil appears to be nutrient deficient. Consider a comprehensive soil test to identify specific nutrient needs.');
        recommendations.push('Apply balanced organic fertilizer to improve overall nutrient content.');
        
        if (formData.soilType === 'Sandy') {
            recommendations.push('Sandy soils lose nutrients quickly. Use slow-release fertilizers and add plenty of compost.');
        } else if (formData.soilType === 'Chalky') {
            recommendations.push('Chalky soils often lack iron and manganese. Consider adding iron sulfate and manganese sulfate.');
        }
    } else if (nutrientScore < 75) {
        recommendations.push('Your soil has moderate nutrient levels. Regular additions of compost will help maintain and improve fertility.');
        
        if (formData.plantGrowth === 'Fair' || formData.plantGrowth === 'Poor') {
            recommendations.push('Despite moderate nutrient levels, plant growth is suboptimal. Consider testing for micronutrient deficiencies.');
        }
    } else {
        recommendations.push('Your soil appears to have good nutrient levels. Continue your current practices and monitor regularly.');
    }
    
    // Structure recommendations
    if (structureScore < 50) {
        recommendations.push('Your soil structure needs improvement to enhance root growth and water movement.');
        
        if (formData.soilType === 'Clay') {
            recommendations.push('Add gypsum to break up clay soil and improve drainage. Avoid working clay soil when wet.');
        } else if (formData.soilType === 'Sandy') {
            recommendations.push('Add organic matter to improve water retention in sandy soil.');
        }
        
        if (formData.drainage === 'Poor') {
            recommendations.push('Consider installing drainage systems or creating raised beds to improve drainage.');
        } else if (formData.drainage === 'Excessive') {
            recommendations.push('Add organic matter to improve water retention in your fast-draining soil.');
        }
    } else if (structureScore < 75) {
        recommendations.push('Your soil has moderate structure. Regular additions of organic matter will continue to improve it.');
    } else {
        recommendations.push('Your soil has good structure. Continue adding organic matter annually to maintain it.');
    }
    
    // Organic matter recommendations
    if (organicMatterScore < 50) {
        recommendations.push('Your soil is low in organic matter. Add compost, well-rotted manure, or other organic materials.');
        recommendations.push('Consider cover cropping or green manures to build organic matter over time.');
    } else if (organicMatterScore < 75) {
        recommendations.push('Your soil has moderate organic matter. Continue adding compost or other organic materials annually.');
    } else {
        recommendations.push('Your soil has good organic matter content. Maintain with regular additions of compost.');
    }
    
    // pH recommendations
    if (ph < 5.5) {
        recommendations.push(`Your soil pH of ${ph} is acidic. Add agricultural lime to raise pH for most crops.`);
        recommendations.push('After liming, wait at least 3 months before retesting pH.');
    } else if (ph > 7.5) {
        recommendations.push(`Your soil pH of ${ph} is alkaline. Add sulfur, peat moss, or acidic organic matter to lower pH for most crops.`);
    } else {
        recommendations.push(`Your soil pH of ${ph} is in a good range for most crops. Monitor annually to ensure it stays in this range.`);
    }
    
    return {
        overallScore,
        nutrientScore,
        structureScore,
        organicMatterScore,
        phScore,
        recommendations
    };
}

// Analyze advanced fertility
function analyzeAdvancedFertility(formData) {
    // Calculate fertility scores (0-100)
    let overallScore = 0;
    let nutrientScore = 0;
    let structureScore = 0;
    let organicMatterScore = 0;
    let phScore = 0;
    
    // pH score (optimal range is 6.0-7.0)
    const ph = formData.phLevel;
    if (ph >= 6.0 && ph <= 7.0) {
        phScore = 100;
    } else if (ph >= 5.5 && ph < 6.0) {
        phScore = 80;
    } else if (ph > 7.0 && ph <= 7.5) {
        phScore = 80;
    } else if (ph >= 5.0 && ph < 5.5) {
        phScore = 60;
    } else if (ph > 7.5 && ph <= 8.0) {
        phScore = 60;
    } else if (ph >= 4.5 && ph < 5.0) {
        phScore = 40;
    } else if (ph > 8.0 && ph <= 8.5) {
        phScore = 40;
    } else {
        phScore = 20;
    }
    
    // Nutrient score based on NPK levels
    if (formData.nitrogenLevel !== null) {
        // Nitrogen evaluation (typical range: 20-80 ppm)
        if (formData.nitrogenLevel >= 40 && formData.nitrogenLevel <= 80) {
            nutrientScore += 25;
        } else if (formData.nitrogenLevel >= 20 && formData.nitrogenLevel < 40) {
            nutrientScore += 15;
        } else if (formData.nitrogenLevel > 80 && formData.nitrogenLevel <= 100) {
            nutrientScore += 15;
        } else if (formData.nitrogenLevel < 20) {
            nutrientScore += 5;
        } else if (formData.nitrogenLevel > 100) {
            nutrientScore += 10;
        }
    } else {
        nutrientScore += 12.5; // Default if not provided
    }
    
    if (formData.phosphorusLevel !== null) {
        // Phosphorus evaluation (typical range: 10-40 ppm)
        if (formData.phosphorusLevel >= 20 && formData.phosphorusLevel <= 40) {
            nutrientScore += 25;
        } else if (formData.phosphorusLevel >= 10 && formData.phosphorusLevel < 20) {
            nutrientScore += 15;
        } else if (formData.phosphorusLevel > 40 && formData.phosphorusLevel <= 60) {
            nutrientScore += 15;
        } else if (formData.phosphorusLevel < 10) {
            nutrientScore += 5;
        } else if (formData.phosphorusLevel > 60) {
            nutrientScore += 10;
        }
    } else {
        nutrientScore += 12.5; // Default if not provided
    }
    
    if (formData.potassiumLevel !== null) {
        // Potassium evaluation (typical range: 100-300 ppm)
        if (formData.potassiumLevel >= 150 && formData.potassiumLevel <= 300) {
            nutrientScore += 25;
        } else if (formData.potassiumLevel >= 100 && formData.potassiumLevel < 150) {
            nutrientScore += 15;
        } else if (formData.potassiumLevel > 300 && formData.potassiumLevel <= 400) {
            nutrientScore += 15;
        } else if (formData.potassiumLevel < 100) {
            nutrientScore += 5;
        } else if (formData.potassiumLevel > 400) {
            nutrientScore += 10;
        }
    } else {
        nutrientScore += 12.5; // Default if not provided
    }
    
    if (formData.calciumLevel !== null && formData.magnesiumLevel !== null) {
        // Secondary nutrients evaluation
        const caToMgRatio = formData.calciumLevel / formData.magnesiumLevel;
        if (caToMgRatio >= 5 && caToMgRatio <= 8) {
            nutrientScore += 25;
        } else if ((caToMgRatio >= 3 && caToMgRatio < 5) || (caToMgRatio > 8 && caToMgRatio <= 10)) {
            nutrientScore += 15;
        } else {
            nutrientScore += 5;
        }
    } else {
        nutrientScore += 12.5; // Default if not provided
    }
    
    // Structure score based on soil type and CEC
    switch (formData.soilType) {
        case 'Loamy':
            structureScore += 40;
            break;
        case 'Silt':
            structureScore += 30;
            break;
        case 'Clay':
            structureScore += 20;
            break;
        case 'Peaty':
            structureScore += 25;
            break;
        case 'Sandy':
            structureScore += 15;
            break;
        case 'Chalky':
            structureScore += 15;
            break;
    }
    
    if (formData.cationExchange !== null) {
        // CEC evaluation (typical range: 5-30 meq/100g)
        if (formData.cationExchange >= 15 && formData.cationExchange <= 25) {
            structureScore += 60;
        } else if (formData.cationExchange >= 10 && formData.cationExchange < 15) {
            structureScore += 50;
        } else if (formData.cationExchange > 25 && formData.cationExchange <= 30) {
            structureScore += 50;
        } else if (formData.cationExchange >= 5 && formData.cationExchange < 10) {
            structureScore += 30;
        } else if (formData.cationExchange > 30) {
            structureScore += 40;
        } else if (formData.cationExchange < 5) {
            structureScore += 20;
        }
    } else {
        structureScore += 30; // Default if not provided
    }
    
    // Normalize structure score to 0-100
    structureScore = Math.min(structureScore, 100);
    
    // Organic matter score
    if (formData.organicMatterPercent !== null) {
        if (formData.organicMatterPercent >= 3 && formData.organicMatterPercent <= 6) {
            organicMatterScore = 100;
        } else if (formData.organicMatterPercent >= 2 && formData.organicMatterPercent < 3) {
            organicMatterScore = 75;
        } else if (formData.organicMatterPercent > 6 && formData.organicMatterPercent <= 10) {
            organicMatterScore = 80;
        } else if (formData.organicMatterPercent >= 1 && formData.organicMatterPercent < 2) {
            organicMatterScore = 50;
        } else if (formData.organicMatterPercent > 10) {
            organicMatterScore = 70;
        } else if (formData.organicMatterPercent < 1) {
            organicMatterScore = 25;
        }
    } else {
        // Estimate organic matter from soil type if not provided
        switch (formData.soilType) {
            case 'Peaty':
                organicMatterScore = 90;
                break;
            case 'Loamy':
                organicMatterScore = 70;
                break;
            case 'Silt':
                organicMatterScore = 60;
                break;
            case 'Clay':
                organicMatterScore = 50;
                break;
            case 'Sandy':
                organicMatterScore = 30;
                break;
            case 'Chalky':
                organicMatterScore = 30;
                break;
        }
    }
    
    // Calculate overall score (weighted average)
    overallScore = Math.round(
        (nutrientScore * 0.35) +
        (structureScore * 0.25) +
        (organicMatterScore * 0.25) +
        (phScore * 0.15)
    );
    
    // Generate recommendations
    let recommendations = [];
    
    // Nutrient recommendations
    if (nutrientScore < 50) {
        recommendations.push('Your soil has significant nutrient deficiencies that need to be addressed.');
        
        if (formData.nitrogenLevel !== null && formData.nitrogenLevel < 20) {
            recommendations.push('Nitrogen is very low. Add nitrogen-rich amendments like blood meal, composted manure, or a balanced organic fertilizer.');
        }
        
        if (formData.phosphorusLevel !== null && formData.phosphorusLevel < 10) {
            recommendations.push('Phosphorus is very low. Add bone meal, rock phosphate, or fish meal to increase phosphorus levels.');
        }
        
        if (formData.potassiumLevel !== null && formData.potassiumLevel < 100) {
            recommendations.push('Potassium is very low. Add wood ash, greensand, or potassium sulfate to increase potassium levels.');
        }
        
        if (formData.calciumLevel !== null && formData.calciumLevel < 1000) {
            recommendations.push('Calcium is low. Add agricultural lime or gypsum to increase calcium levels.');
        }
        
        if (formData.magnesiumLevel !== null && formData.magnesiumLevel < 100) {
            recommendations.push('Magnesium is low. Add Epsom salts or dolomitic lime to increase magnesium levels.');
        }
        
        if (formData.sulfurLevel !== null && formData.sulfurLevel < 10) {
            recommendations.push('Sulfur is low. Add gypsum or elemental sulfur to increase sulfur levels.');
        }
    } else if (nutrientScore < 75) {
        recommendations.push('Your soil has moderate nutrient levels. Some targeted amendments would be beneficial.');
        
        if (formData.nitrogenLevel !== null && formData.nitrogenLevel < 40) {
            recommendations.push('Nitrogen is somewhat low. Add moderate amounts of nitrogen-rich amendments.');
        }
        
        if (formData.phosphorusLevel !== null && formData.phosphorusLevel < 20) {
            recommendations.push('Phosphorus is somewhat low. Add moderate amounts of phosphorus-rich amendments.');
        }
        
        if (formData.potassiumLevel !== null && formData.potassiumLevel < 150) {
            recommendations.push('Potassium is somewhat low. Add moderate amounts of potassium-rich amendments.');
        }
    } else {
        recommendations.push('Your soil has good nutrient levels. Continue your current fertility management practices.');
    }
    
    // Structure recommendations
    if (structureScore < 50) {
        recommendations.push('Your soil structure needs significant improvement.');
        
        if (formData.cationExchange !== null && formData.cationExchange < 10) {
            recommendations.push('Low CEC indicates poor ability to hold nutrients. Add organic matter to improve CEC and nutrient retention.');
        }
        
        if (formData.soilType === 'Sandy') {
            recommendations.push('Sandy soils have poor structure. Add plenty of organic matter and consider using cover crops to build soil structure.');
        } else if (formData.soilType === 'Clay') {
            recommendations.push('Clay soils can become compacted. Add organic matter and gypsum to improve structure and drainage.');
        }
    } else if (structureScore < 75) {
        recommendations.push('Your soil has moderate structure. Continue adding organic matter to improve it further.');
    } else {
        recommendations.push('Your soil has good structure. Maintain with regular additions of organic matter.');
    }
    
    // Organic matter recommendations
    if (organicMatterScore < 50) {
        recommendations.push('Your soil is low in organic matter. Implement a comprehensive organic matter building program.');
        recommendations.push('Add compost, well-rotted manure, and use cover crops or green manures to build organic matter over time.');
        recommendations.push('Consider reducing tillage to preserve soil organic matter.');
    } else if (organicMatterScore < 75) {
        recommendations.push('Your soil has moderate organic matter. Continue adding organic materials annually.');
    } else {
        recommendations.push('Your soil has good organic matter content. Maintain with regular additions of compost or other organic materials.');
    }
    
    // pH recommendations
    if (ph < 5.5) {
        recommendations.push(`Your soil pH of ${ph} is acidic. Add agricultural lime to raise pH for most crops.`);
        
        if (formData.calciumLevel !== null && formData.calciumLevel < 1000) {
            recommendations.push('Using calcitic lime will address both pH and calcium deficiency.');
        } else if (formData.magnesiumLevel !== null && formData.magnesiumLevel < 100) {
            recommendations.push('Using dolomitic lime will address both pH and magnesium deficiency.');
        } else {
            recommendations.push('Use calcitic lime unless you need to add magnesium.');
        }
    } else if (ph > 7.5) {
        recommendations.push(`Your soil pH of ${ph} is alkaline. Add sulfur, peat moss, or acidic organic matter to lower pH for most crops.`);
        
        if (formData.sulfurLevel !== null && formData.sulfurLevel < 10) {
            recommendations.push('Using elemental sulfur will address both pH and sulfur deficiency.');
        }
    } else {
        recommendations.push(`Your soil pH of ${ph} is in a good range for most crops. Monitor annually to ensure it stays in this range.`);
    }
    
    return {
        overallScore,
        nutrientScore,
        structureScore,
        organicMatterScore,
        phScore,
        recommendations
    };
}

// Display basic fertility results
function displayFertilityResults(formData, fertilityAnalysis) {
    const container = document.getElementById('fertilityContainer');
    container.innerHTML = '';
    
    // Determine score categories
    const getScoreCategory = (score) => {
        if (score >= 80) return 'meter-high';
        if (score >= 50) return 'meter-medium';
        return 'meter-low';
    };
    
    // Create HTML
    let html = `
        <div class="land-summary">
            <h3><i class="fas fa-map-marker-alt"></i> Your Soil Information</h3>
            <p><strong>Soil Type:</strong> ${formData.soilType}</p>
            <p><strong>pH Level:</strong> ${formData.phLevel}</p>
            <p><strong>Plant Growth:</strong> ${formData.plantGrowth}</p>
            <p><strong>Soil Color:</strong> ${formData.soilColor}</p>
            <p><strong>Drainage:</strong> ${formData.drainage}</p>
            <p><strong>Organic Matter:</strong> ${formData.organicMatter}</p>
        </div>
        
        <div class="fertility-result-card">
            <h3><i class="fas fa-chart-pie"></i> Fertility Analysis</h3>
            <p>Based on your inputs, we've analyzed your soil fertility across several key factors.</p>
            
            <div class="fertility-meters">
                <div class="fertility-meter">
                    <div class="meter-label">Overall Fertility</div>
                    <div class="meter-circle ${getScoreCategory(fertilityAnalysis.overallScore)}">
                        ${fertilityAnalysis.overallScore}%
                    </div>
                    <div class="meter-value">
                        ${fertilityAnalysis.overallScore >= 80 ? 'Excellent' : 
                          fertilityAnalysis.overallScore >= 60 ? 'Good' : 
                          fertilityAnalysis.overallScore >= 40 ? 'Fair' : 'Poor'}
                    </div>
                </div>
                
                <div class="fertility-meter">
                    <div class="meter-label">Nutrient Content</div>
                    <div class="meter-circle ${getScoreCategory(fertilityAnalysis.nutrientScore)}">
                        ${fertilityAnalysis.nutrientScore}%
                    </div>
                    <div class="meter-value">
                        ${fertilityAnalysis.nutrientScore >= 80 ? 'High' : 
                          fertilityAnalysis.nutrientScore >= 50 ? 'Medium' : 'Low'}
                    </div>
                </div>
                
                <div class="fertility-meter">
                    <div class="meter-label">Soil Structure</div>
                    <div class="meter-circle ${getScoreCategory(fertilityAnalysis.structureScore)}">
                        ${fertilityAnalysis.structureScore}%
                    </div>
                    <div class="meter-value">
                        ${fertilityAnalysis.structureScore >= 80 ? 'Excellent' : 
                          fertilityAnalysis.structureScore >= 50 ? 'Good' : 'Poor'}
                    </div>
                </div>
                
                <div class="fertility-meter">
                    <div class="meter-label">Organic Matter</div>
                    <div class="meter-circle ${getScoreCategory(fertilityAnalysis.organicMatterScore)}">
                        ${fertilityAnalysis.organicMatterScore}%
                    </div>
                    <div class="meter-value">
                        ${fertilityAnalysis.organicMatterScore >= 80 ? 'High' : 
                          fertilityAnalysis.organicMatterScore >= 50 ? 'Medium' : 'Low'}
                    </div>
                </div>
                
                <div class="fertility-meter">
                    <div class="meter-label">pH Suitability</div>
                    <div class="meter-circle ${getScoreCategory(fertilityAnalysis.phScore)}">
                        ${fertilityAnalysis.phScore}%
                    </div>
                    <div class="meter-value">
                        ${fertilityAnalysis.phScore >= 80 ? 'Optimal' : 
                          fertilityAnalysis.phScore >= 50 ? 'Acceptable' : 'Problematic'}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="fertility-result-card">
            <h3><i class="fas fa-lightbulb"></i> Recommendations</h3>
            <ul class="recommendations-list">
    `;
    
    fertilityAnalysis.recommendations.forEach(recommendation => {
        html += `<li>${recommendation}</li>`;
    });
    
    html += `
            </ul>
        </div>
        
        <div class="fertility-result-card">
            <h3><i class="fas fa-seedling"></i> Next Steps</h3>
            <ul class="recommendations-list">
                <li>For more precise recommendations, consider getting a professional soil test from your local agricultural extension office.</li>
                <li>Implement the suggested amendments gradually over time, rather than all at once.</li>
                <li>Retest your soil annually to monitor changes and adjust your soil management practices.</li>
                <li>Consider crop rotation and cover cropping to naturally improve soil fertility over time.</li>
                <li>Keep a record of amendments applied and crop performance to track improvements.</li>
            </ul>
        </div>
    `;
    
    container.innerHTML = html;
}

// Display advanced fertility results
function displayAdvancedFertilityResults(formData, fertilityAnalysis) {
    const container = document.getElementById('fertilityContainer');
    container.innerHTML = '';
    
    // Determine score categories
    const getScoreCategory = (score) => {
        if (score >= 80) return 'meter-high';
        if (score >= 50) return 'meter-medium';
        return 'meter-low';
    };
    
    // Create HTML
    let html = `
        <div class="land-summary">
            <h3><i class="fas fa-flask"></i> Your Soil Test Results</h3>
            <p><strong>Soil Type:</strong> ${formData.soilType}</p>
            <p><strong>pH Level:</strong> ${formData.phLevel}</p>
    `;
    
    if (formData.nitrogenLevel !== null) {
        html += `<p><strong>Nitrogen (N):</strong> ${formData.nitrogenLevel} ppm</p>`;
    }
    
    if (formData.phosphorusLevel !== null) {
        html += `<p><strong>Phosphorus (P):</strong> ${formData.phosphorusLevel} ppm</p>`;
    }
    
    if (formData.potassiumLevel !== null) {
        html += `<p><strong>Potassium (K):</strong> ${formData.potassiumLevel} ppm</p>`;
    }
    
    if (formData.organicMatterPercent !== null) {
        html += `<p><strong>Organic Matter:</strong> ${formData.organicMatterPercent}%</p>`;
    }
    
    if (formData.cationExchange !== null) {
        html += `<p><strong>Cation Exchange Capacity:</strong> ${formData.cationExchange} meq/100g</p>`;
    }
    
    if (formData.calciumLevel !== null) {
        html += `<p><strong>Calcium (Ca):</strong> ${formData.calciumLevel} ppm</p>`;
    }
    
    if (formData.magnesiumLevel !== null) {
        html += `<p><strong>Magnesium (Mg):</strong> ${formData.magnesiumLevel} ppm</p>`;
    }
    
    if (formData.sulfurLevel !== null) {
        html += `<p><strong>Sulfur (S):</strong> ${formData.sulfurLevel} ppm</p>`;
    }
    
    html += `
        </div>
        
        <div class="fertility-result-card">
            <h3><i class="fas fa-chart-pie"></i> Detailed Fertility Analysis</h3>
            <p>Based on your soil test results, we've analyzed your soil fertility across several key factors.</p>
            
            <div class="fertility-meters">
                <div class="fertility-meter">
                    <div class="meter-label">Overall Fertility</div>
                    <div class="meter-circle ${getScoreCategory(fertilityAnalysis.overallScore)}">
                        ${fertilityAnalysis.overallScore}%
                    </div>
                    <div class="meter-value">
                        ${fertilityAnalysis.overallScore >= 80 ? 'Excellent' : 
                          fertilityAnalysis.overallScore >= 60 ? 'Good' : 
                          fertilityAnalysis.overallScore >= 40 ? 'Fair' : 'Poor'}
                    </div>
                </div>
                
                <div class="fertility-meter">
                    <div class="meter-label">Nutrient Balance</div>
                    <div class="meter-circle ${getScoreCategory(fertilityAnalysis.nutrientScore)}">
                        ${fertilityAnalysis.nutrientScore}%
                    </div>
                    <div class="meter-value">
                        ${fertilityAnalysis.nutrientScore >= 80 ? 'Excellent' : 
                          fertilityAnalysis.nutrientScore >= 50 ? 'Good' : 'Poor'}
                    </div>
                </div>
                
                <div class="fertility-meter">
                    <div class="meter-label">Soil Structure</div>
                    <div class="meter-circle ${getScoreCategory(fertilityAnalysis.structureScore)}">
                        ${fertilityAnalysis.structureScore}%
                    </div>
                    <div class="meter-value">
                        ${fertilityAnalysis.structureScore >= 80 ? 'Excellent' : 
                          fertilityAnalysis.structureScore >= 50 ? 'Good' : 'Poor'}
                    </div>
                </div>
                
                <div class="fertility-meter">
                    <div class="meter-label">Organic Matter</div>
                    <div class="meter-circle ${getScoreCategory(fertilityAnalysis.organicMatterScore)}">
                        ${fertilityAnalysis.organicMatterScore}%
                    </div>
                    <div class="meter-value">
                        ${fertilityAnalysis.organicMatterScore >= 80 ? 'Optimal' : 
                          fertilityAnalysis.organicMatterScore >= 50 ? 'Adequate' : 'Low'}
                    </div>
                </div>
                
                <div class="fertility-meter">
                    <div class="meter-label">pH Suitability</div>
                    <div class="meter-circle ${getScoreCategory(fertilityAnalysis.phScore)}">
                        ${fertilityAnalysis.phScore}%
                    </div>
                    <div class="meter-value">
                        ${fertilityAnalysis.phScore >= 80 ? 'Optimal' : 
                          fertilityAnalysis.phScore >= 50 ? 'Acceptable' : 'Problematic'}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="fertility-result-card">
            <h3><i class="fas fa-lightbulb"></i> Detailed Recommendations</h3>
            <ul class="recommendations-list">
    `;
    
    fertilityAnalysis.recommendations.forEach(recommendation => {
        html += `<li>${recommendation}</li>`;
    });
    
    html += `
            </ul>
        </div>
        
        <div class="fertility-result-card">
            <h3><i class="fas fa-seedling"></i> Crop Suitability</h3>
            <p>Based on your soil analysis, these crop categories are most suitable for your soil:</p>
            
            <div class="crop-list">
    `;
    
    // Determine crop suitability based on soil parameters
    if (fertilityAnalysis.overallScore >= 75) {
        html += `
            <div class="crop-item">
                <h4>Vegetables</h4>
                <p>Most vegetables will thrive in your fertile soil. Consider high-value crops like tomatoes, peppers, and leafy greens.</p>
            </div>
            <div class="crop-item">
                <h4>Fruits</h4>
                <p>Fruit crops like berries and tree fruits should perform well with proper care.</p>
            </div>
            <div class="crop-item">
                <h4>Grains</h4>
                <p>Cereal grains and corn should produce excellent yields in your soil.</p>
            </div>
        `;
    } else if (fertilityAnalysis.overallScore >= 50) {
        html += `
            <div class="crop-item">
                <h4>Vegetables</h4>
                <p>Many vegetables will grow well, particularly root crops and less demanding leafy greens.</p>
            </div>
            <div class="crop-item">
                <h4>Cover Crops</h4>
                <p>Consider leguminous cover crops to further improve soil fertility.</p>
            </div>
            <div class="crop-item">
                <h4>Grains</h4>
                <p>Hardy grains like oats and rye should perform adequately.</p>
            </div>
        `;
    } else {
        html += `
            <div class="crop-item">
                <h4>Cover Crops</h4>
                <p>Focus on soil-building cover crops before attempting food crops.</p>
            </div>
            <div class="crop-item">
                <h4>Hardy Vegetables</h4>
                <p>After soil improvement, start with hardy vegetables like potatoes, beans, and squash.</p>
            </div>
            <div class="crop-item">
                <h4>Native Plants</h4>
                <p>Consider native plants adapted to your soil conditions while you work on improving fertility.</p>
            </div>
        `;
    }
    
    html += `
            </div>
        </div>
        
        <div class="fertility-result-card">
            <h3><i class="fas fa-calendar-alt"></i> Fertility Management Timeline</h3>
            <ul class="recommendations-list">
                <li><strong>Immediate (0-3 months):</strong> Address pH issues and major nutrient deficiencies.</li>
                <li><strong>Short-term (3-6 months):</strong> Add organic matter and implement cover cropping if appropriate for the season.</li>
                <li><strong>Medium-term (6-12 months):</strong> Continue building soil structure and organic matter content.</li>
                <li><strong>Long-term (1-3 years):</strong> Implement crop rotation and regular soil testing to monitor improvements.</li>
                <li><strong>Ongoing:</strong> Maintain soil health through regular additions of organic matter and balanced fertilization.</li>
            </ul>
        </div>
    `;
    
    container.innerHTML = html;
}