//= require dataTables/datatables.min.js
//= require library/tab_cookie.js
//= require library/card_cookie.js

// Member Tab Cookie
$(function() {
    return $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target, id;
        target = e.target.getAttribute("href")
        id = e.target.dataset.contactId
        return setCookie(`membersTab${id}`, target, 1);
    });
});

$(function() {
    var neededTab, tabCookie, id;
    id = window.location.href.split("/").pop();
    tabCookie = getCookie(`membersTab${id}`);
    if (typeof tabCookie === 'undefined') {

    } else {
        neededTab = $('a[href="' + tabCookie + '"]');
        return neededTab.tab('show');
    }
});

// Member Card Cookie
$(function() {
    return $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target, id;
        target = e.target.getAttribute("href")
        id = window.location.href.split("/").pop()
        return setCookie(`membersCard${id}`, target, 1);
    });
});

$(function() {
    var neededTab, tabCookie, id;
    id = window.location.href.split("/").pop();
    tabCookie = getCookie(`membersCard${id}`);
    if (typeof tabCookie === 'undefined') {

    } else {
        neededTab = $('a[href="' + tabCookie + '"]');
        return neededTab.tab('show');
    }
});

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
    table = $('.staffDataTables').DataTable({
        pageLength: 25,
        responsive: true,
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
    $('.programs .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        switch (searchTerm) {
            case 'EPIC':
                table.column(5).search('').draw();
                $('.btn-group.EPICDivisions').unbind('click').removeClass('hide active');
                $('.btn-group.CORPDivisions').addClass('hide');
                $('.btn-group.CENODivisions').addClass('hide');
                $('.btn-group.SPECDivisions').addClass('hide');
                break;
            case 'CORP':
                table.column(5).search('').draw();
                $('.btn-group.EPICDivisions').addClass('hide');
                $('.btn-group.CORPDivisions').removeClass('hide');
                $('.btn-group.CENODivisions').addClass('hide');
                $('.btn-group.SPECDivisions').addClass('hide');
                break;
            case 'CENO':
                table.column(5).search('').draw();
                $('.btn-group.EPICDivisions').addClass('hide');
                $('.btn-group.CORPDivisions').addClass('hide');
                $('.btn-group.CENODivisions').removeClass('hide');
                $('.btn-group.SPECDivisions').addClass('hide');
                break;
            case 'SPEC':
                table.column(5).search('').draw();
                $('.btn-group.EPICDivisions').addClass('hide');
                $('.btn-group.CORPDivisions').addClass('hide');
                $('.btn-group.CENODivisions').addClass('hide');
                $('.btn-group.SPECDivisions').removeClass('hide');
                break;
            case '':
                table.column(5).search('').draw();
                $('.btn-group.EPICDivisions').addClass('hide');
                $('.btn-group.CORPDivisions').addClass('hide');
                $('.btn-group.CENODivisions').addClass('hide');
                $('.btn-group.SPECDivisions').addClass('hide');
                break;
            default:
                $('.btn-group.EPICDivisions').addClass('hide');
                $('.btn-group.CORPDivisions').addClass('hide');
                $('.btn-group.CENODivisions').addClass('hide');
                $('.btn-group.SPECDivisions').addClass('hide');
        }
        table.column(4).search(searchTerm || '').draw();
    });
    $('.EPICDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(5).search(searchTerm || '').draw();
    });
    $('.CORPDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(5).search(searchTerm || '').draw();
    });
    $('.CENODivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(5).search(searchTerm || '').draw();
    });
    $('.SPECDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(5).search(searchTerm || '').draw();
    });
});