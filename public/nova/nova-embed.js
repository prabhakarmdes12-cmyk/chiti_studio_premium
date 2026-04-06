/**
 * Nova - Adaptive Cinematic Concierge
 * Standalone embed script
 * 
 * Usage: 
 * <script src="https://your-cdn.com/nova-embed.js" data-api="https://your-api.com/lead"></script>
 */

(function() {
  'use strict';

  const DEFAULT_CONFIG = {
    position: 'bottom-right',
    primaryColor: '#6366f1',
    accentColor: '#8b5cf6',
  };

  let novaContainer = null;
  let novaModal = null;
  let isOpen = false;
  let currentStep = 'welcome';
  let leadData = {
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    intentCategory: ''
  };

  const conversationFlow = {
    'welcome': {
      type: 'video',
      videoUrl: '/nova/videos/welcome.mp4',
      subtitle: 'Welcome. I\'m Nova.',
      nextStep: 'intent-selection'
    },
    'intent-selection': {
      type: 'question',
      question: 'What brings you here?',
      options: [
        { label: 'Build something new', value: 'build', nextStep: 'project-type' },
        { label: 'Improve what exists', value: 'improve', nextStep: 'project-type' },
        { label: 'Just exploring', value: 'explore', nextStep: 'exploration' }
      ]
    },
    'exploration': {
      type: 'video',
      videoUrl: '/nova/videos/acknowledgement.mp4',
      subtitle: 'Take your time. I\'m here when you\'re ready.',
      nextStep: 'end'
    },
    'project-type': {
      type: 'question',
      question: 'What type of project?',
      options: [
        { label: 'Website / Web App', value: 'website', nextStep: 'budget' },
        { label: 'Mobile App', value: 'mobile', nextStep: 'budget' },
        { label: 'Brand / Design', value: 'brand', nextStep: 'budget' },
        { label: 'SaaS / Product', value: 'saas', nextStep: 'budget' },
        { label: 'Something else', value: 'other', nextStep: 'budget' }
      ],
      storeKey: 'projectType'
    },
    'budget': {
      type: 'question',
      question: 'What\'s your budget range?',
      options: [
        { label: 'Under 50K', value: 'under-50k', nextStep: 'timeline' },
        { label: '50K - 1L', value: '50k-1l', nextStep: 'timeline' },
        { label: '1L - 5L', value: '1l-5l', nextStep: 'timeline' },
        { label: '5L+', value: 'above-5l', nextStep: 'timeline' },
        { label: 'Let\'s discuss', value: 'discuss', nextStep: 'timeline' }
      ],
      storeKey: 'budget'
    },
    'timeline': {
      type: 'question',
      question: 'When do you need it?',
      options: [
        { label: 'ASAP', value: 'asap', nextStep: 'contact' },
        { label: 'Within a month', value: 'month', nextStep: 'contact' },
        { label: '1-3 months', value: '1-3months', nextStep: 'contact' },
        { label: 'Just planning', value: 'planning', nextStep: 'contact' }
      ],
      storeKey: 'timeline'
    },
    'contact': {
      type: 'input',
      inputType: 'text',
      inputPlaceholder: 'Your name',
      nextStep: 'email',
      storeKey: 'name'
    },
    'email': {
      type: 'input',
      inputType: 'email',
      inputPlaceholder: 'Your email',
      nextStep: 'summary'
    },
    'summary': {
      type: 'completion',
      nextStep: 'closing'
    },
    'closing': {
      type: 'video',
      videoUrl: '/nova/videos/closing.mp4',
      subtitle: 'I\'ll be in touch soon.',
      nextStep: 'end'
    },
    'end': {
      type: 'close'
    }
  };

  function getConfig() {
    const script = document.currentScript;
    return {
      apiUrl: script?.dataset?.api || '/api/lead',
      position: script?.dataset?.position || DEFAULT_CONFIG.position,
      primaryColor: script?.dataset?.primaryColor || DEFAULT_CONFIG.primaryColor,
      accentColor: script?.dataset?.accentColor || DEFAULT_CONFIG.accentColor,
    };
  }

  function injectStyles(config) {
    if (document.getElementById('nova-styles')) return;
    
    const css = `
      :root {
        --nova-primary: ${config.primaryColor};
        --nova-accent: ${config.accentColor};
      }
      
      #nova-container {
        position: fixed;
        ${config.position === 'bottom-right' ? 'bottom: 24px; right: 24px;' : ''}
        ${config.position === 'bottom-left' ? 'bottom: 24px; left: 24px;' : ''}
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      #nova-sphere {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--nova-primary) 0%, var(--nova-accent) 100%);
        box-shadow: 0 0 40px rgba(139, 92, 246, 0.5);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s, box-shadow 0.2s;
        animation: nova-pulse 2s infinite;
      }
      
      #nova-sphere:hover {
        transform: scale(1.1);
        box-shadow: 0 0 60px rgba(139, 92, 246, 0.7);
      }
      
      @keyframes nova-pulse {
        0%, 100% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); }
        50% { box-shadow: 0 0 60px rgba(139, 92, 246, 0.7); }
      }
      
      #nova-sphere svg {
        width: 24px;
        height: 24px;
        fill: white;
      }
      
      #nova-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        padding: 16px;
      }
      
      #nova-modal.open {
        display: flex;
      }
      
      #nova-modal-content {
        background: rgba(0, 0, 0, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        width: 100%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      }
      
      #nova-close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: all 0.3s;
      }
      
      #nova-close:hover {
        color: white;
        background: rgba(255, 255, 255, 0.2);
      }
      
      .nova-header {
        text-align: center;
        padding: 24px 24px 0;
      }
      
      .nova-header h2 {
        color: white;
        font-size: 18px;
        font-weight: 300;
        margin: 0;
      }
      
      .nova-header p {
        color: rgba(255, 255, 255, 0.4);
        font-size: 12px;
        margin: 4px 0 0;
      }
      
      .nova-content {
        padding: 24px;
      }
      
      .nova-video-container {
        width: 100%;
        aspect-ratio: 16/9;
        border-radius: 16px;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 20px;
        position: relative;
      }
      
      .nova-video-container video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .nova-subtitle {
        position: absolute;
        bottom: 16px;
        left: 16px;
        right: 16px;
        text-align: center;
        padding: 8px;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        border-radius: 8px;
        color: white;
      }
      
      .nova-question {
        color: rgba(255, 255, 255, 0.9);
        font-size: 18px;
        font-weight: 300;
        text-align: center;
        margin-bottom: 24px;
      }
      
      .nova-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .nova-option {
        padding: 16px 24px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        font-weight: 300;
        cursor: pointer;
        text-align: left;
        transition: all 0.3s;
      }
      
      .nova-option:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        transform: scale(1.02);
      }
      
      .nova-input-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .nova-input {
        padding: 16px 24px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 14px;
        outline: none;
        transition: all 0.3s;
      }
      
      .nova-input::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
      
      .nova-input:focus {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.3);
      }
      
      .nova-button {
        padding: 16px 24px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--nova-primary), var(--nova-accent));
        border: none;
        color: white;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .nova-button:hover {
        opacity: 0.9;
        transform: scale(1.02);
      }
      
      .nova-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .nova-completion {
        text-align: center;
        padding: 40px;
      }
      
      .nova-completion-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 24px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--nova-primary), var(--nova-accent));
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .nova-completion-icon svg {
        width: 40px;
        height: 40px;
        fill: white;
      }
      
      .nova-completion h3 {
        color: white;
        font-size: 24px;
        font-weight: 300;
        margin: 0 0 8px;
      }
      
      .nova-completion p {
        color: rgba(255, 255, 255, 0.6);
        margin: 0;
      }
      
      .nova-status {
        display: inline-block;
        margin-top: 16px;
        padding: 8px 16px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 14px;
      }
    `;
    
    const style = document.createElement('style');
    style.id = 'nova-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function createElements() {
    novaContainer = document.createElement('div');
    novaContainer.id = 'nova-container';
    novaContainer.innerHTML = `
      <button id="nova-sphere" aria-label="Open Nova">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12"/>
          <path d="M12 8V16M8 12H16"/>
        </svg>
      </button>
    `;
    document.body.appendChild(novaContainer);

    novaModal = document.createElement('div');
    novaModal.id = 'nova-modal';
    novaModal.innerHTML = `
      <div id="nova-modal-content">
        <button id="nova-close" aria-label="Close Nova">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <div class="nova-header">
          <h2>Nova</h2>
          <p>Adaptive Cinematic Concierge</p>
        </div>
        <div class="nova-content" id="nova-content"></div>
      </div>
    `;
    document.body.appendChild(novaModal);
  }

  function renderStep() {
    const step = conversationFlow[currentStep];
    const content = document.getElementById('nova-content');
    
    if (!step || step.type === 'close') {
      closeModal();
      return;
    }

    let html = '';

    if (step.type === 'video' && step.videoUrl) {
      html += `
        <div class="nova-video-container">
          <video src="${step.videoUrl}" autoplay muted playsinline></video>
          ${step.subtitle ? `<div class="nova-subtitle">${step.subtitle}</div>` : ''}
        </div>
      `;
    }

    if (step.type === 'question' && step.question) {
      html += `<p class="nova-question">${step.question}</p>`;
      if (step.options) {
        html += '<div class="nova-options">';
        step.options.forEach(opt => {
          html += `<button class="nova-option" data-value="${opt.value}" data-next="${opt.nextStep}">${opt.label}</button>`;
        });
        html += '</div>';
      }
    }

    if (step.type === 'input') {
      html += `
        <div class="nova-input-group">
          <input type="${step.inputType}" class="nova-input" placeholder="${step.inputPlaceholder || ''}" id="nova-input-field">
          <button class="nova-button" id="nova-submit-btn">Continue</button>
        </div>
      `;
    }

    if (step.type === 'completion') {
      html += `
        <div class="nova-completion">
          <div class="nova-completion-icon">
            <svg viewBox="0 0 24 24"><path d="M5 13l9 9L19 7"/></svg>
          </div>
          <h3>Thank you</h3>
          <p>Your information has been received.</p>
        </div>
      `;
    }

    content.innerHTML = html;
    attachEventListeners(step);
  }

  function attachEventListeners(step) {
    document.querySelectorAll('.nova-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (step.storeKey) {
          leadData[step.storeKey] = btn.dataset.value;
        }
        currentStep = btn.dataset.next;
        renderStep();
      });
    });

    const input = document.getElementById('nova-input-field');
    const submitBtn = document.getElementById('nova-submit-btn');
    
    if (input && submitBtn) {
      submitBtn.addEventListener('click', handleInputSubmit);
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleInputSubmit();
      });
    }

    const video = document.querySelector('.nova-video-container video');
    if (video) {
      video.addEventListener('ended', () => {
        if (step.nextStep) {
          currentStep = step.nextStep;
          renderStep();
        }
      });
    }
  }

  function handleInputSubmit() {
    const input = document.getElementById('nova-input-field');
    if (!input?.value.trim()) return;

    const step = conversationFlow[currentStep];
    if (step?.storeKey) {
      leadData[step.storeKey] = input.value;
    }

    if (currentStep === 'contact') {
      currentStep = 'email';
    } else if (currentStep === 'email') {
      submitLead();
      return;
    }
    renderStep();
  }

  async function submitLead() {
    const config = getConfig();
    
    try {
      await fetch(config.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
    } catch (e) {
      console.log('Nova: Lead submitted (demo mode)');
    }

    currentStep = 'summary';
    renderStep();
    setTimeout(() => {
      currentStep = 'closing';
      renderStep();
    }, 2000);
  }

  function openModal() {
    isOpen = true;
    novaModal.classList.add('open');
    currentStep = 'welcome';
    renderStep();
  }

  function closeModal() {
    isOpen = false;
    novaModal.classList.remove('open');
    currentStep = 'welcome';
    leadData = { name: '', email: '', projectType: '', budget: '', timeline: '', intentCategory: '' };
  }

  function init() {
    const config = getConfig();
    injectStyles(config);
    createElements();

    document.getElementById('nova-sphere').addEventListener('click', openModal);
    document.getElementById('nova-close').addEventListener('click', closeModal);
    novaModal.addEventListener('click', (e) => {
      if (e.target === novaModal) closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.Nova = {
    open: openModal,
    close: closeModal,
    setConfig: function(key, value) {
      const script = document.currentScript;
      if (script) script.dataset[key] = value;
    }
  };
})();