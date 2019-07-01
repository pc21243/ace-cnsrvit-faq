//= require dataTables/datatables.min.js
var dd, file_title, mm, today, yyyy;



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
file_title = 'ListOfProjectMembers_' + today;

$(function() {
    var table;
    table = $('.projectMemberTerms').DataTable({
        pageLength: 25,
        responsive: true,
        searching: false,
        info: false,
        paging: false,
        ordering: true,
        order: [1, 'asc'],
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [{
            extend: 'csv'
        }, {
            extend: 'excel',
            title: file_title
        }, {
            extend: 'pdf',
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
    $('.agreementsDataTables tbody td').on('dblclick', function() {
        var data;
        data = table.row(this).data();
        window.location = "/agreements/" + data[12];
    });
    $('.programs .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        switch (searchTerm) {
            case 'EPIC':
                $('.btn-group.EPICDivisions').removeClass('hide');
                $('.btn-group.CORPSDivisions').addClass('hide');
                break;
            case 'CORPS':
                $('.btn-group.CORPSDivisions').removeClass('hide');
                $('.btn-group.EPICDivisions').addClass('hide');
                break;
            case '':
                table.column(10).search('').draw();
                $('.btn-group.CORPSDivisions').addClass('hide');
                $('.btn-group.EPICDivisions').addClass('hide');
                break;
            default:
                $('.btn-group.CORPSDivisions').addClass('hide');
                $('.btn-group.EPICDivisions').addClass('hide');
        }
        table.column(0).search(searchTerm || '').draw();
    });
    $('.EPICDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(10).search(searchTerm || '').draw();
    });
    $('.CORPSDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(10).search(searchTerm || '').draw();
    });
});

$(function() {
    return $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target;
        target = $(e.target).attr('href');
        return setCookie("projectsTab", target, 5);
    });
});

$(function() {
    var neededTab, tabCookie;
    tabCookie = getCookie("projectsTab");
    if (typeof tabCookie === 'undefined') {

    } else {
        neededTab = $('a[href="' + tabCookie + '"]');
        return neededTab.tab('show');
    }
});
