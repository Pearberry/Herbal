// ==========================================================================
// Pearl Gardens: Lip Balm Formulation Companion Logic
// ==========================================================================

// Embedded Database fallback for local file loading (bypasses CORS restrictions)
const INGREDIENTS_DB = {
  "waxes": [
    { "name": "Beeswax", "category": "Wax", "hardness": 5.0, "melting_point": "144°F – 149°F", "absorption": "Slow", "texture": "Hard Wax", "finish": "Barrier/Protective", "price_per_oz": 0.31 },
    { "name": "Candelilla Wax", "category": "Wax", "hardness": 10.0, "is_veg": true, "melting_point": "158°F – 163°F", "absorption": "Slow", "texture": "Very Hard Wax", "finish": "Glossy/Film", "price_per_oz": 1.18 }
  ],
  "solids": [
    { "name": "Shea Butter", "category": "Solid", "hardness": 0.3, "melting_point": "90°F", "absorption": "Medium", "texture": "Soft Butter", "finish": "Velvet", "price_per_oz": 0.56 },
    { "name": "Coconut Oil (Raw)", "category": "Solid", "hardness": 0.3, "melting_point": "76°F", "absorption": "Medium", "texture": "Soft Solid", "finish": "Satin", "price_per_oz": 0.47 },
    { "name": "Mango Butter", "category": "Solid", "hardness": 0.3, "melting_point": "86°F", "absorption": "Medium", "texture": "Creamy Solid", "finish": "Satin/Soft", "price_per_oz": 1.25 },
    { "name": "Babassu Oil", "category": "Solid", "hardness": 0.3, "melting_point": "76°F", "absorption": "Fast", "texture": "Soft Solid/Melts", "finish": "Slick/Glossy", "price_per_oz": 1.06 },
    { "name": "Hemp Butter", "category": "Solid", "hardness": 0.3, "melting_point": "95°F", "absorption": "Medium", "texture": "Soft Butter", "finish": "Satin", "price_per_oz": 1.56 }
  ],
  "brittles": [
    { "name": "Cocoa Butter", "category": "Brittle", "hardness": 1.2, "melting_point": "93°F – 100°F", "absorption": "Slow", "texture": "Hard Brittle Solid", "finish": "Rich/Protective", "price_per_oz": 1.25 },
    { "name": "Kokum Butter", "category": "Brittle", "hardness": 1.2, "melting_point": "100°F – 104°F", "absorption": "Fast", "texture": "Very Hard Brittle", "finish": "Dry Matte", "price_per_oz": 1.56 },
    { "name": "Murumuru Butter", "category": "Brittle", "hardness": 1.2, "melting_point": "91°F – 95°F", "absorption": "Medium", "texture": "Hard Butter", "finish": "Satin/Glossy", "price_per_oz": 1.56 },
    { "name": "Cupuaçu Butter", "category": "Brittle", "hardness": 1.2, "melting_point": "86°F – 104°F", "absorption": "Slow", "texture": "Soft Brittle", "finish": "Creamy/Heavy", "price_per_oz": 1.69 }
  ],
  "liquids": [
    { "name": "Jojoba Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Fast", "texture": "Thin Liquid", "finish": "Satin/Silky", "price_per_oz": 0.78 },
    { "name": "Sweet Almond Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Medium", "texture": "Medium Liquid", "finish": "Satin", "price_per_oz": 0.47 },
    { "name": "Avocado Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Slow", "texture": "Thick Liquid", "finish": "Rich/Heavy", "price_per_oz": 0.57 },
    { "name": "Apricot Kernel Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Fast", "texture": "Thin Liquid", "finish": "Satin/Silky", "price_per_oz": 0.53 },
    { "name": "Castor Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Slow", "texture": "Heavy Sticky Liquid", "finish": "High Gloss", "price_per_oz": 0.53 },
    { "name": "Rosehip Seed Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Fast", "texture": "Light Liquid", "finish": "Matte/Satin", "price_per_oz": 3.75 },
    { "name": "Grapeseed Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Fast", "texture": "Very Light Liquid", "finish": "Light Satin", "price_per_oz": 0.41 },
    { "name": "Squalane Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Fast", "texture": "Thin Liquid", "finish": "Satin/Silky", "price_per_oz": 2.81 },
    { "name": "Red Raspberry Seed Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Fast", "texture": "Light Liquid", "finish": "Satin", "price_per_oz": 2.87 },
    { "name": "Argan Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Medium", "texture": "Medium Liquid", "finish": "Satin", "price_per_oz": 1.87 },
    { "name": "Sunflower Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Medium", "texture": "Medium Liquid", "finish": "Satin", "price_per_oz": 0.37 },
    { "name": "Maracuja Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Fast", "texture": "Light Liquid", "finish": "Matte/Satin", "price_per_oz": 7.50 },
    { "name": "Sea Buckthorn Oil", "category": "Liquid", "hardness": 0.0, "melting_point": "Liquid", "absorption": "Medium", "texture": "Light Liquid", "finish": "Satin", "price_per_oz": 23.00 }
  ]
};

// Global App State
let recipe = [];
let targetFirmness = 125.5;
let database = INGREDIENTS_DB;

// Presets Definition
const RECIPE_PRESETS = {
  "standard": [
    { name: "Beeswax", percentage: 20.0, locked: false },
    { name: "Shea Butter", percentage: 25.0, locked: false },
    { name: "Cocoa Butter", percentage: 15.0, locked: false },
    { name: "Jojoba Oil", percentage: 40.0, locked: false }
  ],
  "standard_veg": [
    { name: "Candelilla Wax", percentage: 10.0, locked: false },
    { name: "Shea Butter", percentage: 35.0, locked: false },
    { name: "Cocoa Butter", percentage: 15.0, locked: false },
    { name: "Jojoba Oil", percentage: 40.0, locked: false }
  ],
  "empty": []
};

// Initialize Application
document.addEventListener("DOMContentLoaded", async () => {
    // Attempt to load external database file dynamically, fallback to embedded if fails (e.g. CORS)
    try {
        const response = await fetch("ingredients_db.json");
        if (response.ok) {
            database = await response.json();
            console.log("Database loaded dynamically from ingredients_db.json");
        }
    } catch (e) {
        console.warn("Could not load dynamic ingredients_db.json. Using embedded DB fallback.", e);
    }

    initializeUI();
    loadRecipePreset("standard");
    checkBirthday();
});

// Helper: Find ingredient item details from database
function findIngredient(name) {
    for (const cat in database) {
        const item = database[cat].find(i => i.name.toLowerCase() === name.toLowerCase());
        if (item) return item;
    }
    return null;
}

// UI Initialization & Event Listeners Hookup
function initializeUI() {
    // Populate Add Ingredient select dropdowns
    populateDropdownGroup("optgroup-waxes", database.waxes);
    populateDropdownGroup("optgroup-solids", database.solids);
    populateDropdownGroup("optgroup-brittles", database.brittles);
    populateDropdownGroup("optgroup-liquids", database.liquids);

    // Load presets into dropdown selector
    document.getElementById("select-preset").addEventListener("change", (e) => {
        const presetVal = e.target.value;
        if (RECIPE_PRESETS[presetVal]) {
            loadRecipePreset(presetVal);
        } else {
            // Check local storage saved recipes
            const saved = getSavedRecipes();
            if (saved[presetVal]) {
                recipe = JSON.parse(JSON.stringify(saved[presetVal]));
                renderRecipeList();
                updateCalculations();
            }
        }
    });

    // Add ingredient handler
    document.getElementById("select-add-ingredient").addEventListener("change", (e) => {
        const name = e.target.value;
        if (!name) return;
        
        // Prevent duplicate entries
        if (recipe.some(item => item.name.toLowerCase() === name.toLowerCase())) {
            alert(`${name} is already in the recipe!`);
            e.target.value = "";
            return;
        }

        const ing = findIngredient(name);
        if (ing) {
            // Allocate initial percentage based on remaining room, or 0%
            const currentTotal = getRecipeTotalPercentage();
            const initialPct = currentTotal < 100 ? Math.min(10, 100 - currentTotal) : 0;
            
            recipe.push({
                name: ing.name,
                percentage: parseFloat(initialPct.toFixed(2)),
                locked: false
            });
            
            // Adjust proportions if we exceeded 100%
            normalizeRecipe();
            renderRecipeList();
            updateCalculations();
        }
        e.target.value = "";
    });

    // Preset / Reset button
    document.getElementById("btn-reset").addEventListener("change", () => {}); // placeholder
    document.getElementById("btn-reset").onclick = () => {
        const currentPreset = document.getElementById("select-preset").value;
        if (RECIPE_PRESETS[currentPreset]) {
            loadRecipePreset(currentPreset);
        } else {
            loadRecipePreset("standard");
            document.getElementById("select-preset").value = "standard";
        }
    };

    // Normalize button
    document.getElementById("btn-normalize").onclick = () => {
        normalizeRecipe(true);
        renderRecipeList();
        updateCalculations();
    };

    // Target Profile Controls
    const targetSelector = document.getElementById("select-target-profile");
    const customTargetInput = document.getElementById("input-custom-target");

    targetSelector.addEventListener("change", (e) => {
        if (e.target.value === "custom") {
            customTargetInput.style.display = "block";
            targetFirmness = parseFloat(customTargetInput.value);
        } else {
            customTargetInput.style.display = "none";
            targetFirmness = parseFloat(e.target.value);
        }
    });

    customTargetInput.addEventListener("input", (e) => {
        targetFirmness = parseFloat(e.target.value) || 125.5;
    });

    // Smart Rebalance Button
    document.getElementById("btn-rebalance").onclick = () => {
        runSmartRebalance();
    };

    // Batch scaling controls
    document.getElementById("input-scale-amount").addEventListener("input", updateBatchScaling);
    document.getElementById("select-scale-unit").addEventListener("change", updateBatchScaling);

    // Save recipe logic
    document.getElementById("btn-save-recipe").onclick = () => {
        const nameInput = document.getElementById("input-recipe-name");
        const recipeName = nameInput.value.trim();
        if (!recipeName) {
            alert("Please enter a name for your formula!");
            return;
        }

        const saved = getSavedRecipes();
        saved[recipeName] = recipe;
        localStorage.setItem("pg_saved_recipes", JSON.stringify(saved));
        
        nameInput.value = "";
        alert(`Formula "${recipeName}" saved successfully!`);
        updateSavedRecipesDropdown();
    };

    // Markdown copy
    document.getElementById("btn-copy-markdown").onclick = () => {
        copyRecipeToClipboardMarkdown();
    };

    updateSavedRecipesDropdown();
}

// Populate ingredient selector groups
function populateDropdownGroup(groupId, list) {
    const optgroup = document.getElementById(groupId);
    optgroup.innerHTML = "";
    list.forEach(ing => {
        const option = document.createElement("option");
        option.value = ing.name;
        option.textContent = ing.name;
        optgroup.appendChild(option);
    });
}

// Load static preset recipe list
function loadRecipePreset(key) {
    recipe = JSON.parse(JSON.stringify(RECIPE_PRESETS[key]));
    renderRecipeList();
    updateCalculations();
}

// Sum of percentages currently in recipe
function getRecipeTotalPercentage() {
    return recipe.reduce((sum, item) => sum + item.percentage, 0);
}

// Render dynamic recipe elements
function renderRecipeList() {
    const listContainer = document.getElementById("recipe-ingredients");
    listContainer.innerHTML = "";

    recipe.forEach((item, index) => {
        const ing = findIngredient(item.name);
        if (!ing) return;

        const row = document.createElement("div");
        row.className = "ingredient-row";
        row.dataset.index = index;

        // Clean category tags
        const categoryClass = `category-tag-${ing.category.toLowerCase()}`;

        row.innerHTML = `
            <div class="ingredient-info">
                <span class="ingredient-name">${item.name}</span>
                <span class="ingredient-category ${categoryClass}">${ing.category}</span>
            </div>
            
            <div class="ingredient-pct-control">
                <input type="number" class="input-pct" value="${item.percentage.toFixed(2)}" min="0" max="100" step="0.1">
                <span>%</span>
            </div>

            <button class="lock-btn ${item.locked ? 'locked' : ''}" title="Lock percentage during rebalancing">
                <i class="fa-solid ${item.locked ? 'fa-lock' : 'fa-lock-open'}"></i>
            </button>

            <button class="btn-danger" title="Delete ingredient from recipe">
                <i class="fa-solid fa-trash-can"></i>
            </button>

            <div class="slider-container">
                <input type="range" class="slider-range" min="0" max="100" step="0.1" value="${item.percentage.toFixed(2)}">
            </div>
        `;

        // Event hooks
        const slider = row.querySelector(".slider-range");
        const numberInput = row.querySelector(".input-pct");
        const lockBtn = row.querySelector(".lock-btn");
        const deleteBtn = row.querySelector(".btn-danger");

        // Sync slider to number
        slider.addEventListener("input", (e) => {
            const newVal = parseFloat(e.target.value);
            adjustIngredientSlider(index, newVal);
        });

        // Sync number input to slider
        numberInput.addEventListener("change", (e) => {
            let newVal = parseFloat(e.target.value) || 0;
            newVal = Math.max(0, Math.min(100, newVal));
            adjustIngredientSlider(index, newVal);
        });

        // Lock button
        lockBtn.onclick = () => {
            item.locked = !item.locked;
            lockBtn.classList.toggle("locked");
            const icon = lockBtn.querySelector("i");
            if (item.locked) {
                icon.className = "fa-solid fa-lock";
            } else {
                icon.className = "fa-solid fa-lock-open";
            }
        };

        // Delete button
        deleteBtn.onclick = () => {
            recipe.splice(index, 1);
            normalizeRecipe();
            renderRecipeList();
            updateCalculations();
        };

        listContainer.appendChild(row);
    });
}

// Multi-slider distribution logic
function adjustIngredientSlider(changedIndex, newValue) {
    const currentVal = recipe[changedIndex].percentage;
    const delta = newValue - currentVal;
    
    // Set changed value
    recipe[changedIndex].percentage = newValue;

    // Distribute delta to other unlocked sliders
    const otherUnlocked = recipe.filter((item, idx) => idx !== changedIndex && !item.locked);
    
    if (otherUnlocked.length > 0) {
        const sumOther = otherUnlocked.reduce((sum, item) => sum + item.percentage, 0);
        
        if (sumOther > 0) {
            // Distribute change proportionally
            otherUnlocked.forEach(item => {
                const ratio = item.percentage / sumOther;
                item.percentage = Math.max(0, item.percentage - delta * ratio);
            });
        } else {
            // Distribute change equally
            otherUnlocked.forEach(item => {
                item.percentage = Math.max(0, item.percentage - delta / otherUnlocked.length);
            });
        }
    }

    // Run clean up normalization pass to handle roundoff & clipping boundaries
    normalizeRecipe(false);
    
    // Sync slider DOM elements without complete redraw to prevent stuttering
    recipe.forEach((item, index) => {
        const row = document.querySelector(`.ingredient-row[data-index="${index}"]`);
        if (row) {
            row.querySelector(".slider-range").value = item.percentage.toFixed(2);
            row.querySelector(".input-pct").value = item.percentage.toFixed(2);
        }
    });

    updateCalculations();
}

// Normalize recipe values to sum to exactly 100%
function normalizeRecipe(force = false) {
    const total = getRecipeTotalPercentage();
    if (total === 100.0) return;

    const unlocked = recipe.filter(item => !item.locked);
    if (unlocked.length === 0) return;

    const sumUnlocked = unlocked.reduce((sum, item) => sum + item.percentage, 0);
    const lockedTotal = recipe.filter(item => item.locked).reduce((sum, item) => sum + item.percentage, 0);
    const targetUnlocked = 100.0 - lockedTotal;

    if (force || Math.abs(total - 100.0) > 0.05) {
        if (sumUnlocked > 0 && targetUnlocked >= 0) {
            unlocked.forEach(item => {
                item.percentage = (item.percentage / sumUnlocked) * targetUnlocked;
            });
        } else if (targetUnlocked >= 0) {
            // Equal distribution
            unlocked.forEach(item => {
                item.percentage = targetUnlocked / unlocked.length;
            });
        }
    }
}

// Run Firmness, cost, finish calculations and updates
function updateCalculations() {
    const total = getRecipeTotalPercentage();
    const totalText = document.getElementById("total-percentage-text");
    const progressBar = document.getElementById("total-progress-bar");
    const normalizeBtn = document.getElementById("btn-normalize");

    // Display total percentage warning
    totalText.textContent = `${total.toFixed(2)}%`;
    progressBar.style.width = `${Math.min(100, total)}%`;

    if (Math.abs(total - 100.0) < 0.01) {
        totalText.className = "total-val valid";
        progressBar.className = "progress-fill valid";
        normalizeBtn.style.display = "none";
    } else {
        totalText.className = "total-val invalid";
        progressBar.className = "progress-fill invalid";
        normalizeBtn.style.display = "inline-flex";
    }

    // Firmness Score Calculation
    let score = 0.0;
    recipe.forEach(item => {
        const ing = findIngredient(item.name);
        if (ing) {
            score += (item.percentage / 100.0) * (ing.hardness * 100.0);
        }
    });

    document.getElementById("texture-score").textContent = score.toFixed(1);
    const statFirmness = document.getElementById("stat-firmness");
    if (statFirmness) {
        statFirmness.textContent = score.toFixed(1);
    }
    
    // Update gauge fill rotation
    // Gauge rotates from -90deg (0 score) to 90deg (200 score)
    const rotation = Math.max(-90, Math.min(90, (score / 200.0) * 180.0 - 90.0));
    document.getElementById("gauge-fill").style.transform = `rotate(${rotation}deg)`;

    // Update Texture verdict
    const verdictTitle = document.getElementById("texture-verdict-title");
    const verdictDesc = document.getElementById("texture-verdict-desc");

    if (score < 100) {
        verdictTitle.textContent = "Lip Butter (Tins Only)";
        verdictDesc.textContent = "Very soft with rich glide. Melts easily on skin touch. Best packaged in shallow tins or jars.";
        verdictTitle.style.color = "var(--accent-mint)";
    } else if (score >= 100 && score < 118) {
        verdictTitle.textContent = "Winter Blend / Soft Balm";
        verdictDesc.textContent = "Smooth, easy glide. Softened structure optimized for application in colder seasons/climates.";
        verdictTitle.style.color = "var(--accent-sage)";
    } else if (score >= 118 && score < 132) {
        verdictTitle.textContent = "Standard Lip Balm";
        verdictDesc.textContent = "Perfect balance of structural strength and slick skin glide. Ideal for standard twist-up balm tubes.";
        verdictTitle.style.color = "var(--success-green)";
    } else if (score >= 132 && score < 150) {
        verdictTitle.textContent = "Summer Blend / Pocket Balm";
        verdictDesc.textContent = "Firm formulation designed to resist melting in hot pockets or warm summer weather.";
        verdictTitle.style.color = "var(--warning-orange)";
    } else {
        verdictTitle.textContent = "Hard Barrier Salve";
        verdictDesc.textContent = "Heavy waxy barrier coating. Firm application pull, leaves a thick, long-lasting protective film.";
        verdictTitle.style.color = "var(--danger-red)";
    }

    // Weighted Comedogenic Rating
    let totalComedogenic = 0.0;
    let weightComedogenic = 0;
    let avgAbsorption = 0; // mapping Fast = 1, Med = 2, Slow = 3
    let finishMap = {};
    let totalCost = 0.0;

    recipe.forEach(item => {
        const ing = findIngredient(item.name);
        if (ing) {
            // Comedogenic
            let cr = 0;
            // extract comedogenic rating or set defaults
            if (ing.name === "Beeswax") cr = 1;
            else if (ing.name === "Candelilla Wax") cr = 0;
            else if (ing.name === "Shea Butter") cr = 1;
            else if (ing.name === "Coconut Oil (Raw)") cr = 4;
            else if (ing.name === "Mango Butter") cr = 2;
            else if (ing.name === "Avocado Oil") cr = 3;
            else if (ing.name === "Castor Oil") cr = 1;
            else if (ing.name === "Jojoba Oil") cr = 2;
            else cr = 1; // default fallback

            totalComedogenic += (item.percentage / 100.0) * cr;

            // Absorption
            if (ing.absorption === "Fast") avgAbsorption += (item.percentage / 100.0) * 1;
            else if (ing.absorption === "Slow") avgAbsorption += (item.percentage / 100.0) * 3;
            else avgAbsorption += (item.percentage / 100.0) * 2; // Medium

            // Skin Finish counts
            if (ing.finish) {
                finishMap[ing.finish] = (finishMap[ing.finish] || 0) + item.percentage;
            }

            // Cost
            totalCost += (item.percentage / 100.0) * ing.price_per_oz;
        }
    });

    // Update Comedogenic label
    const comedogenicVal = document.getElementById("stat-comedogenic");
    const comedogenicBadge = document.getElementById("comedogenic-badge");
    
    comedogenicVal.textContent = totalComedogenic.toFixed(1);
    if (totalComedogenic < 2) {
        comedogenicBadge.textContent = "Low";
        comedogenicBadge.className = "badge badge-success";
    } else if (totalComedogenic >= 2 && totalComedogenic <= 3) {
        comedogenicBadge.textContent = "Medium";
        comedogenicBadge.className = "badge badge-warning";
    } else {
        comedogenicBadge.textContent = "High";
        comedogenicBadge.className = "badge badge-danger";
    }

    // Update finish
    let topFinish = "Balm Finish";
    let maxFinishPct = 0;
    for (const key in finishMap) {
        if (finishMap[key] > maxFinishPct) {
            topFinish = key;
            maxFinishPct = finishMap[key];
        }
    }
    document.getElementById("stat-finish").textContent = topFinish;

    // Update absorption
    const absorbText = document.getElementById("stat-absorption");
    if (avgAbsorption < 1.7) absorbText.textContent = "Fast Absorbing";
    else if (avgAbsorption > 2.3) absorbText.textContent = "Slow Absorbing";
    else absorbText.textContent = "Medium Absorbing";

    // Cost Display
    document.getElementById("stat-cost").textContent = `$${totalCost.toFixed(2)} / Oz`;

    // Trigger Batch scaling update
    updateBatchScaling();
}

// Solver for smart rebalancing
function runSmartRebalance() {
    const lockedNames = recipe.filter(item => item.locked).map(item => item.name);
    const unlocked = recipe.filter(item => !item.locked);

    if (unlocked.length < 2) {
        alert("Please unlock at least 2 ingredients to run the smart rebalance solver!");
        return;
    }

    const lockedTotalPct = recipe.filter(item => item.locked).reduce((sum, item) => sum + item.percentage, 0);
    if (lockedTotalPct >= 100) {
        alert("Locked ingredients equal or exceed 100%! Unlock some items to allow adjustment.");
        return;
    }

    // Math solver variables
    const S_rem = 100.0 - lockedTotalPct;
    
    // Find locked score contribution
    let lockedHardnessContribution = 0.0;
    recipe.filter(item => item.locked).forEach(item => {
        const ing = findIngredient(item.name);
        if (ing) {
            lockedHardnessContribution += item.percentage * ing.hardness;
        }
    });

    const F_rem = targetFirmness - lockedHardnessContribution;

    // Solver logic
    let activeUnlocked = unlocked.map(item => item.name);
    let x = {};
    unlocked.forEach(item => {
        x[item.name] = item.percentage;
    });

    // Active set loop to handle bound constraints (x_j >= 0)
    for (let iter = 0; iter < 10; iter++) {
        const N = activeUnlocked.length;
        if (N === 0) break;
        if (N === 1) {
            const name = activeUnlocked[0];
            x[name] = S_rem;
            break;
        }

        const H = activeUnlocked.map(name => findIngredient(name).hardness);
        const p = activeUnlocked.map(name => recipe.find(item => item.name === name).percentage);

        const sum_H = H.reduce((s, val) => s + val, 0);
        const sum_H2 = H.reduce((s, val) => s + val * val, 0);
        const sum_p = p.reduce((s, val) => s + val, 0);
        const sum_pH = p.reduce((s, val, idx) => s + val * H[idx], 0);

        const det = N * sum_H2 - (sum_H * sum_H);

        if (Math.abs(det) < 1e-9) {
            // fallback scaling
            const scale = sum_p > 0 ? S_rem / sum_p : 1.0 / N;
            activeUnlocked.forEach(name => {
                const item = recipe.find(it => it.name === name);
                x[name] = sum_p > 0 ? item.percentage * scale : S_rem * scale;
            });
            break;
        }

        const b1 = S_rem - sum_p;
        const b2 = F_rem - sum_pH;

        const L1 = (b1 * sum_H2 - b2 * sum_H) / det;
        const L2 = (N * b2 - sum_H * b1) / det;

        let clipped = false;
        let newActive = [];

        for (let i = 0; i < N; i++) {
            const name = activeUnlocked[i];
            const new_val = p[i] + L1 + L2 * H[i];
            if (new_val < 0.0) {
                x[name] = 0.0;
                clipped = true;
            } else {
                x[name] = new_val;
                newActive.push(name);
            }
        }

        if (!clipped) break;
        activeUnlocked = newActive;
    }

    // Apply values back to global recipe
    recipe.forEach(item => {
        if (!item.locked) {
            item.percentage = parseFloat((x[item.name] || 0.0).toFixed(2));
        }
    });

    renderRecipeList();
    updateCalculations();
}

// Batch weight calculations
function updateBatchScaling() {
    const scaleAmt = parseFloat(document.getElementById("input-scale-amount").value) || 10;
    const scaleUnit = document.getElementById("select-scale-unit").value;
    const scaleSheet = document.getElementById("batch-scale-sheet");

    if (recipe.length === 0) {
        scaleSheet.textContent = "Add ingredients to compile sheet.";
        document.getElementById("batch-total-cost").textContent = "$0.00";
        return;
    }

    let totalWeightOz = 0;
    let displayUnit = "oz";

    if (scaleUnit === "tubes") {
        // Standard lip balm tubes: 0.15 ounces (approx. 4.25 grams)
        totalWeightOz = scaleAmt * 0.15;
        displayUnit = "oz";
    } else if (scaleUnit === "grams") {
        totalWeightOz = scaleAmt * 0.035274; // g to oz conversion
        displayUnit = "g";
    } else {
        totalWeightOz = scaleAmt;
        displayUnit = "oz";
    }

    let sheetText = "";
    let totalBatchCost = 0.0;

    recipe.forEach(item => {
        const ing = findIngredient(item.name);
        if (ing) {
            const ingWeightOz = (item.percentage / 100.0) * totalWeightOz;
            const ingCost = ingWeightOz * ing.price_per_oz;
            totalBatchCost += ingCost;

            if (displayUnit === "g") {
                const ingWeightG = ingWeightOz * 28.3495; // oz to grams
                sheetText += `${item.name.padEnd(24)}: ${ingWeightG.toFixed(2).padStart(6)} g  (${item.percentage.toFixed(1)}%)\n`;
            } else {
                sheetText += `${item.name.padEnd(24)}: ${ingWeightOz.toFixed(3).padStart(6)} oz (${item.percentage.toFixed(1)}%)\n`;
            }
        }
    });

    scaleSheet.textContent = sheetText;
    document.getElementById("batch-total-cost").textContent = `$${totalBatchCost.toFixed(2)}`;
}

// Get Saved Recipes dictionary
function getSavedRecipes() {
    const raw = localStorage.getItem("pg_saved_recipes");
    return raw ? JSON.parse(raw) : {};
}

// Populate saved recipes selector options dynamically
function updateSavedRecipesDropdown() {
    const dropdown = document.getElementById("saved-recipes-group");
    dropdown.innerHTML = "";
    const saved = getSavedRecipes();

    for (const name in saved) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        dropdown.appendChild(option);
    }
}

// Export Recipe sheet as Markdown table on clipboard
function copyRecipeToClipboardMarkdown() {
    if (recipe.length === 0) return;

    let md = `# Pearl Gardens Lip Balm Recipe\n\n`;
    
    // Texture score
    let score = 0.0;
    recipe.forEach(item => {
        const ing = findIngredient(item.name);
        if (ing) score += (item.percentage / 100.0) * (ing.hardness * 100.0);
    });

    let description = "";
    if (score < 100) description = "Lip Butter (Tins Only) - Soft and rich.";
    else if (score < 118) description = "Winter Blend - Soft balm, easy glide.";
    else if (score < 132) description = "Standard Lip Balm - Balanced twist-up tube strength.";
    else if (score < 150) description = "Summer Blend / Pocket Balm - Melt-resistant.";
    else description = "Hard Barrier Salve - High-wax protective salve.";

    md += `**Firmness Score**: ${score.toFixed(1)} (${description})\n\n`;

    // Proportions table
    md += `## Ingredients\n\n`;
    md += `| Category | Ingredient | Percentage (%) | Price ($/Oz) |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;

    recipe.forEach(item => {
        const ing = findIngredient(item.name);
        if (ing) {
            md += `| ${ing.category} | ${item.name} | ${item.percentage.toFixed(2)}% | $${ing.price_per_oz.toFixed(2)} |\n`;
        }
    });

    md += `\n`;
    
    // Batch scaling
    const scaleAmt = parseFloat(document.getElementById("input-scale-amount").value) || 10;
    const scaleUnit = document.getElementById("select-scale-unit").value;
    md += `## Batch Scaling (${scaleAmt} ${scaleUnit})\n\n`;
    
    const scaleSheetText = document.getElementById("batch-scale-sheet").textContent;
    const costText = document.getElementById("batch-total-cost").textContent;
    
    md += `\`\`\`\n${scaleSheetText}\`\`\`\n`;
    md += `**Estimated Batch Raw Materials Cost**: ${costText}\n\n`;
    md += `*Generated by Pearl Gardens Lip Balm Formulation Companion.*\n`;

    navigator.clipboard.writeText(md).then(() => {
        alert("Markdown recipe sheet successfully copied to clipboard!");
    }).catch(err => {
        console.error("Could not copy text to clipboard: ", err);
    });
}

// Birthday Detection & Celebration (August 31)
function checkBirthday() {
    const now = new Date();
    // In JavaScript Date, months are 0-indexed: August is index 7
    const isAugust31 = (now.getMonth() === 7 && now.getDate() === 31);

    // Support URL parameters for manual testing (e.g. ?birthday=true or ?bday=1)
    const urlParams = new URLSearchParams(window.location.search);
    const forceBirthday = urlParams.has("birthday") || urlParams.has("bday");

    if (isAugust31 || forceBirthday) {
        // Show celebratory announcement banner
        const banner = document.getElementById("birthday-banner");
        if (banner) {
            banner.style.display = "block";
        }

        // Add special celebratory touch to subtitle
        const subtitle = document.getElementById("app-subtitle");
        if (subtitle) {
            subtitle.innerHTML = `✨ Happy Birthday, Jem! 🎂 ✨`;
            subtitle.style.color = "var(--accent-gold)";
            subtitle.style.fontWeight = "700";
        }

        // Add birthday edition badge to header title
        const headerTitle = document.getElementById("app-header-title");
        if (headerTitle && !document.querySelector(".birthday-badge")) {
            const badge = document.createElement("span");
            badge.className = "birthday-badge";
            badge.innerHTML = `<i class="fa-solid fa-gift"></i> Birthday Edition`;
            headerTitle.appendChild(badge);
        }

        // Launch celebratory confetti burst
        launchConfetti();
    }
}

// Lightweight Botanical Confetti Particle System
function launchConfetti() {
    const canvas = document.createElement("canvas");
    canvas.id = "birthday-confetti-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const colors = ["#c5a059", "#5d7550", "#8fbc8f", "#e6c387", "#f3e8d2", "#d97706"];
    const particles = [];
    const particleCount = 65;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * -height * 0.5,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 2.5 + 1.2,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4,
            opacity: 1
        });
    }

    let startTime = performance.now();
    const duration = 4500; // 4.5 seconds

    function render(time) {
        const elapsed = time - startTime;
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.y += p.speedY;
            p.x += Math.sin(p.y * 0.02) + p.speedX;
            p.rotation += p.rotationSpeed;

            if (elapsed > duration - 1500) {
                p.opacity = Math.max(0, (duration - elapsed) / 1500);
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;

            // Draw botanical petal / confetti shape
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        if (elapsed < duration) {
            requestAnimationFrame(render);
        } else {
            canvas.remove();
        }
    }

    requestAnimationFrame(render);
}

