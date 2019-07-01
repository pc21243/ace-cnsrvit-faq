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
const grantSelect = new Choices(document.getElementById('grant_id'), {
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

const showDropDownLists = (choices) => {
    selects = [agencySelect, locationSelect, agreementSelect, grantSelect, divisionSelect, programSelect]
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


const interpretJson = (jsonData) => {
    console.log(jsonData)
    const demogCats = Object.keys(jsonData)
    for (demogCat of demogCats) {
        // document.getElementById(demogCat).innerHTML = "";

        if (demogCat === "total") {
            let demogItem = document.createRange().createContextualFragment(`<li class="demog-item"><h1 class="demog-toal">  ${jsonData[demogCat]}</h1></li>`)

            document.getElementById(demogCat).appendChild(demogItem)
        } else {
            let keys = Object.keys(jsonData[demogCat])
            for (key of keys) {

                let textOption = displayText(key)


                let demogItem = document.createRange().createContextualFragment(`<li class="demog-item"><b>${textOption}:</b>  ${jsonData[demogCat][key]}</li>`)
                document.getElementById(demogCat).appendChild(demogItem)
            }
        }
    }

}

const formSubmission = (e) => {
    let form = document.getElementById("demographic-form")
    form.preventDefault
    e.preventDefault();

    cats = document.getElementsByClassName("cat-ul")
    for (cat of cats) {
        //meow
        cat.innerHTML = ""
    }
    const formData = serializeFormData(form)
    $.ajax({
        type: 'GET',
        url: `/staff/demographics.json`,
        data: formData,
        dataType: 'json',
        success: function(jsonData) {
            interpretJson(jsonData)


        },
        complete: function() {
            $('#ajax-loading').hide();
        },
        error: function(data) {
            // update of colors
            return false;
        }
    });
}
selects = [agencySelect, locationSelect, agreementSelect, grantSelect, divisionSelect, programSelect]
for (select of selects) {
    select.passedElement.element.parentNode.parentNode.classList.add("hidden")
}
addSelecttionEventListeners()
document.getElementById("demographic-form").addEventListener("submit", formSubmission)

reportingTypeSelect.passedElement.element.addEventListener('change', getReportingItems, false)

// CHARTS
// $(function() {
//
//     const rando = (count) => {
//         return Array(count).fill().map(() => Math.round(Math.random() * 10000000) + 100000)
//     }
//     // chart sample
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
// });
