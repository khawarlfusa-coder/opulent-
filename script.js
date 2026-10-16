/**
 * THE OPULENT BEAUTY BAR — INTERACTIVE CLINIQUE ENGINE
 * Connected to WhatsApp: +92 328 2651011 (Gulshan-e-Iqbal, Karachi)
 */

document.addEventListener('DOMContentLoaded', () => {

  const SALON_WHATSAPP = '923282651011';

  const SERVICES_DATA = {
    skin: [
      "7-in-1 Medical HydraFacial Elite (PKR 6,500)",
      "Casmara 24K Gold Luxury Algae Facial (PKR 8,500)",
      "Korean Glass Skin Radiance Peeling (PKR 7,500)",
      "Deep Ultrasonic Pore Extraction & Purifying (PKR 4,500)"
    ],
    hair: [
      "Organic Nanoplastia Infusion (From PKR 14,000)",
      "French Balayage & Gloss Melt (From PKR 16,500)",
      "Brazilian Keratin Deep Collagen Therapy (From PKR 12,000)",
      "Olaplex Bond Rebuilding & Scalp Spa (PKR 6,500)",
      "Signature Blowout & Hollywood Waves (PKR 3,500)"
    ],
    nails: [
      "Russian E-File Manicure & Gel Art (From PKR 4,500)",
      "Sculpted Acrylic & Polygel Extensions (From PKR 7,500)",
      "Rose & Milk Luxury Spa Pedicure (PKR 3,800)",
      "Chrome Glazed / French Ombré Nails (PKR 5,500)"
    ],
    bridal: [
      "Signature Barat / Walima Bridal Glam (From PKR 35,000)",
      "Mehndi / Mayun Soft Glow Look (From PKR 22,000)",
      "Opulent Party Makeup & Glam Blowout (PKR 8,500)"
    ],
    consultation: [
      "Complimentary Hair Strand Test & Diagnosis (Free)",
      "Complimentary Skin & Facial Analysis (Free)",
      "Custom Bridal Package Consultation (Free)"
    ]
  };

  /* -------------------------------------------------------------
     1. STICKY HEADER
     ------------------------------------------------------------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* -------------------------------------------------------------
     2. MOBILE MENU TOGGLE
     ------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu') || document.getElementById('mainNav');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-item, .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  /* -------------------------------------------------------------
     3. BOOKING MODAL & DYNAMIC WHATSAPP GENERATOR
     ------------------------------------------------------------- */
  const bookingBackdrop = document.getElementById('bookingModalBackdrop');
  const closeBookingBtn = document.getElementById('closeBookingModalBtn');
  const openBookingTriggers = document.querySelectorAll('.open-booking-trigger');

  const categorySelect = document.getElementById('serviceCategory');
  const treatmentSelect = document.getElementById('serviceSelect');
  const clientNameInput = document.getElementById('clientName');
  const clientPhoneInput = document.getElementById('clientPhone');
  const bookingDateInput = document.getElementById('bookingDate');
  const bookingTimeSelect = document.getElementById('bookingTime');
  const waPreviewText = document.getElementById('waMessagePreview');
  const bookingForm = document.getElementById('bookingForm');

  // Set default minimum date
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.min = today;
    bookingDateInput.value = today;
  }

  function populateTreatments(catKey, preselectedName = null) {
    if (!treatmentSelect) return;
    treatmentSelect.innerHTML = '';

    const list = SERVICES_DATA[catKey] || SERVICES_DATA.skin;
    list.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      if (preselectedName && item.toLowerCase().includes(preselectedName.toLowerCase())) {
        opt.selected = true;
      }
      treatmentSelect.appendChild(opt);
    });
  }

  function updateWaPreview() {
    if (!waPreviewText) return;

    const name = clientNameInput ? (clientNameInput.value.trim() || '[Your Name]') : '';
    const phone = clientPhoneInput ? (clientPhoneInput.value.trim() || '[Your Phone]') : '';
    const category = categorySelect ? (categorySelect.options[categorySelect.selectedIndex]?.text || '') : '';
    const treatment = treatmentSelect ? (treatmentSelect.value || 'Consultation') : '';
    const date = bookingDateInput ? (bookingDateInput.value || 'Tomorrow') : '';
    const time = bookingTimeSelect ? (bookingTimeSelect.value || '12:00 PM') : '';

    let preview = `*APPOINTMENT INQUIRY — THE OPULENT BEAUTY BAR*\n`;
    preview += `--------------------------------------\n`;
    preview += `• *Client:* ${name}\n`;
    preview += `• *Phone / WhatsApp:* ${phone}\n`;
    preview += `• *Category:* ${category}\n`;
    preview += `• *Procedure:* ${treatment}\n`;
    preview += `• *Preferred Date:* ${date}\n`;
    preview += `• *Preferred Time:* ${time}\n`;
    preview += `--------------------------------------\n`;
    preview += `_Sent via online appointment portal (Gulshan Block 6)_`;

    waPreviewText.textContent = preview;
    return preview;
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      populateTreatments(categorySelect.value);
      updateWaPreview();
    });
  }

  [clientNameInput, clientPhoneInput, treatmentSelect, bookingDateInput, bookingTimeSelect].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', updateWaPreview);
      elem.addEventListener('change', updateWaPreview);
    }
  });

  function openBookingModal(preselectedService = null) {
    if (!bookingBackdrop) return;
    bookingBackdrop.classList.add('open');
    bookingBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (preselectedService) {
      let matchedCat = 'skin';
      const pLow = preselectedService.toLowerCase();
      if (pLow.includes('nanoplastia') || pLow.includes('balayage') || pLow.includes('hair') || pLow.includes('keratin')) {
        matchedCat = 'hair';
      } else if (pLow.includes('nail') || pLow.includes('manicure') || pLow.includes('pedicure')) {
        matchedCat = 'nails';
      } else if (pLow.includes('bridal') || pLow.includes('glam') || pLow.includes('makeup')) {
        matchedCat = 'bridal';
      } else if (pLow.includes('consultation')) {
        matchedCat = 'consultation';
      }

      if (categorySelect) categorySelect.value = matchedCat;
      populateTreatments(matchedCat, preselectedService);
    } else {
      populateTreatments(categorySelect ? categorySelect.value : 'skin');
    }

    updateWaPreview();
  }

  function closeBookingModal() {
    if (!bookingBackdrop) return;
    bookingBackdrop.classList.remove('open');
    bookingBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBookingTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const svc = btn.getAttribute('data-service');
      openBookingModal(svc);
    });
  });

  if (closeBookingBtn) closeBookingBtn.addEventListener('click', closeBookingModal);

  if (bookingBackdrop) {
    bookingBackdrop.addEventListener('click', (e) => {
      if (e.target === bookingBackdrop) closeBookingModal();
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = updateWaPreview();
      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${SALON_WHATSAPP}?text=${encodedMsg}`;
      
      window.open(waUrl, '_blank');
      closeBookingModal();
      showToast('Opening WhatsApp with your booking details...');
    });
  }

  // Initial population
  populateTreatments('skin');
  updateWaPreview();

  /* -------------------------------------------------------------
     4. PITCH INSIGHTS MODAL & BANNER
     ------------------------------------------------------------- */
  const pitchBanner = document.getElementById('pitchBanner');
  const dismissPitchBtn = document.getElementById('dismissPitchBanner');
  const openPitchModalBtn = document.getElementById('openPitchModalBtn');
  const pitchModalBackdrop = document.getElementById('pitchModalBackdrop');
  const closePitchModalBtn = document.getElementById('closePitchModalBtn');
  const pitchCloseActionBtn = document.getElementById('pitchCloseActionBtn');

  if (dismissPitchBtn && pitchBanner) {
    dismissPitchBtn.addEventListener('click', () => {
      pitchBanner.classList.add('dismissed');
    });
  }

  function openPitchModal() {
    if (!pitchModalBackdrop) return;
    pitchModalBackdrop.classList.add('open');
    pitchModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePitchModal() {
    if (!pitchModalBackdrop) return;
    pitchModalBackdrop.classList.remove('open');
    pitchModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openPitchModalBtn) openPitchModalBtn.addEventListener('click', openPitchModal);
  if (closePitchModalBtn) closePitchModalBtn.addEventListener('click', closePitchModal);
  if (pitchCloseActionBtn) pitchCloseActionBtn.addEventListener('click', closePitchModal);

  if (pitchModalBackdrop) {
    pitchModalBackdrop.addEventListener('click', (e) => {
      if (e.target === pitchModalBackdrop) closePitchModal();
    });
  }

  /* -------------------------------------------------------------
     5. COPY ADDRESS TO CLIPBOARD
     ------------------------------------------------------------- */
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const salonAddress = document.getElementById('salonAddress');

  if (copyAddressBtn && salonAddress) {
    copyAddressBtn.addEventListener('click', () => {
      const addressText = salonAddress.textContent.trim();
      navigator.clipboard.writeText(addressText).then(() => {
        showToast('Address copied to clipboard! 📋');
      }).catch(() => {
        showToast('Shop 10/1, Latif Plaza, Block 6, Gulshan-e-Iqbal');
      });
    });
  }

  /* -------------------------------------------------------------
     6. TOAST NOTIFICATION
     ------------------------------------------------------------- */
  function showToast(message) {
    const toast = document.getElementById('toastBox') || document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMsg') || document.getElementById('toastMessage');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
      closePitchModal();
    }
  });

});
