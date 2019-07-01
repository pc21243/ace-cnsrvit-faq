
const invoiceButtonEvent = (event) => {
    addSpinner(document.getElementById("items-loading"))

    event.stopImmediatePropagation();
    event.preventDefault();


    url = event.currentTarget.getAttribute("data-url")
    console.log(url)
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'script',
        success: function(data, status, rec) {
            if (status == "success") {
                setSuccessAlert("Invoice Items have been added")
            }
        },
        error: function(message) {
            // Error Loading Data
            console.log(message)
            setDangerAlert("An error occured, unable to add invoice item, please see site administrators")
        },
        complete: function() {
            removeSpinner(document.getElementById("items-loading"))
        }
    });
    return false;
};

const expandInvoiceItemRows = (event) => {
    showFromId = document.getElementById(event.currentTarget.dataset.showrows).id
    document.querySelectorAll("tr.\\" + showFromId).forEach(function(el, currentIndex, origObj) {
      if (el.classList.contains("rowveal") && el.classList.contains("hide")) {
        el.classList.remove("hide")
      } else if (el.classList.contains("rowveal")) {
        el.classList.add("hide")
      }
    })
  }

// EVENT LISTENERS
var expandButtons = document.querySelectorAll('.expand-items')
for (i = 0; i < expandButtons.length; ++i) {
  expandButtons[i].addEventListener('click', expandInvoiceItemRows)
};
var importButtons = document.querySelectorAll('button.import-service,button.import-expense')
for (i = 0; i < importButtons.length; ++i) {
  importButtons[i].addEventListener('click', invoiceButtonEvent)
};

