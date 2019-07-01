//=require choices/choices.min.js
//= require chartist/chartist.min.js
//= require chartjs/Chart.min.js
//= require library/form_helpers.js

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

const programSelect = new Choices(document.getElementById('program_id'), {
    position: 'bottom',
    shouldSort: false,
    shouldSortItems: false,
    searchPlaceholderValue: "search...",
});

const quarterSelect = new Choices(document.getElementById('period_filter'), {
    position: 'bottom',
    shouldSort: false,
    shouldSortItems: false,
    searchPlaceholderValue: "search...",
});


const showDropDownLists = (choices) => {
    selects = [divisionSelect, programSelect]
    for (select of selects) {
        select.passedElement.element.parentNode.parentNode.classList.add("hidden")
    }
    document.getElementById("all-corps-message").classList.add("hidden")
    if (choices == "all_corps") {
        document.getElementById("all-corps-message").classList.remove("hidden")
        showDateRanges()
    } else {
        document.getElementById(`${choices}_id`).parentNode.parentNode.classList.remove("hidden")
    }
}

const getReportingItems = (e) => {
    let detail = e.detail
    const reporting_type = detail.value
    showDropDownLists(reporting_type)
    selections["reporting_type"] = reporting_type
}


updateSelections = (e) => {
    selections[e.target.id] = e.target.value
}

showDateRanges = () => {
    document.getElementById('date-range').classList.remove("hidden")
}

addSelecttionEventListeners = () => {
    let nodeList = document.getElementsByClassName('demographic-select');
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener("change", updateSelections)
    })
    let secondChoicesList = document.getElementsByClassName('choice-2');
    Array.prototype.forEach.call(secondChoicesList, function(node) {
        node.addEventListener("change", showDateRanges)
    })
}


const displayText = (key) => {
    switch (key) {
        case "":
            return ("Undeclared")
        case "true":
            return ("Yes")
        case "false":
            return ("No")
        default:
            return key
    }
}

const createProjectWeekDetail = (projectWeek) => {
    const {
        url,
        service_hours,
        billable_units,
        invoice_total,
        project,
        agreement,
        invoice
    } = projectWeek
    const {
        agreement_title,
        agreement_url
    } = agreement
    const {
        project_title,
        project_url
    } = project
    const {
        is_invoiced,
        invoice_url
    } = invoice

    let titleText = `<span><a href=${url}>${project_title}</a></span>`
    let agreementText = `<span><a href=${agreement_url}>${agreement_title}</a></span>`
    let invoiceTotalText = `<span>${is_invoiced ? `<a href=${invoice_url}>${invoice_total}</a>` : `${invoice_total}`}</span>`
    let serviceHoursText = `<span>${service_hours}</span>`
    let billableUnits = `<span>${billable_units}</span>`

    let tableRef = document.getElementById("project-week-table-detail-body");

    let rowData = [titleText, agreementText, invoiceTotalText, serviceHoursText, billableUnits]

    createTableRow(tableRef, rowData)

}

const createTableCell = (row, frag, index) => {
    let newCell = row.insertCell(index)
    newCell.appendChild(frag);
}

const createFrag = (htmlTemplate) => {
    return document.createRange().createContextualFragment(htmlTemplate)
}

const createTableRow = (tableRef, rowData) => {
    let newRow = tableRef.insertRow(-1);
    rowData.forEach((column, index) => {
        createTableCell(newRow, createFrag(column), index)
    });
}

const addDisplayDetailsEventListeners = (klass, func) => {
    els = document.getElementsByClassName(klass)
    for (el in els) {
        addEventListener("click", displayDetails)
    }
}

const createProjectWeek = (projectWeek) => {

    let {
        week_of,
        week_count,
        hours_worked,
        invoice_total,
        invoiced,
        project_week_ids,
        member_count,
    } = projectWeek

    let weekOfText = `<span data-children=${project_week_ids} class = "client-link display">${week_of}</span>`
    let iconText = `<span class="fa fa-calendar fa-2x ${(invoiced ? "" : "red-text darken-4")}"></span>`
    let weekCountText = `<span class="pull-right">${week_count}</span>`
    let hoursWorkedText = `<span class="pull-right">${hours_worked}</span>`
    let invoiceTotalText = `<span class="pull-right">${invoice_total}</span>`
    let memberCountText = `<span class="pull-right">${member_count}</span>`
    // let revenuePerHourText = `<span class="pull-right">$${revenue_per_hour}</span>`

    let tableRef = document.getElementById("project-week-table-body");
    let rowData = [iconText, weekOfText, weekCountText, hoursWorkedText, invoiceTotalText, memberCountText]

    createTableRow(tableRef, rowData)

    addDisplayDetailsEventListeners("display", displayDetails)

}

const createProjectWeekDetailTable = () => {
    const projectWeekDetailTable = `
    <div class="ibox-title">
      <h2>
        <i class="fa fa-pie-chart" style="font-size: 40px; color: #e5e5e5; padding-right: 10px;"></i>
        Project Week Breakdown
      </h2>
      <p><em id = "week-detail-subheader"></em></p>
    </div>
    <div class="ibox-content">
      <div id="week-detail-table"></div>
        <div class="full-height-scroll">
          <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered" id="project-week-table">
              <thead>
                <th>Title</th>
                <th>Agreement</th>
                <th>Invoice Total</th>
                <th>Service Hrs</th>
                <th>Billable Units</th>
              </thead>
              <tbody id="project-week-table-detail-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`
    el = document.createRange().createContextualFragment(projectWeekDetailTable)

    return el
}

const createProjectWeekTable = () => {
    let projectWeekTableText = `
            <div class="full-height-scroll">
              <div class="table-responsive">
                <table class="table table-striped table-hover table-bordered" id="project-week-table">
                  <thead>
                    <th></th>
                    <th>Week of</th>
                    <th>Work Weeks</th>
                    <th>Service Hrs</th>
                    <th>Invoice Total</th>
                    <th>Member Count</th>
                  </thead>
                  <tbody id="project-week-table-body"></tbody>
                </table>
              </div>
            </div>`
    projectWeekTableFrag = document.createRange().createContextualFragment(projectWeekTableText)

    return projectWeekTableFrag
}

const interpretJson = (jsonData) => {

    document.getElementById("week-summary-table").innerHTML = ""
    document.getElementById("week-summary-table").appendChild(createProjectWeekTable())

    jsonData.forEach((item, index) => {
        let row = createProjectWeek(item)
    });

}

const interpretDetailJson = (jsonData, msg) => {
    document.getElementById("week-detail-table").innerHTML = ""
    document.getElementById("week-detail-table").appendChild(createProjectWeekDetailTable())
    document.getElementById("week-detail-subheader").innerHTML = msg
    jsonData.forEach((item, index) => {
        let row = createProjectWeekDetail(item)
    });

}

const weekSummarySubHeader = (formData) => {
    let secondLine = ""
    let reportingType = document.getElementById("reporting_type").firstChild.innerHTML
    let division = document.getElementById("division_id").firstChild.innerHTML
    let program = document.getElementById("program_id").firstChild.innerHTML
    let period = document.getElementById("period_filter").firstChild.innerHTML

    switch (reportingType) {
        case "Program":
            secondLine = `${program}`
            break;
        case "Division":
            secondLine = `${division}`
            break;
        case "All Corps":
            secondLine = "All Corps"
            break;
        default:
            secondLine = ""

    }

    let el = document.getElementById("week-summary-subheader")
    let text = `${secondLine} - ${period}`
    el.innerHTML = text

}

const formSubmission = (e) => {
    let form = document.getElementById("demographic-form")
    form.preventDefault
    e.preventDefault();

    document.getElementById("week-summary-table").innerHTML = ""
    document.getElementById("week-detail-table").innerHTML = ""


    const formData = serializeFormData(form)
    weekSummarySubHeader(formData)
    document.getElementById("week-summary-box").classList.remove("hidden")
    addSpinner(document.getElementById("week-summary-box"))

    $.ajax({
        type: 'GET',
        url: `/staff/weekly_report_logs.json`,
        data: formData,
        dataType: 'json',
        success: function(jsonData) {


            interpretJson(jsonData)


        },
        complete: function() {
            removeSpinner(document.getElementById("week-summary-box"))
        },
        error: function(data) {
            // update of colors
            return false;
        }
    });
}

const highlightWeekSummary = (e) => {
    let rows = document.getElementById("project-week-table-body").rows
    for (var i = 0; i < rows.length; i++) {
        rows[i].classList.remove("highlight")
    }
    let row = e.target.parentElement.parentElement
    row.classList.add("highlight")

}

const getProjectWeekData = (ids, e) => {
    pw_ids = ids.split(",").map(Number)
    let projectWeekData = {
        project_week_ids: pw_ids
    }
    document.getElementById("week-detail-table").innerHTML = ""
    highlightWeekSummary(e)
    addSpinner(document.getElementById("week-detail-box"))

    // let el = document.getElementById("week-detail-subheader")


    let weekDetailSubheader = `Week of ${e.target.innerText}`

    $.ajax({
        type: 'GET',
        url: `/staff/weekly_report_logs.json`,
        data: projectWeekData,
        dataType: 'json',
        success: function(jsonData) {

            interpretDetailJson(jsonData, weekDetailSubheader)

        },
        complete: function() {
            removeSpinner(document.getElementById("week-detail-box"))
        },
        error: function(data) {
            // update of colors
            return false;
        }
    });
}

const displayDetails = (e) => {
    const projectWeekData = e.target.dataset.children
    getProjectWeekData(projectWeekData, e)

}



selects = [divisionSelect, programSelect]
for (select of selects) {
    select.passedElement.element.parentNode.parentNode.classList.add("hidden")
}
addSelecttionEventListeners()
document.getElementById("demographic-form").addEventListener("submit", formSubmission)

reportingTypeSelect.passedElement.element.addEventListener('change', getReportingItems, false)