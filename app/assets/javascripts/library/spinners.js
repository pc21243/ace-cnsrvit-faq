const addSpinner = (el) => {

    const spinner = `
      <div class="sk-spinner sk-spinner-three-bounce">
          <div class="sk-bounce1 cyan lighten-4"></div>
          <div class="sk-bounce2 cyan lighten-3"></div>
          <div class="sk-bounce3 cyan lighten-2"></div>
      </div>`
    spinnerEl = document.createRange().createContextualFragment(spinner)
    el.classList.add("sk-loading")
    el.insertBefore(spinnerEl, el.firstChild)
}

const removeSpinner = (parentEl) => {

    parentEl.classList.remove("sk-loading")
    parentEl.firstElementChild.remove()
}