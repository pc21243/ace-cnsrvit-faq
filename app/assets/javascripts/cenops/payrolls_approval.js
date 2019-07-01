approvePayroll = (payroll_ids) => {
    $.ajax({
        type: "PUT",
        url: `/cenops/batch_payrolls/batch`,
        dataType: "json",
        data: {
            payroll: {
                status_action: "batch_update",
                ids: payroll_ids,
            }
        },
        success: function(data) {
            let status_badge, ids
            statusBadge = document.getElementById(data[0]["status"])
            ids = data.map(obj => obj.id)
            for (let i in ids) {
                let oldStatusBadge, clone
                oldStatusBadge = document.getElementById(`badge-${ids[i]}`).firstChild.nextElementSibling
                clone = statusBadge.cloneNode(true)
                oldStatusBadge.removeChild(oldStatusBadge.firstChild)
                oldStatusBadge.appendChild(clone)
            }
            selectNone()
        },
        error: function(data) {
            setDangerAlert("Unable to update. Please contact Admin")
            selectNone()
        }
    });
}

selectAll = () => {
    // I don't like working with HTML elements so I converted to an array.
    selections = document.getElementsByClassName("selections")
    selection_array = Array.from(selections)
    for (let i in selection_array) {
        select(selection_array[i])
    }
}

findSeletedIds = () => {
    selections = document.getElementsByClassName("selections")
    selection_array = Array.from(selections)
    return (
        approvedList = selection_array.filter(selection => selection.dataset.box === "selected").map(selection => selection.dataset.id)
    )
}

approve = () => {
    return (approvePayroll(findSeletedIds()))
}

unselect = (element) => {
    element.setAttribute("data-box", "unselected")
    element.firstChild.nextElementSibling.className = "fa fa-square-o"
}

select = (element) => {
    element.setAttribute("data-box", `selected`)
    element.firstChild.nextElementSibling.className = "fa fa-check-square-o text-success"
}

toggleSelect = (e) => {
    if (e.dataset.box == "unselected") {
        select(e)
    } else {
        unselect(e)
    }
}


selectNone = () => {
    selections = document.getElementsByClassName("selections")
    selection_array = Array.from(selections)
    for (let i in selection_array) {
        unselect(selection_array[i])
    }
}