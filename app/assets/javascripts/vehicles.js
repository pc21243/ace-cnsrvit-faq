//= require jeditable/jquery.jeditable.js
//= require dataTables/datatables.min.js



var content, dataRemote, dd, file_title, loader, mm, modal, paintIt, title, today, toolbar, yyyy;
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

file_title = 'ListOfVehicles_' + today;

$(function() {
    var table;
    table = $('.vehicleList').DataTable({
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
                $('.btn-group.EPICDivisions').removeClass('hide');
                $('.btn-group.CORPSDivisions').addClass('hide');
                break;
            case 'CORPS':
                $('.btn-group.CORPSDivisions').removeClass('hide');
                $('.btn-group.EPICDivisions').addClass('hide');
                break;
            case '':
                table.column(7).search('').draw();
                $('.btn-group.CORPSDivisions').addClass('hide');
                $('.btn-group.EPICDivisions').addClass('hide');
                break;
            default:
                $('.btn-group.CORPSDivisions').addClass('hide');
                $('.btn-group.EPICDivisions').addClass('hide');
        }
        table.column(6).search(searchTerm || '').draw();
    });
    $('.EPICDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(7).search(searchTerm || '').draw();
    });
    $('.CORPSDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(7).search(searchTerm || '').draw();
    });
});

/* This is modal stuff; we may need it again.
title = '.modal-title';

loader = '.ajax-loader';

content = '.modal-body';

dataRemote = 'a[data-remote=true]';

toolbar = 'div.modal-footer';

modal = '#ajax-modal';

$(title).html('Add New Vehicle');

$(content).html('');

$(content).html('#{j render("/vehicles/new") }');
*/
if ($('#form').length > 0) {
    $(function() {
        $('#form').steps({
            bodyTag: 'fieldset',
            autoFocus: true,
            forceMoveForward: true,
            onStepChanging: function(event, currentIndex, newIndex) {
                var form;
                form = $("#form");
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid();
            },
            onStepChanged: function(event, currentIndex, priorIndex) {
                console.log(currentIndex);
                if (currentIndex === 2) {
                    $.ajax({
                        type: 'GET',
                        url: '/vehicles?vin=' + $("#vehicle_vin").val(),
                        dataType: 'json',
                        success: function(jsonData) {
                            var parent;
                            console.log(jsonData);
                            parent = '#vehicle-data-insert';
                            console.log(jsonData.vehicle.make);
                            if (jsonData.error != "Requires valid VIN") {
                                document.querySelector('#makeInput').value = jsonData.vehicle.make
                                document.querySelector('#modelInput').value = jsonData.vehicle.model
                                document.querySelector('#yearInput').value = jsonData.vehicle.year
                                document.querySelector('#descriptionInput').value = jsonData.vehicle.description_class
                            }
                            // console.log(document.querySelector('#makeInput').value)
                        },
                        error: function() {}
                    });
                };

            },
            onFinishing: function(event, currentIndex) {
                var form;
                form = void 0;
                form = $(this);
                form.validate().settings.ignore = ':disabled';
                return form.valid();
            },
            error: function() {},
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
                'vehicle[vin]': 'required',
                'vehicle[division_id]': 'required',
                'vehicle[license_plate_number]': 'required',
                'vehicle[make]': 'required',
                'vehicle[model]': 'required',
                'vehicle[year]': 'required',
                'vehicle[status]': 'required',
                'vehicle[description_class]': 'required'
            },
            messages: {
                'vehicle[vin]': "You must enter a VIN",
                'vehicle[division_id]': "You must select a Program & Division",
                'vehicle[license_plate_number]': "You must enter a tag number",
                'vehicle[make]': "You must enter a vehicle make",
                'vehicle[model]': "You must enter a vehicle model",
                'vehicle[year]': "You must enter a vehicle year",
                'vehicle[status]': "You must state the status of this vehicle",
                'vehicle[description_class]': "You must have a vehicle body class"
            }
        });
        initializeDatepicker();

    });


}




// ---
// generated by coffee-script 1.9.2