// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery/jquery-3.1.1.min.js
//= require jquery_ujs
//= jquery3
//= require popper
//= require bootstrap-sprockets
//= require cocoon
//= require modal
//= require metisMenu/jquery.metisMenu.js
//= require pace/pace.min.js
//= require peity/jquery.peity.min.js
//= require iCheck/icheck.min
//= require slimscroll/jquery.slimscroll.min.js
//= require inspinia.js
//= require editable/bootstrap-editable
//= require editable/inputs-ext/typeahead
//= require editable/inputs-ext/typeahead-editable
//= require editable/rails
//= require validate/jquery.validate.min.js
//= require library/xeditable-radiolist
//= require datepicker-defaults.js
//= require editable/inputs-ext/wysihtml5
//= require editable/inputs-ext/bootstrap-wysihtml5
//= require editable/inputs-ext/wysihtml5-editable
//= require fullcalendar/moment.min.js
//= require library/xeditable
//= require library/js_helpers
//= require library/status_badges
//= require library/alerts.js
//= require library/dates.js
//= require library/spinners.js
//= require library/create_select_list.js

// universally, we will need access to cookie functions
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function formatUsPhone(phone) {
    var phoneFormat = new RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/);
    phone = phone.trim();
    var results = phoneFormat.exec(phone);
    if (results !== null && results.length > 8) {
        return "(" + results[3] + ") " + results[4] + "-" + results[5] + (typeof results[8] !== "undefined" ? " x" + results[8] : "");
    } else {
        return phone;
    }
}


$(document).ready(function() {
    setTimeout(function() {
        $('.alert').remove();
    }, 3000);
})

$.fn.removeClassLike = function(name) {
    return this.removeClass(function(index, css) {
        return (css.match(new RegExp('\\b(' + name + '\\S*)\\b', 'g')) || []).join(' ');
    });
};
