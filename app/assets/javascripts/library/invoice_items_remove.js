
// UPDATE Total UI
const updateUITotals = (invoiceAmount, row, project_id, row_type) => {
    let projectElemName,summaryRowId
    if ( project_id ==  'no_project'){ 
      projectElemName = 'p-none'
      summaryRowId = "not_service"
    } else {
      projectElemName = `project-subtotal-${project_id.replace(/project-/,'')}`
      summaryRowId = row.dataset.summaryRow
    }
    totalClasses = [
      ['service-total',['service']],
      ['expense-total',['expense']],
      [`${summaryRowId}-total`,['service']],
      ['grand-total',['service','expense']],
      [projectElemName,['service']]
    ]

    console.log(totalClasses)
    totalElements = []
    for (var tot of totalClasses) { totalElements.push([[document.getElementsByClassName(tot[0])],tot[1]]) }


    for (var tot of totalElements) {
      if ((tot[1]).includes(row_type) ) {
        Array.from(tot[0][0]).forEach(function(elem){
        console.log(elem)
          total = parseFloat(elem.getAttribute("data-total")).toFixed(2) - invoiceAmount;
          elem.innerHTML = 0
          elem.innerHTML = `$${currencyWithCommas(total.toFixed(2))}`
          elem.dataset.total = total
          addClass(elem, "blink-it")
          // still not updating total project hours and match $
        })
      }
    }

    removeProjectTable(project_id,row,summaryRowId)

    setTimeout(function(){ 
    for (var tot of totalElements) {
      Array.from(tot[0][0]).forEach(function(elem){
        removeClass(elem, "blink-it")
      })
    }
    }, 3000);
}

const updateTotalRow = (totalRow,totalValue) => {
    totalRow.innerHTML = `$${currencyWithCommas(totalValue)}`
    totalRow.dataset.total = totalValue
    addClass(TotalRow, "blink-it")
}

const removeProjectTable = (project_id,row,summaryRowId) => {
    projectRow =  document.getElementById(project_id)
    summaryRow = document.getElementById(summaryRowId)
    summaryChildren  = document.querySelectorAll(`[data-summary-row='${summaryRowId}']`)
    if (projectRow) {
      if (projectRow.rows.length == 4){
        allProjectRows = document.querySelectorAll(`.${project_id}`)
        Array.prototype.forEach.call( allProjectRows, function( node ) {
          node.parentNode.removeChild( node );
        })
      } else if (summaryRow) {
        if (summaryChildren.length == 1){
          summaryRow.remove()
          row.remove()
        } else {
          row.remove()
        }
      }
    } else {
      row.remove()
    }
}


// AJAX call to delete
const ajaxDeleteItem = (url, invoiceAmount, row, invoice_type, project_id) => {
    $('#ajax-loading').show();
    $.ajax({
        type: 'delete',
        url: url,
        dataType: 'json',
        success: function(jsonData) {
          updateUITotals(invoiceAmount, row, project_id, invoice_type)
          setSuccessAlert("Invoice Item has been successfully removed")
        },
        error: function(message) {
         // Error Loading Data
         setDangerAlert("Unable to remove invoice item")
        },
         complete: function() {
           $('#ajax-loading').hide();
           //location.reload(); FIXME
        }
    })
};

const getInvoiceItemType = (event) => {
    return event.currentTarget.getAttribute("data-item-type")
}

const getInvoiceItemAmount = (invoice_type, row) => {
    amountColumn = row.querySelectorAll("td.ii-amount")[0]
    return parseFloat(amountColumn.dataset.invoiceAmount)
}

const getTableID = (event) => {
    return event.currentTarget.dataset.removeTable
}

//DELETE ITEM
const deleteInvoiceItem = () => {
    let invoice_item_id, row, url, invoiceAmount, invoice_type, project_id;

    // 1. Get InvoiceItem Type
    invoice_type = getInvoiceItemType(event)

    //1.1. Get the Project ID
    if (invoice_type === "service") {
        project_id = getTableID(event)
    } else {
        project_id = "no_project"
    }
    // console.log(`project_id: ${project_id}`)

    // 2. get item Row
    row = document.getElementById(event.currentTarget.getAttribute("data-remove-row"))

    // 3. stop propagation and prevent defaults
    event.stopImmediatePropagation();
    event.preventDefault();

    // 4. get URL for ajax call
    url = row.getAttribute("data-url");

    // 5. get the Invoice Item amount
    invoiceAmount = getInvoiceItemAmount(invoice_type, row)
    // 3. delete Item
    ajaxDeleteItem(url, invoiceAmount, row, invoice_type, project_id)

};


// EVENT LISTENERS
var expenseButtons = document.querySelectorAll(".delete_invoice_item")

for (i = 0; i < expenseButtons.length; ++i) {
    expenseButtons[i].addEventListener('click', deleteInvoiceItem)
};
