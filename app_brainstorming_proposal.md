# Pearl Gardens: Herbalism Formulation Companion
### App Brainstorming & Architecture Proposal

This document outlines a blueprint for converting Jem’s herbalism spreadsheet into a premium, responsive, and mobile-friendly application. Currently, the spreadsheet acts as a master database and cost-calculation tool. By transitioning to a dedicated application, we can elevate this workflow into an interactive, intuitive formulation assistant.

---

## 📱 Core App Feature Concepts

We can organize the app into four main functional areas:

### 1. The Formulation Lab (Recipe Calculator & Batch Logger)
*   **Dynamic Batch Scaling**: Professional formulators design recipes in **percentages (%)** rather than absolute weights. The app can convert Jem's existing recipes into percentages and allow her to enter a target batch weight (e.g., *"I want to make 250 grams of Show Me Where It Hurts"*). The app will instantly calculate the exact weight of each ingredient needed.
*   **Precision Unit Converter**: The current sheet converts cups to ounces on a 1:1 basis. Because cups measure volume and ounces/grams measure weight, this varies by density (e.g., a cup of beeswax weighs differently than a cup of charcoal powder). The app can incorporate density factors for her ingredients to ensure precise conversions.
*   **Active Ingredient & Benefit Auto-Analysis**: When compiling a recipe, the app can look up the ingredients in the **Botanicals** and **Active Ingredients** databases to auto-generate a "Product Profile" summarizing the topical/internal benefits of the finished product (e.g., *"This balm is Analgesic, Anti-inflammatory, and Vulnerary"*).
*   **Batch Logger**: A history log where Jem can record details of each batch made:
    *   Date of manufacture
    *   Batch number / ID
    *   Specific notes or adjustments (e.g., *"Added extra lavender for aroma"*)
    *   Calculated shelf-life warnings based on the ingredients used.

### 2. Botanical Explorer & Property Finder
*   **Smart Search & Filtering**: A mobile-optimized search where she can tap on benefits (e.g., "Brightening", "Eczema Relief") and see all matching Botanicals, Carrier Oils, Additives, and Essential Oils.
*   **Side-by-Side Comparison**: A swipeable mobile card interface (inspired by her *Botanical Profile Dashboard*) where she can select up to 3 or 4 plants to compare their parts used, active chemical compounds, extraction protocols, safety profiles, and costs.
*   **Active Compounds Glossary**: A dictionary (based on her *Active Ingredients* tab) explaining what chemical compounds like *Allantoin*, *Helenalin*, or *Menthol* do, linking them back to the plants that contain them.

### 3. Formulation Safety & Property Checker
*   **Essential Oil Safety Checker**: Essential oils have strict maximum dermal limits to prevent sensitization or phototoxicity. The app can flag formulations where an essential oil exceeds standard safe concentrations (e.g., warning if a leave-on face oil has too much Lemon Essential Oil).
*   **Skin-Feel (Texture) & Comedogenic Profiler**: When blending carrier oils, the app can calculate the average comedogenic rating of the mixture (to avoid pore-clogging) and describe the predicted absorption rate and skin finish (e.g., *"Fast absorbing, satin/silky finish"*).

### 4. Inventory & Pricing Manager
*   **In-Stock Tracker**: A simple toggle interface to manage what ingredients she has in stock vs. what she needs to buy (automatically moving items to and from the "Unowned" list).
*   **Costing Calculator**: A clean dashboard showing the cost per ounce and total batch cost, helping her price her finished skincare items for retail.

---

## 🎨 Visual Design & UX Concept

To match the premium "Pearl Gardens" aesthetic, the user interface should feel organic, clean, and modern:
*   **Palette**: Sage green, warm cream, soft charcoal, and botanical gold accents (a harmonious, earthy, yet professional look).
*   **Typography**: Serif headers (e.g., *Playfair Display* or *Lora*) for a crafted, botanical feel, paired with clean sans-serif text (e.g., *Inter*) for legibility in calculators.
*   **Layout**: Mobile-first design with a bottom navigation bar:
    1.  **Formulator**: Interactive recipe calculator & scaling.
    2.  **Library**: Botanical explorer & search tools.
    3.  **Stock**: Inventory, costs, and shopping list.
    4.  **Logbook**: Historical batch records.

---

## 🗺️ Tech Stack Options

Depending on the desired delivery method for the birthday gift:

| Option | Tech Stack | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **Progressive Web App (PWA)** <br>*(Recommended)* | React / Next.js / TailwindCSS <br>or Vite + Vanilla CSS | • Installs on iOS/Android home screens without App Store hassle.<br>• Extremely fast to develop and iterate.<br>• Works offline. | • Cannot be searched directly in the App Store (installed via browser link). |
| **Hybrid Mobile App** | React Native / Expo | • True native app, can be distributed on TestFlight/Google Play.<br>• Feels 100% like a native phone app. | • App Store setup, developer accounts, and provisioning are complex. |
| **Single-Page HTML/JS App** | Tailwind / AlpineJS | • Single self-contained file.<br>• Can run directly in a browser without hosting. | • Storing batch records and custom formulas requires local storage only (risk of data loss if browser cache is cleared). |

---

## 💬 Refining the Concept: Questions to Brainstorm

To make this app as useful as possible, let's explore some key questions:

### 1. Questions for You (Greg) to Narrow the Scope
1.  **Hosting & Distribution**: Would you prefer a web-based app that she can open on her phone/laptop via a custom URL (and save to her home screen), or is a native app store experience important?
2.  **Data Storage**: Do we need the app to support cloud sync (so you and she can both edit recipes and see updates on different devices), or is a local, single-device app sufficient?
3.  **Timeline & Launch**: When is her birthday? This will help us choose a scope that fits the timeframe.

### 2. Questions to Ask Jem (Subtly, to Keep it a Surprise!)
If you want to gather requirements without giving away the surprise, you can ask her about her formulation workflow:
1.  **Formulation Units**: *"I noticed in your spreadsheet you have cups and grams. When you actually make a salve or cream, do you prefer measuring by weight on a scale (grams/ounces) or by volume (spoons/cups)?"* 
    > *Formulating by weight is standard because volume changes with temperature and packing density, so a weight-based interface might help her achieve professional precision.*
2.  **Batch Records**: *"When you're making a batch of skincare, do you keep a notebook of when you made it, how it turned out, or if you changed anything, or do you just reference the recipe?"*
    > *If she keeps a physical notebook, the Batch Logger feature will be a huge quality-of-life upgrade.*
3.  **Supplier Tracking**: *"Where do you order your carrier oils and botanical materials? Do you have to compare prices between suppliers often?"*
    > *If she does, we could add supplier tracking (e.g., price from Mountain Rose Herbs vs. Bramble Berry).*
