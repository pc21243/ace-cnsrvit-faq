//setUnitsForAllMembers = () => {
//    let pwMemberUnits = $('td.pwm-iunits span');
//    let pwMemberHours = $("td.pwm-hours span");
//$.extend($.fn.editable.defaults, {
//    ajaxOptions: {
//        type: 'PUT',
//        dataType: 'json'
//    }
//});
//    pwMemberUnits.each(function(index) {
//       // $(this).editable('setValue', 1, true);
//        //$(this).editable('submit')
//    });
//    pwMemberHours.each(function(index) {
//        $(this).editable('setValue', 30, true);
//        $(this).editable('submit')
//
setUnitsForAllMembers = () => {
               $.ajax({
                    type: 'PUT',
                    url: window.location.href,
                    data: {
                        set_all_hours_units_defaults: true
                    },
                    dataType: 'json',
                    error: function(m) {
                        setDangerAlert("There was an error in completing your project setup, plase inform administrators")
                    },
                    success: function() {
                        setSuccessAlert("Week Member defaults have been set")
                        window.location = window.location.href
                    }
                });
                }
const gimmeUnits = document.getElementById("add-units")
    if(gimmeUnits){
       gimmeUnits.addEventListener("click", setUnitsForAllMembers)
    }

  function toggle(el, elClass = '') {
    toggleClass = elClass.length > 0 ? elClass : 'hidden'
    if (document.getElementById(el).classList.contains(toggleClass)) {
      document.getElementById(el).classList.remove(toggleClass);
    } else {
      document.getElementById(el).classList.add(toggleClass);
    }
  }
  let allDaElems = document.querySelectorAll(".add-time");
  allDaElems.forEach(function(elem) {
    elem.addEventListener("click", function() {
      console.log(elem.dataset.timesheet)
      toggle(elem.dataset.timesheet,'closed')
    });
  });
