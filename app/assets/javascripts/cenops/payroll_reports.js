//= require dataTables/datatables.min.js
//=require choices/choices.min.js

const selections = new Object

const reportingTypeSelect = new Choices(document.getElementById('reporting_type'), {
    position: 'bottom',
    shouldSort: false,
    shouldSortItems: false,
    searchPlaceholderValue: "search...",
});

const periodTypeSelect = new Choices(document.getElementById('period_type_id'), {
    position: 'bottom',
    shouldSort: false,
    shouldSortItems: false,
    searchPlaceholderValue: "search...",
});

const payPeriodASelect = new Choices(document.getElementById('pay_period_a_id'), {
    position: 'bottom',
    shouldSort: false,
    shouldSortItems: false,
    searchPlaceholderValue: "search...",
});
const payPeriodBSelect = new Choices(document.getElementById('pay_period_b_id'), {
    position: 'bottom',
    shouldSort: false,
    shouldSortItems: false,
    searchPlaceholderValue: "search...",
});
changeReportTitle = () => {
    (document.getElementById("report-title").getElementsByTagName("span"))[0].innerHTML = document.getElementsByClassName('report-title')[0].innerText
}
const showSelectionTwo = (choices) => {
    selects = [periodTypeSelect]
    for (select of selects) {
        select.passedElement.element.parentNode.parentNode.classList.add("hidden")
    }
    switch (choices) {
    case "not_in_payroll_system":
      selection = "period_type_id"
    break;

    }
    document.getElementById(`${selection}`).parentNode.parentNode.classList.remove("hidden")
}

const showSelectionThree = (choices) => {
    selects = [payPeriodASelect, payPeriodBSelect]
    for (select of selects) {
        select.passedElement.element.parentNode.parentNode.classList.add("hidden")
    }
    document.getElementById(`${choices.detail.value}_id`).parentNode.parentNode.classList.remove("hidden")
}
const getReportingItems = (e) => {
    let detail = e.detail
    const reporting_type = detail.value
    showSelectionTwo(reporting_type)
    selections["reporting_type"] = reporting_type
}


updateSelections = (e) => {
    console.log("Selection changed")
    selections[e.target.id] = e.target.value
}


addSelecttionEventListeners = () => {
    let nodeList = document.getElementsByClassName('payroll-select');
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener("change", updateSelections)
    })
    let secondChoicesList = document.getElementsByClassName('choice-2');
    Array.prototype.forEach.call(secondChoicesList, function(node) {
        node.addEventListener("change", showSelectionThree)
    })
}
selects = [periodTypeSelect,payPeriodASelect,payPeriodBSelect]
for (select of selects) {
    select.passedElement.element.parentNode.parentNode.classList.add("hidden")
}
addSelecttionEventListeners()

reportingTypeSelect.passedElement.element.addEventListener('change', getReportingItems, false)


let today = moment().format('MM.DD.YYYY')

notInPayrollSystem = () => {
    const file_title = `add_members_to_paylocity_report_${today}`;
    loadDatatable(file_title)
}

loadDatatable = (file_title) => {
    const table = $('.payrollDataTables').DataTable({
        pageLength: 25,
        responsive: false,
        ordering: true,
        order: [0, 2, 1],
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [{
                extend: 'csv'
            },
            {
                extend: 'excel',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'pdf',
                title: file_title
            },
            {
                extend: 'print',
                customize(win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                }

            }
        ]
    });

    $('#people-completeness .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        table.column(0).search(searchTerm || '').draw();
    });

};
