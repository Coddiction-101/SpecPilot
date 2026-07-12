const flowOptions = {
  uc: 'general',
  bat: 'long',
  disp: 'any',
  budget: 'any'
};

const flowRecommendations = [
  {
    uc: 'general',
    bat: 'long',
    dispFilter: 'any',
    budget: 'entry',
    brand: 'Dell',
    model: 'Inspiron 14 5430',
    category: 'Everyday Productivity',
    price: '₹42,990',
    cpu: 'Intel Core i5-1340P',
    gpu: 'Intel Iris Xe',
    ram: '16GB LPDDR5',
    disp: '14" FHD IPS',
    rationale: 'Efficient battery life and smooth office workflows for long productivity days.'
  },
  {
    uc: 'coding',
    bat: 'any',
    dispFilter: 'any',
    budget: 'premium',
    brand: 'HP',
    model: 'Omen 16',
    category: 'Performance Creator',
    price: '₹1,12,990',
    cpu: 'Intel Core i9-14900HX',
    gpu: 'NVIDIA RTX 4070',
    ram: '32GB DDR5',
    disp: '16" QHD 165Hz',
    rationale: 'Balanced AI and productivity compute with strong thermals and upgrade headroom.'
  },
  {
    uc: 'gaming',
    bat: 'any',
    dispFilter: 'any',
    budget: 'flagship',
    brand: 'MSI',
    model: 'Stealth Titan 16',
    category: 'Gaming / ML',
    price: '₹1,74,490',
    cpu: 'Intel Core i9-14980HX',
    gpu: 'NVIDIA RTX 4080',
    ram: '32GB DDR5X',
    disp: '16" 4K OLED',
    rationale: 'High-power GPU and sustained performance for demanding gaming and local AI workloads.'
  },
  {
    uc: 'creator',
    bat: 'any',
    dispFilter: 'oled',
    budget: 'premium',
    brand: 'ASUS',
    model: 'ProArt Studiobook 16',
    category: 'Creator Workstation',
    price: '₹1,85,990',
    cpu: 'AMD Ryzen 9 8945HX',
    gpu: 'NVIDIA RTX 4060',
    ram: '32GB DDR5',
    disp: '16" 4K OLED Pantone',
    rationale: 'Color-critical display with high memory bandwidth for editing and rendering workflows.'
  }
];

const traps = {
  ram: {
    title: '8GB Soldered RAM Laptops',
    description: 'Baseline Windows and apps already consume around 6GB in 2026. Soldered 8GB RAM forces swap usage and slows down multitasking.',
    pitch: '"Perfect for schoolwork, daily multitasking, and light applications."'
  },
  screen: {
    title: '45% NTSC Screens',
    description: 'Low-gamut displays look cheap and are unsuitable for creators or anyone who wants accurate color. Choose at least 100% sRGB for better visuals.',
    pitch: '"Vibrant colors and vivid visuals on every screen."'
  },
  tgp: {
    title: 'Low-TGP Gaming Laptops',
    description: 'Weak graphics power budgets throttle gaming performance. A low TGP GPU may struggle with modern titles and local AI workloads.',
    pitch: '"Thin design with enough power for casual esports."'
  },
  npu: {
    title: 'Sub-40 TOPS NPUs',
    description: 'AI workloads benefit from stronger NPU throughput. Sub-40 TOPS models are often slower for features like on-device voice and inference.',
    pitch: '"Smart performance for everyday tasks and photo filters."'
  },
  ssd: {
    title: 'Single Slot SSDs',
    description: 'Laptops with only one SSD slot are harder to expand later. Dual slots let you add storage without replacing your drive.',
    pitch: '"Fast storage ready right out of the box."'
  },
  ports: {
    title: 'Data-Only Type-C',
    description: 'Data-only Type-C ports are less useful for charging or display output. Look for at least one Thunderbolt or USB4 port for flexibility.',
    pitch: '"Connect instantly with all your modern accessories."'
  }
};

const budgetCatalog = {
  b1: {
    title: '₹25K - 35K',
    items: [
      { brand: 'Lenovo', model: 'IdeaPad Slim 3', price: '₹29,990', cpu: 'AMD Ryzen 5 7530U', ram: '16GB', display: '14" FHD IPS', note: 'Strong entry-level productivity performer.' },
      { brand: 'Acer', model: 'Swift 3', price: '₹32,490', cpu: 'Intel Core i5-1335U', ram: '16GB', display: '14" FHD IPS', note: 'Balanced runtime and premium design.' }
    ]
  },
  b2: {
    title: '₹35K - 60K',
    items: [
      { brand: 'HP', model: 'Pavilion 15', price: '₹48,990', cpu: 'AMD Ryzen 7 7730U', ram: '16GB', display: '15.6" FHD IPS', note: 'Great for mixed work and light editing.' },
      { brand: 'Dell', model: 'Vostro 5620', price: '₹54,990', cpu: 'Intel Core i7-13620H', ram: '16GB', display: '15.6" FHD', note: 'Strong office and multitasking solution.' }
    ]
  },
  b3: {
    title: '₹60K - 90K',
    items: [
      { brand: 'ASUS', model: 'TUF Gaming A15', price: '₹78,990', cpu: 'AMD Ryzen 7 7840HS', ram: '16GB', display: '15.6" QHD 144Hz', note: 'A solid gaming entry with strong thermals.' },
      { brand: 'MSI', model: 'Modern 15', price: '₹83,490', cpu: 'Intel Core i7-13620H', ram: '16GB', display: '15.6" IPS', note: 'Good power and premium build quality.' }
    ]
  },
  b4: {
    title: '₹90K - 1.2L+',
    items: [
      { brand: 'Apple', model: 'MacBook Air M2', price: '₹1,09,990', cpu: 'Apple M2', ram: '16GB', display: '13.6" Liquid Retina', note: 'Excellent battery and resale value.' },
      { brand: 'ASUS', model: 'ProArt Studiobook', price: '₹1,45,990', cpu: 'AMD Ryzen 9 7945HX', ram: '32GB', display: '16" OLED', note: 'Designed for creators and high-end editing.' }
    ]
  }
};

let currentTab = 'b1';
let compareList = [];

function updateFlowResult() {
  const resultEmpty = document.getElementById('flow-result-empty');
  const resultCard = document.getElementById('flow-result-card');
  const matchScore = document.getElementById('match-score-badge');

  let recommendation = flowRecommendations.find(item => {
    const budgetMatch = flowOptions.budget === 'any' || item.budget === flowOptions.budget;
    const ucMatch = item.uc === flowOptions.uc;
    const dispMatch = flowOptions.disp === 'any' || item.dispFilter === flowOptions.disp;
    const batMatch = flowOptions.bat === 'any' || item.bat === flowOptions.bat || item.bat === 'any';
    return budgetMatch && ucMatch && dispMatch && batMatch;
  });

  if (!recommendation) {
    recommendation = flowRecommendations.find(item => item.uc === flowOptions.uc && (flowOptions.budget === 'any' || item.budget === flowOptions.budget));
  }

  if (!recommendation) {
    resultEmpty.classList.remove('hidden');
    resultCard.classList.add('hidden');
    matchScore.textContent = 'No clear match yet';
    return;
  }

  resultEmpty.classList.add('hidden');
  resultCard.classList.remove('hidden');
  document.getElementById('flow-res-brand').textContent = recommendation.brand;
  document.getElementById('flow-res-model').textContent = recommendation.model;
  document.getElementById('flow-res-category').textContent = recommendation.category;
  document.getElementById('flow-res-price').textContent = recommendation.price;
  document.getElementById('flow-res-cpu').textContent = recommendation.cpu;
  document.getElementById('flow-res-gpu').textContent = recommendation.gpu;
  document.getElementById('flow-res-ram').textContent = recommendation.ram;
  document.getElementById('flow-res-disp').textContent = recommendation.disp;
  document.getElementById('flow-res-rationale').textContent = recommendation.rationale;
  matchScore.textContent = 'Recommended Match';
  matchScore.classList.remove('badge-soft');
  matchScore.classList.add('badge-match');

  window.currentRecommendation = recommendation;
}

function setFlowOption(type, value) {
  flowOptions[type] = value;
  document.querySelectorAll(`[data-flow-type='${type}']`).forEach(button => {
    button.classList.toggle('active', button.dataset.flowValue === value);
  });
  if (type === 'budget') {
    document.getElementById('flow-budget').value = value;
  }
  updateFlowResult();
}

function initializeFlowControls() {
  document.querySelectorAll('[data-flow-type]').forEach(button => {
    button.addEventListener('click', () => setFlowOption(button.dataset.flowType, button.dataset.flowValue));
  });

  const budgetSelect = document.getElementById('flow-budget');
  budgetSelect.addEventListener('change', event => setFlowOption('budget', event.target.value));

  document.getElementById('flow-action-catalog').addEventListener('click', () => {
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('flow-action-compare').addEventListener('click', addCurrentRecommendationToCompare);
}

function updateTrapPanel(key) {
  const chosen = traps[key];
  if (!chosen) return;
  document.getElementById('trap-title-text').textContent = chosen.title;
  document.getElementById('trap-description').textContent = chosen.description;
  document.getElementById('trap-pitch').textContent = chosen.pitch;
}

function setTrapActive(key) {
  document.querySelectorAll('[data-trap-key]').forEach(button => {
    button.classList.toggle('active', button.dataset.trapKey === key);
  });
  updateTrapPanel(key);
}

function initializeTrapButtons() {
  document.querySelectorAll('[data-trap-key]').forEach(button => {
    button.addEventListener('click', () => setTrapActive(button.dataset.trapKey));
  });
  setTrapActive('ram');
}

function renderBudgetTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('[data-budget-tab]').forEach(button => {
    button.classList.toggle('active', button.dataset.budgetTab === tabId);
  });
  const panel = document.getElementById('budget-panel');
  panel.innerHTML = '';
  const bucket = budgetCatalog[tabId];
  if (!bucket) return;

  bucket.items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'glass-card rounded-3xl p-5 border border-slate-200';
    card.innerHTML = `
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-xs uppercase tracking-wider text-sky-700 font-bold">${item.brand}</p>
          <h4 class="text-lg font-extrabold text-slate-900">${item.model}</h4>
        </div>
        <span class="text-emerald-600 font-black">${item.price}</span>
      </div>
      <div class="mt-4 space-y-2 text-xs text-slate-500">
        <p><span class="font-semibold text-slate-700">CPU:</span> ${item.cpu}</p>
        <p><span class="font-semibold text-slate-700">RAM:</span> ${item.ram}</p>
        <p><span class="font-semibold text-slate-700">Display:</span> ${item.display}</p>
        <p>${item.note}</p>
      </div>
    `;
    panel.appendChild(card);
  });
}

function initializeBudgetTabs() {
  document.querySelectorAll('[data-budget-tab]').forEach(button => {
    button.addEventListener('click', () => renderBudgetTab(button.dataset.budgetTab));
  });
  renderBudgetTab(currentTab);
}

function addCurrentRecommendationToCompare() {
  const recommendation = window.currentRecommendation;
  if (!recommendation) return;
  if (compareList.some(item => item.model === recommendation.model)) return;
  if (compareList.length >= 3) {
    return;
  }
  compareList.push(recommendation);
  renderCompareList();
}

function renderCompareList() {
  const compareListEl = document.getElementById('compare-list');
  compareListEl.innerHTML = '';
  if (compareList.length === 0) {
    compareListEl.innerHTML = '<p class="text-xs text-slate-400">No systems added yet. Use the Compare button after you get a recommendation.</p>';
  }
  compareList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700';
    card.innerHTML = `
      <div class="flex justify-between items-center gap-2 mb-3">
        <div>
          <p class="font-bold text-slate-900">${item.brand} ${item.model}</p>
          <p class="text-[11px] text-slate-500">${item.category}</p>
        </div>
        <span class="text-emerald-600 font-bold">${item.price}</span>
      </div>
      <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
        <div><span class="font-semibold text-slate-700">CPU:</span> ${item.cpu}</div>
        <div><span class="font-semibold text-slate-700">GPU:</span> ${item.gpu}</div>
        <div><span class="font-semibold text-slate-700">RAM:</span> ${item.ram}</div>
        <div><span class="font-semibold text-slate-700">Display:</span> ${item.disp}</div>
      </div>
    `;
    compareListEl.appendChild(card);
  });
  document.getElementById('compare-badge').textContent = compareList.length.toString();
}

function initializePage() {
  initializeFlowControls();
  initializeTrapButtons();
  initializeBudgetTabs();
  updateFlowResult();
  renderCompareList();
}

document.addEventListener('DOMContentLoaded', initializePage);
