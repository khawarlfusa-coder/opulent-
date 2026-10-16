/**
 * THE OPULENT BEAUTY BAR — INTERACTIVE BEHAVIOR & WHATSAPP ENGINE
 * Direct WhatsApp: +92 328 2651011
 */

document.addEventListener('DOMContentLoaded', () => {

  // SALON DATA
  const SALON_WHATSAPP = '923282651011';
  
  const SERVICES_DATA = {
    hair: [
      "Organic Nanoplastia Infusion (From PKR 14,000)",
      "Bespoke Balayage & Melt Highlights (From PKR 16,500)",
      "Brazilian Keratin Deep Collagen Therapy (From PKR 12,000)",
      "Olaplex Bond Rebuilding & Scalp Spa (PKR 6,500)",
      "Global Ammonia-Free Color & Gloss (From PKR 9,500)",
      "Signature Blowout & Hollywood Waves (PKR 3,500)"
    ],
    nails: [
      "Russian E-File Dry Manicure + Gel Art (From PKR 4,500)",
      "Sculpted Acrylic & Polygel Extensions (From PKR 7,500)",
      "Rose & Milk Luxury Spa Pedicure (PKR 3,800)",
      "Chrome Glazed / French Ombré Nails (PKR 5,500)",
      "Gel Polish Removal & Nail Strengthening (PKR 1,800)"
    ],
    skin: [
      "7-in-1 Medical HydraFacial Elite (PKR 6,500)",
      "Casmara 24K Gold Luxury Algae Facial (PKR 8,500)",
      "Korean Glass Skin Radiance Peeling (PKR 7,500)",
      "Deep Ultrasonic Pore Extraction & Purifying (PKR 4,500)"
    ],
    bridal: [
      "Signature Barat / Walima Bridal Glam (From PKR 35,000)",
      "Mehndi / Mayun Soft Glow Look (From PKR 22,000)",
      "Opulent Party Makeup & Glam Blowout (PKR 8,500)",
      "Complete Bridal Prep Package (Skin, Hair, Nails) (Custom Quote)"
    ],
    body: [
      "Full Body Rica Aloe Waxing Ritual (From PKR 5,500)",
      "Moroccan Hammam Body Polish & Glow (PKR 6,000)",
      "Full Arms & Legs Fruit Waxing (PKR 2,800)",
      "Full Face Herbal Threading & Shaping (PKR 1,200)"
    ],
    consultation: [
      "Free 15-Min Hair & Strand Test Consultation (PKR 0)",
      "Free 15-Min Skin & Facial Analysis Consultation (PKR 0)",
      "Bridal Package Custom Consultation (PKR 0)"
    ]
  };

  /* -------------------------------------------------------------
     1. STICKY HEADER & ACTIVE NAV
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
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const expanded = mainNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    // Close mobile nav when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }

  /* -------------------------------------------------------------
     3. SERVICE MENU TABS FILTERING
     ------------------------------------------------------------- */
  const tabButtons = document.querySelectorAll('.service-tabs .tab-btn');
  const serviceCards = document.querySelectorAll('.services-grid .service-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetCategory = btn.getAttribute('data-category');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* -------------------------------------------------------------
     4. LOOKBOOK GALLERY FILTERING
     ------------------------------------------------------------- */
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-filter');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* -------------------------------------------------------------
     5. FAQ ACCORDION
     ------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* -------------------------------------------------------------
     6. BOOKING MODAL & DYNAMIC WHATSAPP GENERATOR
     ------------------------------------------------------------- */
  const bookingBackdrop = document.getElementById('bookingModalBackdrop');
  const closeBookingBtn = document.getElementById('closeBookingModalBtn');
  const headerBookBtn = document.getElementById('headerBookBtn');
  const openBookingTriggers = document.querySelectorAll('.open-booking-trigger');

  const categorySelect = document.getElementById('serviceCategory');
  const treatmentSelect = document.getElementById('serviceSelect');
  const clientNameInput = document.getElementById('clientName');
  const clientPhoneInput = document.getElementById('clientPhone');
  const bookingDateInput = document.getElementById('bookingDate');
  const bookingTimeSelect = document.getElementById('bookingTime');
  const bookingNotesInput = document.getElementById('bookingNotes');
  const waPreviewText = document.getElementById('waMessagePreview');
  const bookingForm = document.getElementById('bookingForm');

  // Set default minimum date to today
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.min = today;
    bookingDateInput.value = today;
  }

  // Populate treatments based on selected category
  function populateTreatments(catKey, preselectedName = null) {
    if (!treatmentSelect) return;
    treatmentSelect.innerHTML = '';

    const list = SERVICES_DATA[catKey] || SERVICES_DATA.hair;
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

  // Generate live WhatsApp message
  function updateWaPreview() {
    if (!waPreviewText) return;

    const name = clientNameInput.value.trim() || '[Your Name]';
    const phone = clientPhoneInput.value.trim() || '[Your Phone]';
    const category = categorySelect.options[categorySelect.selectedIndex]?.text || '';
    const treatment = treatmentSelect.value || 'Hair Treatment / Consultation';
    const date = bookingDateInput.value || 'Tomorrow';
    const time = bookingTimeSelect.value || '12:00 PM';
    const notes = bookingNotesInput.value.trim();

    let preview = `*APPOINTMENT INQUIRY — THE OPULENT BEAUTY BAR*\n`;
    preview += `--------------------------------------\n`;
    preview += `• *Client Name:* ${name}\n`;
    preview += `• *Phone / WhatsApp:* ${phone}\n`;
    preview += `• *Category:* ${category}\n`;
    preview += `• *Requested Treatment:* ${treatment}\n`;
    preview += `• *Preferred Date:* ${date}\n`;
    preview += `• *Preferred Time:* ${time}\n`;
    if (notes) {
      preview += `• *Client Notes:* ${notes}\n`;
    }
    preview += `--------------------------------------\n`;
    preview += `_Sent via website appointment portal (Gulshan Block 6)_`;

    waPreviewText.textContent = preview;
    return preview;
  }

  // Event Listeners for Live Preview
  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      populateTreatments(categorySelect.value);
      updateWaPreview();
    });
  }

  [clientNameInput, clientPhoneInput, treatmentSelect, bookingDateInput, bookingTimeSelect, bookingNotesInput].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', updateWaPreview);
      elem.addEventListener('change', updateWaPreview);
    }
  });

  // Open modal handler
  function openBookingModal(preselectedService = null) {
    if (!bookingBackdrop) return;
    bookingBackdrop.classList.add('open');
    bookingBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // If preselectedService is given, try matching category
    if (preselectedService) {
      let matchedCat = 'hair';
      const pLow = preselectedService.toLowerCase();
      if (pLow.includes('nail') || pLow.includes('pedicure') || pLow.includes('manicure')) matchedCat = 'nails';
      else if (pLow.includes('facial') || pLow.includes('hydra') || pLow.includes('skin') || pLow.includes('casmara')) matchedCat = 'skin';
      else if (pLow.includes('bridal') || pLow.includes('makeup') || pLow.includes('glam')) matchedCat = 'bridal';
      else if (pLow.includes('wax') || pLow.includes('polish') || pLow.includes('threading')) matchedCat = 'body';
      else if (pLow.includes('consultation')) matchedCat = 'consultation';

      if (categorySelect) categorySelect.value = matchedCat;
      populateTreatments(matchedCat, preselectedService);
    } else {
      populateTreatments(categorySelect ? categorySelect.value : 'hair');
    }

    updateWaPreview();
  }

  function closeBookingModal() {
    if (!bookingBackdrop) return;
    bookingBackdrop.classList.remove('open');
    bookingBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (headerBookBtn) {
    headerBookBtn.addEventListener('click', () => openBookingModal());
  }

  openBookingTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const svc = btn.getAttribute('data-service');
      openBookingModal(svc);
    });
  });

  if (closeBookingBtn) {
    closeBookingBtn.addEventListener('click', closeBookingModal);
  }

  if (bookingBackdrop) {
    bookingBackdrop.addEventListener('click', (e) => {
      if (e.target === bookingBackdrop) closeBookingModal();
    });
  }

  // Handle Form Submit -> Direct to WhatsApp
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = updateWaPreview();
      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${SALON_WHATSAPP}?text=${encodedMsg}`;
      
      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');
      
      closeBookingModal();
      showToast('Opening WhatsApp with your booking details...');
    });
  }

  // Initialize treatments on start
  populateTreatments('hair');
  updateWaPreview();

  /* -------------------------------------------------------------
     7. PITCH INSIGHTS MODAL & BANNER
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
     8. COPY ADDRESS TO CLIPBOARD
     ------------------------------------------------------------- */
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const salonAddress = document.getElementById('salonAddress');

  if (copyAddressBtn && salonAddress) {
    copyAddressBtn.addEventListener('click', () => {
      const addressText = salonAddress.textContent.trim();
      navigator.clipboard.writeText(addressText).then(() => {
        showToast('Address copied to clipboard! 📋');
      }).catch(() => {
        showToast('Address: Shop 10/1, Latif Plaza, Block 6, Gulshan-e-Iqbal');
      });
    });
  }

  /* -------------------------------------------------------------
     9. TOAST NOTIFICATION UTILITY
     ------------------------------------------------------------- */
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // Keyboard accessibility: ESC key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
      closePitchModal();
    }
  });

});
