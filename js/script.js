// State Application
const formData = {
  step: 1,
  name: '',
  email: '',
  phone: '',
  isYearly: false,
  plan: {
    id: 'arcade',
    name: 'Arcade',
    monthlyPrice: 9,
    yearlyPrice: 90
  },
  addons: {
    service: { name: 'Online service', monthlyPrice: 1, yearlyPrice: 10, selected: true },
    storage: { name: 'Larger storage', monthlyPrice: 2, yearlyPrice: 20, selected: true },
    profile: { name: 'Customizable Profile', monthlyPrice: 2, yearlyPrice: 20, selected: false }
  }
};

// DOM Elements
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const navBar = document.querySelector('.footer-nav');
const billingToggle = document.getElementById('billing-toggle');
const btnChangePlan = document.getElementById('btn-change-plan');

// Init App
document.addEventListener('DOMContentLoaded', () => {
  initStepNavigation();
  initPlanSelection();
  initAddonSelection();
  initValidationEvents();
});

// Step Navigation Logic
function goToStep(targetStep) {
  if (targetStep > formData.step && !validateStep(formData.step)) {
    return;
  }

  formData.step = targetStep;

  // Update Sidebar Visuals
  document.querySelectorAll('.step-item').forEach(item => {
    const stepNum = parseInt(item.getAttribute('data-step'));
    if (stepNum === formData.step || (formData.step === 5 && stepNum === 4)) {
      item.classList.add('is-active');
    } else {
      item.classList.remove('is-active');
    }
  });

  // Update Active Content Panel
  document.querySelectorAll('.form-step').forEach(panel => {
    panel.classList.remove('is-active');
  });
  document.querySelector('.form-step[data-step="' + formData.step + '"]').classList.add('is-active');

  // Update Navigation Buttons
  if (formData.step === 1) {
    btnBack.classList.add('is-hidden');
  } else {
    btnBack.classList.remove('is-hidden');
  }

  if (formData.step === 4) {
    btnNext.textContent = 'Confirm';
    btnNext.classList.add('btn-confirm');
    renderSummary();
  } else if (formData.step === 5) {
    navBar.classList.add('is-gone');
  } else {
    btnNext.textContent = 'Next Step';
    btnNext.classList.remove('btn-confirm');
    navBar.classList.remove('is-gone');
  }
}

function initStepNavigation() {
  btnNext.addEventListener('click', () => {
    if (formData.step < 5) {
      goToStep(formData.step + 1);
    }
  });

  btnBack.addEventListener('click', () => {
    if (formData.step > 1) {
      goToStep(formData.step - 1);
    }
  });

  if (btnChangePlan) {
    btnChangePlan.addEventListener('click', () => {
      goToStep(2);
    });
  }
}

// Step 1 Validation
function validateStep(step) {
  if (step !== 1) return true;

  let isValid = true;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');

  // Validate Name
  if (!nameInput.value.trim()) {
    showError('group-name', 'This field is required');
    isValid = false;
  } else {
    clearError('group-name');
    formData.name = nameInput.value.trim();
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    showError('group-email', 'This field is required');
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    showError('group-email', 'Invalid email format');
    isValid = false;
  } else {
    clearError('group-email');
    formData.email = emailInput.value.trim();
  }

  // Validate Phone
  if (!phoneInput.value.trim()) {
    showError('group-phone', 'This field is required');
    isValid = false;
  } else {
    clearError('group-phone');
    formData.phone = phoneInput.value.trim();
  }

  return isValid;
}

function showError(groupId, message) {
  const group = document.getElementById(groupId);
  if (!group) return;
  const input = group.querySelector('input');
  const errorSpan = group.querySelector('.error-msg');
  if (input) input.classList.add('has-error');
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.style.display = 'inline';
  }
}

function clearError(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return;
  const input = group.querySelector('input');
  const errorSpan = group.querySelector('.error-msg');
  if (input) input.classList.remove('has-error');
  if (errorSpan) errorSpan.style.display = 'none';
}

function initValidationEvents() {
  ['name', 'email', 'phone'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        clearError('group-' + id);
      });
    }
  });
}

// Step 2 Selection Logic & Billing Toggle
function initPlanSelection() {
  const planCards = document.querySelectorAll('.plan-card');

  planCards.forEach(card => {
    card.addEventListener('click', () => {
      planCards.forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');

      const planType = card.getAttribute('data-plan');
      if (planType === 'arcade') {
        formData.plan = { id: 'arcade', name: 'Arcade', monthlyPrice: 9, yearlyPrice: 90 };
      } else if (planType === 'advanced') {
        formData.plan = { id: 'advanced', name: 'Advanced', monthlyPrice: 12, yearlyPrice: 120 };
      } else if (planType === 'pro') {
        formData.plan = { id: 'pro', name: 'Pro', monthlyPrice: 15, yearlyPrice: 150 };
      }
    });
  });

  if (billingToggle) {
    billingToggle.addEventListener('change', (e) => {
      formData.isYearly = e.target.checked;
      updatePlanPricingDisplay();
    });
  }
}

function updatePlanPricingDisplay() {
  const isYearly = formData.isYearly;

  // Update Active State Label
  const monthlyLabel = document.getElementById('text-monthly');
  const yearlyLabel = document.getElementById('text-yearly');
  if (monthlyLabel) monthlyLabel.classList.toggle('is-selected', !isYearly);
  if (yearlyLabel) yearlyLabel.classList.toggle('is-selected', isYearly);

  // Update Card Prices & Bonuses
  document.querySelectorAll('.plan-card').forEach(card => {
    const priceElem = card.querySelector('.plan-price');
    const bonusElem = card.querySelector('.plan-bonus');

    if (priceElem) {
      priceElem.textContent = isYearly ? priceElem.getAttribute('data-yearly') : priceElem.getAttribute('data-monthly');
    }
    if (bonusElem) {
      bonusElem.style.display = isYearly ? 'block' : 'none';
    }
  });

  // Update Addons Pricing Text
  document.querySelectorAll('.addon-card').forEach(card => {
    const priceElem = card.querySelector('.addon-price');
    if (priceElem) {
      priceElem.textContent = isYearly ? priceElem.getAttribute('data-yearly') : priceElem.getAttribute('data-monthly');
    }
  });
}

// Step 3 Addons Logic
function initAddonSelection() {
  const addonCards = document.querySelectorAll('.addon-card');

  addonCards.forEach(card => {
    const checkbox = card.querySelector('.addon-checkbox');
    if (!checkbox) return;

    card.addEventListener('click', (e) => {
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }

      card.classList.toggle('is-selected', checkbox.checked);
      const addonId = card.getAttribute('data-addon');
      if (formData.addons[addonId]) {
        formData.addons[addonId].selected = checkbox.checked;
      }
    });
  });
}

// Step 4 Summary Rendering
function renderSummary() {
  const isYearly = formData.isYearly;
  const planNameElem = document.getElementById('summary-plan-name');
  const planPriceElem = document.getElementById('summary-plan-price');
  const addonsContainer = document.getElementById('summary-addons-container');
  const totalTitleText = document.getElementById('total-title-text');
  const totalPriceValue = document.getElementById('total-price-value');

  // 1. Render Selected Plan
  const periodText = isYearly ? 'Yearly' : 'Monthly';
  const planPrice = isYearly ? formData.plan.yearlyPrice : formData.plan.monthlyPrice;
  const priceSuffix = isYearly ? '/yr' : '/mo';

  if (planNameElem) planNameElem.textContent = formData.plan.name + ' (' + periodText + ')';
  if (planPriceElem) planPriceElem.textContent = '$' + planPrice + priceSuffix;

  // 2. Render Selected Addons
  if (addonsContainer) addonsContainer.innerHTML = '';
  let totalAddonsPrice = 0;

  Object.keys(formData.addons).forEach(key => {
    const addon = formData.addons[key];
    if (addon.selected) {
      const addonPrice = isYearly ? addon.yearlyPrice : addon.monthlyPrice;
      totalAddonsPrice += addonPrice;

      const addonRow = document.createElement('div');
      addonRow.className = 'summary-addon-row';
      addonRow.innerHTML = '        <span>' + addon.name + '</span>        <span class="summary-addon-price">+$' + addonPrice + priceSuffix + '</span>';
      if (addonsContainer) addonsContainer.appendChild(addonRow);
    }
  });

  // 3. Render Total
  const totalPrice = planPrice + totalAddonsPrice;
  if (totalTitleText) totalTitleText.textContent = 'Total (per ' + (isYearly ? 'year' : 'month') + ')';
  if (totalPriceValue) totalPriceValue.textContent = '+$' + totalPrice + priceSuffix;
}
