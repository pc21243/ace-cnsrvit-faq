//= require slick/slick.min.js
//= require dataTables/datatables.min.js




/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    console.log(d)
    // I'm just going to pass a whole div because why not?
    return '<div class="project-drop-down">'+
              '<div class="project-drop-down-details">'+
                  d.dropDownData +
              '</div>'+
            '</div>'

    //OLD and boring
    /*return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Pick Up Time:</td>'+
            '<td>'+d.pickupTime+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Project Description:</td>'+
            '<td>'+d.projectDescription+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Camping and Weather:</td>'+
            '<td>'+d.campingAndWeather+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Project Specific Notes:</td>'+
            '<td>'+d.projectSpecificNotes+'</td>'+
        '</tr>'+
    '</table>';*/
}


$(document).ready(function() {
    var table = $('#example').DataTable( {
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "status" },
            { "data": "overview" },
            { "data": "completionBar" },
            { "data": "siteContacts" },
            { "data": "dropDownData"},
        ],
        "order": [[1, 'asc']],
        order: false,
        columnDefs: [{
          targets: "_all",
          orderable: false
        }],
    } );

    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            console.log(`This is the row: ${row}`)
            console.log(`This is the data: ${row.data}`)
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
} );

$(function() {
  var table;
  table = $('.agreementsDataTables').DataTable({
    pageLength: 25,
    responsive: true,
    ordering: true,
    order: [1, 'asc'],
    dom: '<"html5buttons"B>lTfgitp',
  });
});
