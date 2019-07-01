const createSelectList = (el, data) => {
    removeSelectListOptions(el)
    createSelectListItem(el, "", "")
    for (let i = data.length - 1; i >= 0; i--) {
        let {
            text,
            value
        } = data[i]
        createSelectListItem(el, value, text)
    }
}

const createSelectListItem = (el, value, text) => {
    var opt = document.createElement('option')
    opt.appendChild(document.createTextNode(text))
    opt.value = value
    el.appendChild(opt)
}

const removeSelectListOptions = (el) => {
    for (let i = el.options.length - 1; i >= 0; i--) {
        el.remove(i);
    }
    el.innerHTML = ""
}

/*

let data = [{value: 1, text: 2}, {value: 2,text: 3}]
let el = document.getElementById("vehicle_division_id")
*/
