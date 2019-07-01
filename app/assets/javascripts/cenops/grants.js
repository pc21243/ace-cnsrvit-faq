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

file_title = 'GrantsOverview_' + today;

$(function() {
    var table;
    table = $('.grantsDataTables').DataTable({
        pageLength: 25,
        responsive: true,
        bPaginate: false,
        ordering: true,
        bFilter: false,
        order: [3, 'desc'],
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
    return;
});

if ($('#form').length > 0) {
    $(function() {
        $('#form').steps({
            bodyTag: 'fieldset',
            forceMoveForward: true,
            labels: {
                finish: "Submit"
            },
            onStepChanging: function(event, currentIndex, newIndex) {
                var form;
                form = void 0;
                if (currentIndex > newIndex) {
                    return true;
                }
                form = $(this);
                if (currentIndex < newIndex) {
                    $('.body:eq(' + newIndex + ') label.error', form).remove();
                    $('.body:eq(' + newIndex + ') .error', form).removeClass('error');
                }
                form.validate().settings.ignore = ':disabled,:hidden';
                return form.valid();
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
            }
        });
    })
    initializeDatepicker();
}