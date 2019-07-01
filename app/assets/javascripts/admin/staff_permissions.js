//= require steps/jquery.steps.min.js
//= require validate/jquery.validate.min.js
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

file_title = 'ListOfStaffPermissions_' + today;

$(function() {
    var table;
    table = $('.usersDataTables').DataTable({
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
    cfda_display = function() {
        $(".cfdapick").html($(".cfdapick").data("display"));
    };
    $('.programs .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        switch (searchTerm) {
            case 'EPIC':
                table.column(11).search('').draw();
                $('.btn-group.EPICDivisions').unbind('click').removeClass('hide active');
                $('.btn-group.CORPDivisions').addClass('hide');
                $('.btn-group.CENODivisions').addClass('hide');
                $('.btn-group.SPECDivisions').addClass('hide');
                break;
            case 'CORP':
                table.column(11).search('').draw();
                $('.btn-group.EPICDivisions').addClass('hide');
                $('.btn-group.CORPDivisions').removeClass('hide');
                $('.btn-group.CENODivisions').addClass('hide');
                $('.btn-group.SPECDivisions').addClass('hide');
                break;
            case 'CENO':
                table.column(11).search('').draw();
                $('.btn-group.EPICDivisions').addClass('hide');
                $('.btn-group.CORPDivisions').addClass('hide');
                $('.btn-group.CENODivisions').removeClass('hide');
                $('.btn-group.SPECDivisions').addClass('hide');
                break;
            case 'SPEC':
                table.column(11).search('').draw();
                $('.btn-group.EPICDivisions').addClass('hide');
                $('.btn-group.CORPDivisions').addClass('hide');
                $('.btn-group.CENODivisions').addClass('hide');
                $('.btn-group.SPECDivisions').removeClass('hide');
                break;
            case '':
                table.column(11).search('').draw();
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
        table.column(10).search(searchTerm || '').draw();
    });
    $('.EPICDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(11).search(searchTerm || '').draw();
    });
    $('.CORPDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(11).search(searchTerm || '').draw();
    });
    $('.CENODivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(11).search(searchTerm || '').draw();
    });
    $('.SPECDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(11).search(searchTerm || '').draw();
    });
});


$(function() {

    $("#wizard").steps();
    $("#form").steps({
        bodyTag: "fieldset",
        onStepChanging: function(event, currentIndex, newIndex) {
            // Always allow going backward even if the current step contains invalid fields!
            if (currentIndex > newIndex) {
                return true;
            }

            // Forbid suppressing "Warning" step if the user is to young
            if (newIndex === 3 && Number($("#age").val()) < 18) {
                return false;
            }

            var form = $(this);

            // Clean up if user went backward before
            if (currentIndex < newIndex) {
                // To remove error styles
                $(".body:eq(" + newIndex + ") label.error", form).remove();
                $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
            }

            // Disable validation on fields that are disabled or hidden.
            form.validate().settings.ignore = ":disabled,:hidden";

            // Start validation; Prevent going forward if false
            return form.valid();
        },
        onStepChanged: function(event, currentIndex, priorIndex) {
            // Suppress (skip) "Warning" step if the user is old enough.
            if (currentIndex === 2 && Number($("#age").val()) >= 18) {
                $(this).steps("next");
            }

            // Suppress (skip) "Warning" step if the user is old enough and wants to the previous step.
            if (currentIndex === 2 && priorIndex === 3) {
                $(this).steps("previous");
            }
        },
        onFinishing: function(event, currentIndex) {
            var form = $(this);

            // Disable validation on fields that are disabled.
            // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
            form.validate().settings.ignore = ":disabled";

            // Start validation; Prevent form submission if false
            return form.valid();
        },
        onFinished: function(event, currentIndex) {
            var form = $(this);

            // Submit form input
            form.submit();
        }
    }).validate({
        errorPlacement: function(error, element) {
            element.before(error);
        },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });
    initializeDatepicker();
});

$(function() {
    $("form.edit_user").validate({
        rules: {
            role: {
                required: true
            },
            staff_division_id: {
                required: function(element) {
                    return $("#user_role option:selected").text() == ("Division" || "Program" || "Member");
                }
            },
            staff_program_id: {
                required: function(element) {
                    return $("#user_contact_attributes_staff_division_id").val().length > 0
                }
            },
            "user[access_end_date_p]": {
                required: true,
            },
            "user[access_start_date_p]": {
                required: true,
            }
        },
        messages: {
            "user[access_start_date_p]": {
                required: "Must set login access start date",
            },
            "user[access_end_date_p]": {
                required: "Must set login access end date",
            },

            phone_number: {
                required: "this field is required"
            },
            recipient_name: {
                required: "Enter recipient name",
                minlength: "Name should be at least {0} characters long" // <-- removed underscore
            }
        }
    });
});