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
const file_title = `expense_list_${today}`;


$(function() {
    const table = $('.expensesDataTables').DataTable({
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


    $('.programs .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        switch (searchTerm) {
            case 'EPIC':
                table.column(1).search('').draw();
                $('.btn-group.EPICDivisions').unbind('click').removeClass('hide active');
                $('.btn-group.CORPDivisions').addClass('hide');
                $('.btn-group.CENODivisions').addClass('hide');
                $('.btn-group.SPECDivisions').addClass('hide');
                break;
            case 'CORP':
                table.column(1).search('').draw();
                $('.btn-group.EPICDivisions').addClass('hide');
                $('.btn-group.CORPDivisions').removeClass('hide');
                $('.btn-group.CENODivisions').addClass('hide');
                $('.btn-group.SPECDivisions').addClass('hide');
                break;
            case 'CENO':
                table.column(1).search('').draw();
                $('.btn-group.EPICDivisions').addClass('hide');
                $('.btn-group.CORPDivisions').addClass('hide');
                $('.btn-group.CENODivisions').removeClass('hide');
                $('.btn-group.SPECDivisions').addClass('hide');
                break;
            case 'SPEC':
                table.column(1).search('').draw();
                $('.btn-group.EPICDivisions').addClass('hide');
                $('.btn-group.CORPDivisions').addClass('hide');
                $('.btn-group.CENODivisions').addClass('hide');
                $('.btn-group.SPECDivisions').removeClass('hide');
                break;
            case '':
                table.column(1).search('').draw();
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

});



if ($('#form').length > 0) {
    $(function() {
        $('#form').steps({
            bodyTag: 'fieldset',
            forceMoveForward: true,
            labels: {
                finish: "Create Expense"
            },
            onStepChanging: function(event, currentIndex, newIndex) {
                var form;
                form = void 0;
                if (currentIndex > newIndex) {
                    return true;
                }
                form = $(this);
                console.log(form);
                if (currentIndex < newIndex) {
                    $('.body:eq(' + newIndex + ') label.error', form).remove();
                    $('.body:eq(' + newIndex + ') .error', form).removeClass('error');
                }
                form.validate().settings.ignore = ':disabled,:hidden';
                return form.valid();
            },
            onStepChanged: function(event, currentIndex, priorIndex) {
                var category, categorySelect, endDate, reimbursement, startDate, unitCost, units, reimbursementBoolean
                if (currentIndex === 2) {
                    categorySelect = form.querySelector('#expense_category');
                    category = categorySelect.options[categorySelect.selectedIndex].innerText;
                    units = form.querySelector('#expense_units').value;
                    endDate = form.querySelector('#expense_end_date_p').value;
                    startDate = form.querySelector('#expense_start_date_p').value;
                    unitCost = form.querySelector('#expense_unit_cost').value;
                    reimbursementBoolean = form.querySelector('#expense_reimbursement').checked;
                    document.querySelector('#category').textContent = category;
                    document.querySelector('#startDate').textContent = startDate;
                    document.querySelector('#endDate').textContent = endDate;
                    document.querySelector('#units').textContent = units;
                    document.querySelector('#unitCost').textContent = unitCost;
                    document.querySelector('#reimbursement').textContent = reimbursementBoolean;
                }
            },
            onFinishing: function(event, currentIndex) {
                var form;
                form = void 0;
                form = $(this);
                form.validate().settings.ignore = ':disabled';
                return form.valid();
            },
            onFinished: function(event, currentIndex) {
                var form;
                form = void 0;
                form = $(this);
                form.submit();
            }
        }).validate({
            errorPlacement: function(error, element) {
                element.before(error);
            },
            rules: {
                start_year: 'required',
                division_id: 'required'
            }
        });
    });
}
