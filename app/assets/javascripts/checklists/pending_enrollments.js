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

file_title = 'PendingeGrantsEnrollments_' + today;

$(function() {
  var table;
  table = $('.enrollmentsDataTables').DataTable({
    pageLength: 25,
    responsive: true,
    ordering: true,
    order: [1, 'desc'],
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
      {
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
      }
    ]
  });
  $('.programs .btn').on('click', function() {
    var searchTerm;
    searchTerm = $(this).find('input').val();
    switch (searchTerm) {
      case 'EPIC':
        console.log("Hello World");
        $('.btn-group.epicDivisions').removeClass('hide');
        $('.btn-group.corpsDivisions').addClass('hide');
        break;
      case 'CORPS':
        $('.btn-group.corpsDivisions').removeClass('hide');
        $('.btn-group.epicDivisions').addClass('hide');
        break;
      case '':
        table.column(3).search('').draw();
        $('.btn-group.corpsDivisions').addClass('hide');
        $('.btn-group.epicDivisions').addClass('hide');
        break;
      default:
        $('.btn-group.corpsDivisions').addClass('hide');
        $('.btn-group.epicDivisions').addClass('hide');
    }
    table.column(3).search(searchTerm || '').draw();
  });
  $('.epicDivisions .btn').on('click', function() {
    var searchTerm;
    searchTerm = $(this).find('input').val();
    table.column(4).search(searchTerm || '').draw();
  });
  $('.corpsDivisions .btn').on('click', function() {
    var searchTerm;
    searchTerm = $(this).find('input').val();
    table.column(4).search(searchTerm || '').draw();
  });
  $('.selector').tooltip({
    content: 'Awesome title!'
  });
  return;
});
