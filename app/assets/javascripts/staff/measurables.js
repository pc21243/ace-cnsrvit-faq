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
const agencySelect = new Choices(document.getElementById('agency_id'), {
    position: 'bottom',
    shouldSort: false,
    shouldSortItems: false,
    searchPlaceholderValue: "search...",
});
const locationSelect = new Choices(document.getElementById('location_id'), {
    position: 'bottom',
    shouldSort: false,
    shouldSortItems: false,
    searchPlaceholderValue: "search...",
});
const agreementSelect = new Choices(document.getElementById('agreement_id'), {
    position: 'bottom',
    shouldSort: false,
    shouldSortItems: false,
    searchPlaceholderValue: "search...",
});
// const grantSelect = new Choices(document.getElementById('grant_id'), {
//     position: 'bottom',
//     shouldSort: false,
//     shouldSortItems: false,
//     searchPlaceholderValue: "search...",
// });
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

const showDropDownLists = (choices) => {
    selects = [agencySelect, locationSelect, agreementSelect, divisionSelect, programSelect]
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
    console.log(reporting_type)
    showDropDownLists(reporting_type)
    selections["reporting_type"] = reporting_type
}


updateSelections = (e) => {
    console.log("Selection changed")
    selections[e.target.id] = e.target.value
}

showDateRanges = () => {
    document.getElementById('date-range').classList.remove("hidden")
}

addSelectionEventListeners = () => {
    let nodeList = document.getElementsByClassName('measurable-select');
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener("change", updateSelections)
    })
    let secondChoicesList = document.getElementsByClassName('choice-2');
    Array.prototype.forEach.call(secondChoicesList, function(node) {
        node.addEventListener("change", showDateRanges)
    })
}

// const getFormData = () => {
//     const keys = Object.keys(selections)
//     const formDataArr = keys.map(key => `&${key}=${selections[key]}`)
//     return (formDataArr.toString().replace(",", ""))
// }

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

const createMeasurableReportingTable = () => {

    let measurableReportingTable = `
            <div class="full-height-scroll">
              <div class="table-responsive">
                <table class="table table-striped table-hover table-bordered" id="measurable-reporting-table">
                  <thead>
                    <th>Title</th>
                    <th>Count</th>
                  </thead>
                  <tbody id="measurable-reporting-table-body"></tbody>
                </table>
              </div>
            </div>`
    measurableReportingTableFragment = document.createRange().createContextualFragment(measurableReportingTable)

    return measurableReportingTableFragment
}

const createMeasurable = (measurable) => {

    let {
        title,
        count,
        unit_type,
    } = measurable

    let titleText = `<span>${title}</span>`
    let countText = `<span>${count} ${unit_type}</span>`

    let tableRef = document.getElementById("measurable-reporting-table-body");

    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);

    // Insert a cell in the row at index 0
    let titleCell = newRow.insertCell(0);
    let countCell = newRow.insertCell(1);

    // Append a text node to the cell
    let titleFrag = document.createRange().createContextualFragment(titleText)
    let countFrag = document.createRange().createContextualFragment(countText)

    titleCell.appendChild(titleFrag);
    countCell.appendChild(countFrag);
}

const interpretJson = (measurables) => {
    document.getElementById("measurable-reporting-table").appendChild(createMeasurableReportingTable())
    for (measurable of measurables) {
        createMeasurable(measurable)
    }
}

const formSubmission = (e) => {
    let form = document.getElementById("measurables-form")
    form.preventDefault
    e.preventDefault();

    addSpinner(document.getElementById("spinner"))

    cats = document.getElementsByClassName("table")
    for (cat of cats) {
        //meow
        cat.innerHTML = ""
    }

    const formData = serializeFormData(form)
    $.ajax({
        type: 'GET',
        url: `/staff/measurables.json`,
        data: formData,
        dataType: 'json',
        success: function(jsonData) {
            interpretJson(jsonData)


        },
        complete: function() {
            removeSpinner(document.getElementById("spinner"));
        },
        error: function(data) {
            // update of colors
            return false;
        }
    });
}
selects = [agencySelect, locationSelect, agreementSelect, divisionSelect, programSelect]
for (select of selects) {
    select.passedElement.element.parentNode.parentNode.classList.add("hidden")
}
addSelectionEventListeners()
document.getElementById("measurables-form").addEventListener("submit", formSubmission)

reportingTypeSelect.passedElement.element.addEventListener('change', getReportingItems, false)

const rando = (count) => {
    return Array(count).fill().map(() => Math.round(Math.random() * 10000000) + 100000)
}

// $(function() {


    // var lineData = {
    //     labels: ["January", "February", "March", "April", "May", "June", "July"],
    //     datasets: [
    //
    //         {
    //             label: "Data 1",
    //             backgroundColor: 'rgba(26,179,148,0.5)',
    //             borderColor: "rgba(26,179,148,0.7)",
    //             pointBackgroundColor: "rgba(26,179,148,1)",
    //             pointBorderColor: "#fff",
    //             data: [28, 48, 40, 19, 86, 27, 90]
    //         }, {
    //             label: "Data 2",
    //             backgroundColor: 'rgba(220, 220, 220, 0.5)',
    //             pointBorderColor: "#fff",
    //             data: [65, 59, 80, 81, 56, 55, 40]
    //         }
    //     ]
    // };
    //
    // var lineOptions = {
    //     responsive: true
    // };
    //
    //
    // var ctx = document.getElementById("lineChart").getContext("2d");
    // new Chart(ctx, {
    //     type: 'line',
    //     data: lineData,
    //     options: lineOptions
    // });

//   var barData = {
//       labels: ["January", "February", "March", "April", "May", "June", "July"],
//       datasets: [{
//               label: "PWN",
//               backgroundColor: 'rgb(229, 115, 115)',
//               borderColor: "rgba(229, 115, 115, 0.7)",
//               pointBackgroundColor: "rgb(229, 115, 115)",
//               pointBorderColor: "#fff",
//               data: rando(8)
//           },
//           {
//               label: "PWC",
//               backgroundColor: 'rgb(144, 202, 249)',
//               borderColor: "rgba(144, 202, 249, 0.7)",
//               pointBackgroundColor: "rgb(144, 202, 249)",
//               pointBorderColor: "#fff",
//               data: rando(8)
//           },
//           {
//               label: "PWS",
//               backgroundColor: 'rgb(230, 238, 156)',
//               borderColor: "rgba(230, 238, 156, 0.7)",
//               pointBackgroundColor: "rgb(230, 238, 156)",
//               pointBorderColor: "#fff",
//               data: rando(8)
//           },
//           {
//               label: "YCC",
//               backgroundColor: 'rgb(197, 225, 165)',
//               borderColor: "rgba(197, 225, 165, 0.7)",
//               pointBackgroundColor: "rgb(197, 225, 165)",
//               pointBorderColor: "#fff",
//               data: rando(8)
//           },
//           {
//               label: "SEN",
//               backgroundColor: 'rgb(244, 143, 177)',
//               borderColor: "rgba(244, 143, 177, 0.7)",
//               pointBackgroundColor: "rgb(244, 143, 177)",
//               pointBorderColor: "#fff",
//               data: rando(8)
//           },
//           {
//               label: "MTW",
//               backgroundColor: 'rgb(129, 212, 250)',
//               borderColor: "rgba(129, 212, 250, 0.7)",
//               pointBackgroundColor: "rgb(129, 212, 250)",
//               pointBorderColor: "#fff",
//               data: rando(8)
//           },
//           {
//               label: "SWA",
//               backgroundColor: 'rgba(255, 224, 130, 1)',
//               borderColor: "rgba(255, 224, 130, 0.7)",
//               pointBackgroundColor: "rgba(255, 224, 130, 1)",
//               pointBorderColor: "#fff",
//               data: rando(8)
//           },
//           {
//               label: "SWT",
//               backgroundColor: 'rgba(255, 171, 145, 1)',
//               borderColor: "rgba(255, 171, 145, 0.7)",
//               pointBackgroundColor: "rgba(255, 171, 145, 1)",
//               pointBorderColor: "#fff",
//               data: rando(8)
//
//           }
//       ],
//
//     };
//
//     var barOptions = {
//         responsive: true
//     };
//
//
//     var ctx2 = document.getElementById("barChart").getContext("2d");
//     new Chart(ctx2, {
//         type: 'bar',
//         data: barData,
//         options: barOptions
//     });
//
//     var doughnutData = {
//         labels: ["Draft", "Review", "Approved", "Paid"],
//         datasets: [{
//             data: rando(4),
//             backgroundColor: [
//                 "rgba(255, 224, 130, 1)", "rgb(129, 212, 250)", "rgba(255, 171, 145, 1)", "rgb(197, 225, 165)"
//             ],
//         }]
//     };
//
//
//     var doughnutOptions = {
//         responsive: true
//     };
//
//
//     var ctx4 = document.getElementById("doughnutChart").getContext("2d");
//     new Chart(ctx4, {
//         type: 'doughnut',
//         data: doughnutData,
//         options: doughnutOptions
//     });
//
//
//
// });
