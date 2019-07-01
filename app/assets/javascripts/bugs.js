document.addEventListener('DOMContentLoaded', function() {
    let role = document.getElementById("role").getAttribute("data-role")
    if (role !== "admin") {
        document.getElementsByClassName("checkbox")[0].classList.add("hidden")
        document.getElementsByClassName("checkbox")[0].firstElementChild.value = true
    }
}, false);