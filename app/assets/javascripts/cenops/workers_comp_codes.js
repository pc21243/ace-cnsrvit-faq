//= require dataTables/datatables.min.js

var cfda_display, dd, file_title, mm, today, yyyy;

cfda_display = function() {
    $(".cfdapick").html($(".cfdapick").data("display"));
};

$(function() {
    return cfda_display();
});

today = new Date;
dd = today.getDate();
mm = today.getMonth() + 1;
yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

today = mm + '.' + dd + '.' + yyyy;

file_title = 'ListOfAgreements_' + today;

$(function() {
    var table;
    table = $('.wcDataTables').DataTable({
        pageLength: 25,
        responsive: false,
        ordering: true,
        order: [1, 'asc'],
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [{
            extend: 'csv'
        }, {
            extend: 'excel',
            title: file_title
        }, {
            extend: 'print',
            customize: function(win) {
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
            }
        }]
    });


});


$(function() {
    var neededTab, tabCookie;
    tabCookie = getCookie("agreementsTab");
    if (typeof tabCookie === 'undefined') {

    } else {
        neededTab = $('a[href="' + tabCookie + '"]');
        return neededTab.tab('show');
    }
});

$(function() {
    if ($(".default-program-division").attr("data-programCode")) {
        var program = $(".default-program-division").attr("data-programCode");
        $('.btn-group.programs :input[value=' + program + ']').trigger("click");
        if ($(".default-program-division").attr("data-divisionCode").length > 0) {
            setTimeout(function() {
                btn = $('.btn-group.' + program + 'Divisions :input[value=' + $(".default-program-division").attr("data-divisionCode") + ']');
                console.log(btn);
                btn.trigger("click");
            }, 1000);
        }
    }
});