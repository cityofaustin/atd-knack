/*************************************/
/**** COA FOOTER - Simple Version ****/
/*************************************/
  // Dynamically injects a branded footer into specific customer-facing standard Knack pages only.
  // Use this version for apps where displaying the footer on modal windows is not required.
  // Caution: Navigating from a standard page > modal page > and then to a new standard page from a menu view on that modal page may cause footer ghosting/duplication to occur
  // Best Practice: Modals are okay as long as a user isnt required to navigate with the modal. Instead the user should navigate via the top nav or a standard page
  //
  // To display the footer on a new page: append its URL hash and scene ID comment to the footerHashes array below.
(function() {

  // List of exact URL hashes that should display the footer. Only exact matches are used — child pages (e.g. #customer/my-projects/) are automatically excluded.
  const footerHashes = [
    '#customer/',                 // scene_482 customer login
    '#portal-home/',              // scene_291
    '#all-services/',             // scene_306
    '#tcp-traffic-control-plan/', // scene_302
    '#tcp-conflict-shared/',      // scene_305
  ];

  // Our structured Footer HTML consisting of the COA Brand, the Privacy Policy, and any app specific Contact Info
  // Styling is handled in the Knack CSS file via the #coa-footer selector.
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

  // Inject footer for standard pages. Runs on initial page load and every time the URL hash changes.
  function injectFooter() {
    const hash = window.location.hash;

    // Check if the current hash exactly matches one of our footer pages
    const shouldShow = footerHashes.some(function(h) { return hash === h; });

    // If we're not on a footer page, remove the footer and exit
    if (!shouldShow) {
      $('#coa-footer').remove();
      return;
    }

    // Check if the footer is already present in #knack-body
    if ($('#knack-body #coa-footer').length) return;

    // Poll every 100ms for #knack-body to be available in the DOM as it may not exist immediately after hash change. Exits after 2s.
    const maxAttempts = 20;
    let attempts = 0;

    const interval = setInterval(function() {
      attempts++;
      if ($('#knack-body').length) {
        clearInterval(interval);
        $('#knack-body').append(footerHTML);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.warn('COA Footer: #knack-body not found after max attempts');
      }
    }, 100);
  }

  // Run on initial page load
  $(window).on('load', injectFooter);

  // Run on every hash change (triggered by navigation)
  $(window).on('hashchange', injectFooter);

})();
