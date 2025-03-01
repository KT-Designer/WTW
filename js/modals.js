document.addEventListener("DOMContentLoaded", function(event) {
  let clmodalcover = document.querySelector('.modal-cover');
  let clmodaltriggers = document.querySelectorAll('.modal-trigger');
  

  // For each trigger loop
  clmodaltriggers.forEach(function(clmodaltrigger, index) {

    let clmodal = document.querySelectorAll('.modal-dialog')[index];
    let clmodalclose = document.querySelectorAll('.modal-close')[index];

    clmodaltrigger.addEventListener('keypress', function(e) {
      if(e.keyCode == 32) {
        clmodaltrigger.click();
        e.preventDefault();
      }
    });

    // Modal trigger event
    clmodaltrigger.addEventListener('click', function(e) {
       
  
      let clmodalid = clmodaltrigger.getAttribute('data-reveal-id');
      clmodal = document.querySelector('#'+clmodalid);  
      clmodalclose = clmodal.querySelector('.modal-close');
     
      if(document.querySelector('html').getAttribute('lang') == 'fr') {  // sets French aria label on close button when opening modal if html lang attribute equals 'fr'
        clmodalclose.setAttribute('aria-label', 'Fermer'); 
      } 
     
      function closemodalactions() {
        clmodal.classList.remove('modal-open');
        clmodalcover.classList.remove('modal-cover-open');
        document.body.classList.remove("modal-open");
        document.body.classList.remove('overflow-hidden');
        // if there is iframe reset video on close when video is playing 
        if (clmodal.querySelector("iframe")) { 
          let testiframe = clmodal.querySelector("iframe");
          testiframe.setAttribute('src', ' ');
        }
        clmodaltrigger.focus(); 
      }
 
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closemodalactions();
        } 
      });

     document.body.classList.add('overflow-hidden');

      // Event listener for escape key
      clmodal.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closemodalactions();
          
        }
      });

      // Event listener for close button
      clmodalclose.addEventListener('click', function(e) {
        closemodalactions();
      });

      // Event listener click outside left or right of modal listener
      let modalcontentcheckclick = clmodal.querySelector('.modal-dialog-content');
      clmodal.addEventListener('click', event => {
        const isClickInside = modalcontentcheckclick.contains(event.target); 
        if (!isClickInside) {
          closemodalactions();
        }
      })

      // Event listener click outside top or bottom of modal listener
      clmodalcover.addEventListener('click', event => {
        const isClickInside = clmodal.contains(event.target);
          if (!isClickInside) {
            closemodalactions();
          }
      })
    
      // check to see if iframe exists and if so append tabindex span 
      let iframecheck = clmodal.getElementsByTagName('iframe');
      let modalcontent = clmodal.querySelector('.modal-dialog-content');
      if (iframecheck.length != 0) {

        if (!modalcontent.querySelector('.hiddenspanstart')) {
          let iframespan = document.createElement("span");

          iframespan.classList.add('hiddenspanstart');
          iframespan.setAttribute("tabindex", "0");
          modalcontent.prepend(iframespan);
        } 
        

      }
      
      clmodal.classList.add('modal-open');
      clmodalcover.classList.add('modal-cover-open');
      document.body.classList.add("modal-open");
      document.body.classList.add('overflow-hidden');
      clmodalkeyboardtrap(clmodal);
      e.preventDefault();
    });

  });

  document.querySelector('.modal-dialog-wrap').addEventListener('click', function(e) {
    if (e.target.nodeName != "LABEL" && e.target.nodeName != "INPUT" &&  e.target.nodeName != "BUTTON" )  {
      document.querySelector('.q1 .question-wrapper h2').focus();
    }
  });
  
  function clmodalkeyboardtrap(clmodal) {
     // focusable elements
    const  focusableElements =
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), object, embed, [tabindex="0"], [contenteditable]';
    const modal = clmodal; // select the modal by it's selector
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    let modalfocus = modal.querySelector('[tabindex="-1"]');
      
    // checks span tag on load and shift focus to close 
    const hidespan = modal.querySelector('.hiddenspanstart');
    const iframecheck = clmodal.getElementsByTagName('iframe');
    
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
    
    document.addEventListener('keydown', function(e) {
      let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
      if (!isTabPressed) {
        return;
      }
      if (e.shiftKey) { // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // add focus for the last focusable element
          e.preventDefault();
        }
      } else { // if tab key is pressed
        if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
          if (iframecheck.length != 0) {
            iframecheck[0].focus();
          } else {
            firstFocusableElement.focus(); // add focus for the first focusable element
          }
          e.preventDefault(); 
        }
      }
    });

    let modalfocuscheck = modal.querySelectorAll('[tabindex="-1"]');
      if (modalfocuscheck.length != 0) {
        modalfocus.focus();
        modalfocus.addEventListener('keydown', function(e) {
          let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
            if (!isTabPressed) {
              return;
            }
            if (e.shiftKey) {
            firstFocusableElement.focus();
            }
        });
      } else if (modal.contains(hidespan)) {
        iframecheck[0].focus();
      } else {
        firstFocusableElement.focus();
      }
    } 
  });