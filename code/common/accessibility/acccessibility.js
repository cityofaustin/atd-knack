/*******************************/
/**** Accessibility Updates ****/
/*******************************/
// Page Zoom - Global and Mobile layout label
$(document).on('knack-scene-render.any', function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  const mobileNav = document.querySelector('button.knHeader__mobile-nav-toggle');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=2, user-scalable=yes');
  }
  if (mobileNav) {
    mobileNav.setAttribute('aria-label', 'Page navigation');
  }
});

/*** Form Field missing label on inputs ****/
$(document).on('knack-view-render.any', function (event, view, data) {
  // Goes through every view and field and checks field input name to add aria-label
  $(this).context.forms.forEach(form => {
    form.forEach(input => {
      if (input.className.includes('input kn-keyword-search')) {
        input.ariaLabel = 'Keyword Search';
      } else if (input.className.includes('kn-datetime-input knack-date input control hasDatepicker')) {
        input.ariaLabel = 'Input Date';
      } else if (input.className.includes('kn-datetime-input kn-time input control ui-timepicker-input')) {
        input.ariaLabel = 'Input Time'; 
      } else if (input.className.includes('operator') || input.className.includes('select') || input.className.includes('default')) {
        input.ariaLabel = 'Select'; 
      }
    });
  });

  // Adds aria-label to search input for all dropdown fields
  const searchInputs = document.querySelectorAll('.chzn-search');
  searchInputs.forEach(item => {
    if (item.hasChildNodes('input')) {
      item.querySelector('input').setAttribute('aria-label', 'Search');
    }
  });

  // Adds aria-label to all close modal buttons
  const closeModals = document.querySelectorAll("button.delete.close-modal");
  closeModals.forEach(item => {
    item.setAttribute('aria-label', "Close modal");
  });


  // If view is a table will check Per page option exists. If so, adds a aria label for dropdown selection.
  const limitPage = document.querySelectorAll('select[name="limit"]');
  const pageSelect = document.querySelectorAll('select[name="page_select"]');
  limitPage.forEach(item => {
    if (limitPage && item.hasChildNodes('option')) {
      if (item) {
        item.setAttribute('aria-label', "Select per page");
      }
    }
  });
  pageSelect.forEach(item => {
    if (pageSelect && item.hasChildNodes('option')) {
      if (item) {
        item.setAttribute('aria-label', "Select page number");
      }
    }
  });

  // If table header is empty, add aria-label for sort link
  $("th").find("a").each(function() {
    if ($(this).context.className == 'kn-sort level is-compact') {
      const label = $(this).children("span").text();
      $(this).context.ariaLabel= ("Sort " + label).trimEnd();
    }
  });

  // If search choice has multiple options, add aria-label for close link
  $("search-choice").find("a").each(function() {
    if ($(this).context.className =='chzn-choices') {
      const label = $(this).children("span").text();
      $(this).context.ariaLabel= ("Close " + label).trimEnd();
    }
  });

});

// If a dropdown multi-choice has a new item, add close label to close link
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      if ($(node).hasClass('search-choice')) {
        const searchChoice = document.querySelectorAll('.search-choice span');
        const searchChoiceClose = document.querySelectorAll('a.search-choice-close');
        searchChoiceClose.forEach((item,index) => {
          const label = searchChoice[index].innerHTML;
          item.setAttribute('aria-label', `Remove '${label}'`);
        });
      }
    });
  });
});
observer.observe(document.body, { childList: true, subtree: true });