//Slowly pulling code out of this IFFE
//Model Controller
var modelController = (function() {

    return {
        updateInvoiceStatus: function(newStatus, newStatusTransition, IDs) {
            var newStatus = newStatus.toLowerCase()
            var newStatusTransition = newStatusTransition.toLowerCase()
            $.ajax({
                type: "PUT",
                url: `/staff/agreements/${IDs.agreement_id}/invoices/${IDs.invoice_id}`,
                dataType: "json",
                data: {
                    invoice: {
                        status_action: newStatusTransition,
                    }
                },
                success: function(data) {
                    console.log(`You successfully update the status to ${newStatus}.`);
                    location.reload()
                    setupEventListeners()
                    return false;
                },
                error: function(data) {
                    // update of colors
                    return false;
                }
            });
        },
    }
})();


//UI Controller
var UIController = (function() {

    var DOMstrings = {
        startDate: '.invoice_item_start_date',
        endDate: '.invoice_item_end_date',
        unitType: '.invoice_item_unit_type',
        unitRate: '.invoice_item_unit_rate',
        unitCount: '.invoice_item_unit_count',
        matchRate: '.invoice_item_match_rate',
        matchHours: '.invoice_item_invoice_amount',
        addExpenseButton: '.add_expense',
        deleteItemButton: '.delete_invoice_item',
        editButton: '.edit_invoice_item',
        saveButton: '.save_invoice_item',
        approveButton: '.approve',
        status: '#invoice_status_badge',
        invoiceItemId: '.invoice_item_id',
        invoiceId: '#invoice_id',
        agreementId: '#agreement_id',
        actionReviewNow: '.review_now',
        actionApprove: '.approve',
        actionReject: '.reject',
        actionPay: '.pay',
        statusActions: '.status-actions a'
    };

    var BadgeLabelClasses = {
        draft: 'badge-warning',
        review: 'badge-info',
        approved: 'badge-primary',
        rejected: 'badge-danger',
        paid: 'badge-success',
    };

    //everything we need in another controller
    return {
        getDOMstrings: function() {
            return DOMstrings;
        },
        getBadgeLabelClasses: function() {
            return badgeLabelClasses
        },
        //toggle show/hide for rows
        toggleRow: function(row) {
            row.classList.toggle('hidden')
        },

        // we need to enable form fields
        enableFormRow: function(row) {
            //some code here #FIXME
        },
        // we need to disable form fields
        disableFormRow: function(row) {
            //some code here #FIXME
        },
        removeButton: function(btn) {
            btn.classList.add('hidden')
        },
        deleteItem: function(row) {
            console.log(row)
        },
        showButton: function(btn) {
            // FIXME comment out again after demo
            btn.classList.remove('hidden')
        },
        updateStatusBadge: function(newStatus) {
            // don't forget to add class
            var badge, badgeClass
            switch (newStatus) {
                case 'Draft':
                    badgeClass = BadgeLabelClasses.draft
                    break;
                case 'Review':
                    badgeClass = BadgeLabelClasses.review
                    break;
                case 'Approved':
                    badgeClass = BadgeLabelClasses.approved
                    break;
                case 'Rejected':
                    badgeClass = BadgeLabelClasses.draft
                    break;
                case 'Paid':
                    badgeClass = BadgeLabelClasses.paid
                    break;
            }
            var badge = document.querySelector(DOMstrings.status);
            badge.innerHTML = newStatus;
            badge.classList.remove("badge-warning")
            badge.classList.remove("badge-info")
            badge.classList.remove("badge-success")
            badge.classList.remove("badge-primary")
            badge.classList.remove("badge-danger")
            badge.classList.add(badgeClass);
            console.log(`The UI has updated the status to ${newStatus}`)
        },
        getDocumentIds: function() {
            var ids = {
                // I'm sure there is a better way to get these IDs...
                invoice_id: document.querySelector(DOMstrings.invoiceId).getAttribute("data"),
                agreement_id: document.querySelector(DOMstrings.agreementId).getAttribute("data"),
            };
            return ids;
        },
    };
})();

var controller = (function(modelCtrl, UICtrl) {
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        //This is for the Invoice Items
        document.querySelector(DOM.importExpenseButton) && document.querySelector(DOM.importExpenseButton).addEventListener('click', ctrlImportExpenses);
        document.querySelector(DOM.addExpenseButton) && document.querySelector(DOM.addExpenseButton).addEventListener('click', ctrlAddItem);
        document.querySelector(DOM.editButton) && document.querySelector(DOM.editButton).addEventListener('click', ctrlEditItem);
        document.querySelector(DOM.saveButton) && document.querySelector(DOM.saveButton).addEventListener('click', ctrlSaveItem);


        var transitions = document.querySelectorAll(DOM.statusActions);
        for (i = 0; i < transitions.length; ++i) {
            transitions[i].addEventListener('click', function(event) {
                var newStatus, newStatusTransition, btn
                btn = event.srcElement;
                console.log(btn);
                newStatus = btn.getAttribute("data-status");
                newStatusTransition = btn.getAttribute("data-transition");
                console.log(newStatusTransition)

                console.log("Transitioning invoice to: " + newStatus + " using action: " + newStatusTransition);
                // update updating backend and view
                statusBtnClicked(newStatus, newStatusTransition, btn)
            });
        };
    };


    var setupStatusButtons = function() {
        DOM = UICtrl.getDOMstrings();
        status = document.querySelector(DOM.status).innerHTML
        btns = document.querySelectorAll(DOM.statusActions);
        for (var i = 0; i < btns.length; i++) {
            UICtrl.removeButton(btns[i]);
        };
        switch (status) {
            case 'Draft':
                UICtrl.showButton(document.querySelector(DOM.actionReviewNow));
                break;
            case 'Review':
                UICtrl.showButton(document.querySelector(DOM.actionReject));
                UICtrl.showButton(document.querySelector(DOM.actionApprove));
                break;
            case 'Approved':
                UICtrl.showButton(document.querySelector(DOM.actionPay));
                break;
            case 'Rejected':
                UICtrl.showButton(document.querySelector(DOM.actionReviewNow));
                break;
            case 'Paid':
                btn = Array.from(btns).find(btn => btn.classList.contains('unpay'))
                UICtrl.showButton(btn)
                break;
        };
    };

    statusBtnClicked = function(newStatus, newStatusTransition, btn) {
        var IDs, DOM;
        DOM = UICtrl.getDOMstrings();
        //
        IDs = UICtrl.getDocumentIds();
        // update backend
        modelCtrl.updateInvoiceStatus(newStatus, newStatusTransition, IDs);
        // update status
        UICtrl.updateStatusBadge(newStatus);
        // remove button
        // console.log(`This btn is in the statusBtnClicked btn:${btn} newStatus:${newStatus} newStatusTransition:${newStatusTransition}`)
        UICtrl.removeButton(btn);
        //bug to remove extra buttons for rejected status
        if (newStatusTransition == "reject") {
            UICtrl.removeButton(document.querySelector(DOM.actionPay));
            UICtrl.removeButton(document.querySelector(DOM.actionApprove));
        }

        //show button I'll need to rework this later....
        switch (newStatus) {
            case 'Draft':
                UICtrl.showButton(document.querySelector(DOM.actionReviewNow));
                break;
            case 'Review':
                UICtrl.showButton(document.querySelector(DOM.actionReject));
                UICtrl.showButton(document.querySelector(DOM.actionApprove));
                break;
            case 'Approved':
                UICtrl.showButton(document.querySelector(DOM.actionPay));
                break;
            case 'Rejected':
                UICtrl.showButton(document.querySelector(DOM.actionReviewNow));
                break;
            case 'Paid':
                // no actions available
                break;
        };
    };


    var ctrlAddItem = function() {
        console.log("Add Button Clicked");

        // 1. Gather any data input

        // 2. Add item to budget Controller

        // 3. Add new item to the UI

        // 4. Clear the fields

        // 5. Calculate and update Invoice totals

    };
    var ctrlImportExpenses = function() {
        $(function() {});
    };

    var ctrlEditItem = function() {
        var invoice_item_id, textRow, formRow;

        // 1. Get rows
        textRow = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        invoice_item_id = textRow.cells[9].innerHTML
        formRow = textRow.nextElementSibling
        // 1. Hide Text Row
        UICtrl.toggleRow(textRow);
        // 2. show edit row
        UICtrl.toggleRow(formRow);
        // 3. removed 'disabled from form items

    };

    var ctrlSaveItem = function() {
        var invoice_item_id, textRow, formRow;
        textRow = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        invoice_item_id = textRow.cells[9].innerHTML
        formRow = textRow.previousElementSibling
        // 1. hide regular row
        UICtrl.toggleRow(textRow);
        // 2. show edit row
        UICtrl.toggleRow(formRow);
        // 3. removed 'disabled from form items
    };

    return {
        init: function() {
            setupEventListeners();
            setupStatusButtons();
        }
    };
})(modelController, UIController);

controller.init();