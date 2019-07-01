var category, expiration, expirationNeeded, expiration_wrapper, requiredText

requiredText = `<abbr title="required">*</abbr> Expiration Date`
category = document.getElementById("member_identification_category")
expiration = document.getElementById("member_identification_expiration_p")
expirationNeeded = ["drivers_license", "passport", "state", "foreign_drivers_license"]
expirationWrapper = document.getElementById("expiration_wrapper")

isExpirationNeeded = (category) => {
    return expirationNeeded.includes(category)
}

expirationWrapper.firstChild.innerHTML = requiredText

hideExpirationDate = () => {
    expirationWrapper.classList.add("hidden")
    expirationWrapper.classList.add("required")
    expiration.required = false
    expirationWrapper.firstChild.classList.add("required")
    expirationWrapper.firstChild.classList.remove("optional")
    expiration.value = ""
}

showExpirationDate = () => {
    expirationWrapper.classList.remove("hidden")
    expirationWrapper.classList.remove("required")
    expiration.required = true
    expirationWrapper.firstChild.classList.remove("required")
    expirationWrapper.firstChild.classList.add("optional")
}

category.addEventListener("change", () => {
    if (isExpirationNeeded(category.value)) {
        showExpirationDate()
    } else {
        hideExpirationDate()
    }
})