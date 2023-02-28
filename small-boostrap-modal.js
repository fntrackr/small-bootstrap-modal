function showModal(elementId) {
  let modal = document.getElementById(elementId);
  modal.classList.toggle("show");
  modal.style.display = "block";
  if ((modal.getAttribute('data-bs-backdrop') === 'false') === false) {
    var backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop show";
    document.body.appendChild(backdrop);
  }
 // if (modal.hasAttribute('data-bs-focus') && modal.getAttribute('data-bs-focus') !== 'false') {
    focusTrap(modal);
 // }
}

function closeModal(elementId) {
  let modal = document.getElementById(elementId);
  modal.classList.toggle("show");
  modal.style.display = "none";
  var modalBackdrop = document.querySelector(".modal-backdrop");
  if (modalBackdrop) {
    modalBackdrop.remove();
  }
}

function focusTrap(modal) {
  let focusableElements = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
  focusableElements = Array.prototype.slice.call(focusableElements);
  let firstFocusableElement = focusableElements[0];
  let lastFocusableElement = focusableElements[focusableElements.length - 1];
  modal.addEventListener('keydown', function(event) {
    let key = event.keyCode;
    if (key === 9) {
      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
      else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
  });
}

function modalListener(){
  document.addEventListener('click', function(event) {
    let target = event.target;
    console.log(target.getAttribute('data-bs-backdrop'))
    let close = target.closest('[data-bs-dismiss="modal"]');
    let modal = target.closest('[data-bs-toggle="modal"]');
    if (close) {
      let modal = target.closest('.modal');
      closeModal(modal.id)
    }
    else if (modal) {
      let modalId = modal.getAttribute('data-bs-target');
      showModal(modalId.replace("#", ""))
    }
    else if (target.classList.contains("modal") && target.classList.contains("show") && !(target.getAttribute('data-bs-backdrop') == "static")){
      if (mouseDownOnModal) {
        let modal = target.closest('.modal');
        closeModal(modal.id)
        mouseDownOnModal = false;
      }
    }
    mouseDownOnModal = false;
    return
  });
}

document.addEventListener('mousedown', function(event) {
  let target = event.target;
  if (target.classList.contains("modal")) {
    mouseDownOnModal = true;
  }
});

function keydownListener(){
  document.addEventListener('keydown', function(event) {
    let key = event.keyCode;
    let modal = document.querySelector('.modal.show');
    if (key === 27 && modal) {
      closeModal(modal.id);
      event.preventDefault();
    }
  });
}
