//= require dataTables/datatables.min.js
//= require choices/choices.min.js

const selections = new Object

const reportingTypeSelect = new Choices(document.getElementById('reporting_type'), {
    position: 'bottom',
    shouldSort: false,
    shouldSortItems: false,
    searchPlaceholderValue: "search...",
});
const divisionSelect = new Choices(document.getElementById('division_id'), {
    position: 'bottom',
    shouldSort: false,
    shouldSortItems: false,
    searchPlaceholderValue: "search...",
});
let today = moment().format('MM.DD.YYYY')

changeReportTitle = () => {
    (document.getElementById("report-title").getElementsByTagName("span"))[0].innerHTML = document.getElementsByClassName('report-title')[0].innerText
}

setDateOptions = (dataObject) => {
  val = dataObject.value
  if (val == "timesheets_by_pay_period") {
    el = document.getElementById("pay-period")
    el.className = el.className.replace(/\bhidden\b/g, "");
    hel = document.getElementById("date-range")
    hel.classList.add("hidden");
  } else {
    hel = document.getElementById("date-range")
    el = document.getElementById("pay-period")
    hel.className = el.className.replace(/\bhidden\b/g, "");
    el.classList.add("hidden");
  }
}
timesheetsByPayPeriod = () => {
let file_title = `timesheet_report_list_${today}`;
loadDatatable(file_title)
}
uninvoicedTerms = () => {
let file_title = `timesheet_report_list_${today}`;
loadDatatable(file_title)

};
uninvoicedPwms = () => {
let file_title = `timesheet_report_list_${today}`;
loadDatatable(file_title)

};
uninvoicedTimesheets = () => {
let file_title = `timesheet_report_list_${today}`;
loadDatatable(file_title)

 };

loadDatatable = (file_title) => {
    const table = $('.timesheetsInvoicesDataTables').DataTable({
        pageLength: 25,
        responsive: true,
        ordering: true,
        order: [0, 2, 1],
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [{
                extend: 'csv'
            },
            {
                extend: 'excel',
                title: file_title
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
};

