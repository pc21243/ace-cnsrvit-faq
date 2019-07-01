//= require dataTables/datatables.min.js
//= require library/invoice_items_remove.js
//= require library/invoice_items_add.js


$(function() {
  if ($('#form').length) {
    $('#form').steps({
      bodyTag: 'fieldset',
      forceMoveForward: true,
      labels: {
        finish: "Create Invoice"
      },
      onStepChanging: function(event, currentIndex, newIndex) {
        var form;
        if (currentIndex > newIndex) {
          return true;
        }
        if (newIndex === 3 && Number($('#age').val()) < 18) {
          return false;
        }
        form = $(this);
        if (currentIndex < newIndex) {
          $('.body:eq(' + newIndex + ') label.error', form).remove();
          $('.body:eq(' + newIndex + ') .error', form).removeClass('error');
        }
        form.validate().settings.ignore = ':disabled,:hidden';
        return form.valid();
      },
      onStepChanged: function(event, currentIndex, priorIndex) {
        var final, division, divisionSelect, endDate, period;
        if (currentIndex === 1) {
          if ($('#invoice_final').is(":checked")) {
            final = "Yes"
          } else {
            final = "No"
          }
          division = $("#invoice_division_id option:selected").text();
          endDate = $('.invoice_end_date_p input').val();
          billing = $("#invoice_billing_id option:selected").text();
          period = $("#invoice_marking_period_2i option:selected").text() + " " + $("#invoice_marking_period_1i option:selected").text();
          $("#final").text(final);
          $("#division").text(division);
          $("#endDate").text(endDate);
          $("#period").text(period);
          $("#billing-contact").text(billing);
        }
      },
      onFinishing: function(event, currentIndex) {
        var form;
        form = $(this);
        form.validate().settings.ignore = ':disabled';
        return form.valid();
      },
      onFinished: function(event, currentIndex) {
        var form;
        form = $(this);
        form.submit();
      }
    }).validate({
      errorPlacement: function(error, element) {
        element.before(error);
      },
      rules: {
        confirm: {
          equalTo: '#password'
        }
      }
    });
    initializeDatepicker();

  }
});



$(function() {
  $.fn.typeahead.defaults = {
    items: 20
  };
  // $('.cfdapick').editable({
  //   typeahead: {
  //     name: 'cfda_id',
  //     limit: 20,
  //     remote: $('.cfdapick').data("searchurl") + ".json?q=%QUERY",
  //     template: function(item) {
  //       return item.text;
  //     },
  //     valueKey: "text"
  //   }
  // });
});

//Below is for the index view
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
const file_title = `quarterly_invoices_${today}`;

jQuery.fn.dataTable.Api.register('sum()', function() {
  return this.flatten().reduce(function(a, b) {
    if (typeof a === 'string') {
      a = a.replace(/[^\d.-]/g, '') * 1;
    }
    if (typeof b === 'string') {
      b = b.replace(/[^\d.-]/g, '') * 1;
    }

    return a + b;
  }, 0);
});

listInvoicesTotaled = document.getElementById('invoices-totaled')

if (listInvoicesTotaled) {
  $(function() {
    const table = $('.quarterlyInvoices').DataTable({
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
    summary = table.column(11).data().sum();
    document.getElementById('invoices-totaled').innerHTML = `TOTAL: $${currencyWithCommas(summary.toFixed(2))}`

    $('.programs .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      switch (searchTerm) {
        case 'EPIC':
          table.column(0).search('').draw();
          $('.btn-group.EPICDivisions').unbind('click').removeClass('hide active');
          $('.btn-group.CORPDivisions').addClass('hide');
          $('.btn-group.CENODivisions').addClass('hide');
          $('.btn-group.SPECDivisions').addClass('hide');
          break;
        case 'CORP':
          table.column(0).search('').draw();
          $('.btn-group.EPICDivisions').addClass('hide');
          $('.btn-group.CORPDivisions').removeClass('hide');
          $('.btn-group.CENODivisions').addClass('hide');
          $('.btn-group.SPECDivisions').addClass('hide');
          break;
        case 'CENO':
          table.column(0).search('').draw();
          $('.btn-group.EPICDivisions').addClass('hide');
          $('.btn-group.CORPDivisions').addClass('hide');
          $('.btn-group.CENODivisions').removeClass('hide');
          $('.btn-group.SPECDivisions').addClass('hide');
          break;
        case 'SPEC':
          table.column(0).search('').draw();
          $('.btn-group.EPICDivisions').addClass('hide');
          $('.btn-group.CORPDivisions').addClass('hide');
          $('.btn-group.CENODivisions').addClass('hide');
          $('.btn-group.SPECDivisions').removeClass('hide');
          break;
        case '':
          table.column(0).search('').draw();
          $('.btn-group.EPICDivisions').addClass('hide');
          $('.btn-group.CORPDivisions').addClass('hide');
          $('.btn-group.CENODivisions').addClass('hide');
          $('.btn-group.SPECDivisions').addClass('hide');
          break;
        default:
          summary = table.column(11).data().sum();
          document.getElementById('invoices-totaled').innerHTML = `TOTAL: $${currencyWithCommas(summary.toFixed(2))}`
          $('.btn-group.EPICDivisions').addClass('hide');
          $('.btn-group.CORPDivisions').addClass('hide');
          $('.btn-group.CENODivisions').addClass('hide');
          $('.btn-group.SPECDivisions').addClass('hide');
      }
      table.column(0).search(searchTerm || '').draw();
    });
    $('.EPICDivisions .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      table.column(1).search(searchTerm || '').draw();
    });
    $('.CORPDivisions .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      table.column(1).search(searchTerm || '').draw();
    });
    $('.CENODivisions .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      table.column(1).search(searchTerm || '').draw();
    });
    $('.SPECDivisions .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      table.column(1).search(searchTerm || '').draw();
    });

    $('.status .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      table.column(3).search(searchTerm || '').draw();
    });

    $('.payment-type .btn').on('click', function() {
      var searchTerm;
      searchTerm = $(this).find('input').val();
      table.column(14).search(searchTerm || '').draw();
    });

    $(".quarterlyInvoices").on('search.dt', function() {
      summary = table.column(11, {
        "filter": "applied"
      }).data().sum()
      document.getElementById('invoices-totaled').innerHTML = `TOTAL: $${currencyWithCommas(summary.toFixed(2))}`
    });
  });
}
$(function() {
  $('.only-month').editable({
    pk: 1,
    format: 'mm',
    viewformat: 'mm',
    datepicker: {
      onChangeMonthYear: function(year, month, inst) {
        $(this).datepicker('setDate', new Date(year, month - 1, 1));
      }
    }
  });
});
