//= require dataTables/datatables.min.js


let today = new Date;
let dd = today.getDate();
//January is 0!
let mm = today.getMonth() + 1;
const yyyy = today.getFullYear();
//Add a leading zero to the day and month if needed
if (dd < 10) {
    dd = `0${dd}`;
}
if (mm < 10) {
    mm = `0${mm}`;
}
today = mm + '.' + dd + '.' + yyyy;
const file_title = `division_financial_list_${today}`;


$(function() {
    const table = $('.divFinDataTables').DataTable({
        pageLength: 25,
        responsive: true,
        ordering: true,
        order: [0, 'asc'],
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [{
                extend: 'csv'
            },
            {
                extend: 'excel',
                title: file_title
            },
            {
                extend: 'pdf',
                title: file_title
            },
            {
                extend: 'print',
                customize(win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                }

            }
        ]
    });


    $('.year-filter .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        table.column(3).search(searchTerm || '').draw();
    });

});


$(function() {

});
