(function() {

  const footerHashes = [
    '#customer/',                 // scene_482 customer login
    '#portal-home/',              // scene_291
    '#all-services/',             // scene_306 (modal)
    '#portal-home/all-services/', // scene_306 (modal)
    '#tcp-traffic-control-plan/', // scene_302
    '#tcp-conflict-shared/',      // scene_305
    '#contact-us/',               // scene_179 (modal)
  ];

  const footerHTML = `
    <div id="coa-footer">
      <img 
        src="https://images.gitbook.com/__img/dpr=2,width=760,onerror=redirect,format=auto,signature=1503205633/https%3A%2F%2Ffiles.gitbook.com%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCqNGfEc0WO4ar1y6yBB3%252Fuploads%252F94aonme89HIUpHVnpeuK%252FCOA-Logo-Horizontal-Official-RGB.png%3Falt%3Dmedia%26token%3Da9121b5d-9d3c-41d0-9e72-90e25938e553" 
        alt="City of Austin Footer Logo" 
      />
      <a href="https://www.austintexas.gov/page/privacy-policy" target="_blank" rel="noopener noreferrer">
        Privacy Policy
      </a>
    </div>
  `;

  function isModalOpen() {
    return $('.kn-modal-bg').is(':visible') || $('.kn-modal').is(':visible');
  }

  function injectFooter() {
    // Skip everything if a modal is currently open
    if (isModalOpen()) return;

    const hash = window.location.hash;
    const shouldShow = footerHashes.some(function(h) { return hash.startsWith(h); });

    if (shouldShow) {
      // Only inject if footer is already present inside #knack-body
      if ($('#knack-body #coa-footer').length) return;

      const maxAttempts = 20;
      let attempts = 0;

      const interval = setInterval(function() {
        attempts++;
        if ($('#knack-body').length) {
          clearInterval(interval);
          // Remove any orphaned footer before appending fresh one
          $('#coa-footer').remove();
          $('#knack-body').append(footerHTML);
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          console.warn('COA Footer: #knack-body not found after max attempts');
        }
      }, 100);

    } else {
      // Navigated away from a footer page, remove it
      $('#coa-footer').remove();
    }
  }

  function injectModalFooter() {
    const $modalBody = $('.modal-card-body');
    if (!$modalBody.length) return;
    // Avoid duplicate
    if ($modalBody.find('#coa-footer-modal').length) return;
    // Use a separate ID so it doesn't conflict with the page footer
    const $modalFooter = $(footerHTML.replace('id="coa-footer"', 'id="coa-footer-modal"'));
    $modalBody.append($modalFooter);
  }

  // Watch for modal being added to the DOM
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if ($(node).hasClass('kn-modal') || $(node).find('.kn-modal').length) {
          // Small delay to let modal content fully render
          setTimeout(injectModalFooter, 300);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Run on initial load
  $(window).on('load', injectFooter);

  // Run on every hash change (Knack navigation)
  $(window).on('hashchange', injectFooter);

})();
