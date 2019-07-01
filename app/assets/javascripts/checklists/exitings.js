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
const file_title = `exiting_${today}`;


$(function() {
  const table = $('.exitingsDataTables').DataTable({
    pageLength: 25,
    responsive: true,
    ordering: true,
    order: [0, 'asc'],
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
      { extend: 'csv' },
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
    ]});


    $('.programs .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      switch (searchTerm) {
        case 'EPIC':
          table.column(3).search('').draw();
          $('.btn-group.EPICDivisions').unbind('click').removeClass('hide active');
          $('.btn-group.CORPDivisions').addClass('hide');
          $('.btn-group.CENODivisions').addClass('hide');
          $('.btn-group.SPECDivisions').addClass('hide');
          break;
        case 'CORP':
          table.column(3).search('').draw();
          $('.btn-group.EPICDivisions').addClass('hide');
          $('.btn-group.CORPDivisions').removeClass('hide');
          $('.btn-group.CENODivisions').addClass('hide');
          $('.btn-group.SPECDivisions').addClass('hide');
          break;
        case 'CENO':
          table.column(3).search('').draw();
          $('.btn-group.EPICDivisions').addClass('hide');
          $('.btn-group.CORPDivisions').addClass('hide');
          $('.btn-group.CENODivisions').removeClass('hide');
          $('.btn-group.SPECDivisions').addClass('hide');
          break;
        case 'SPEC':
          table.column(3).search('').draw();
          $('.btn-group.EPICDivisions').addClass('hide');
          $('.btn-group.CORPDivisions').addClass('hide');
          $('.btn-group.CENODivisions').addClass('hide');
          $('.btn-group.SPECDivisions').removeClass('hide');
          break;
        case '':
          table.column(3).search('').draw();
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
      table.column(2).search(searchTerm || '').draw();
    });
    $('.EPICDivisions .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      table.column(3).search(searchTerm || '').draw();
    });
    $('.CORPDivisions .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      table.column(3).search(searchTerm || '').draw();
    });
    $('.CENODivisions .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      table.column(3).search(searchTerm || '').draw();
    });
    $('.SPECDivisions .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      table.column(3).search(searchTerm || '').draw();
    });

});
