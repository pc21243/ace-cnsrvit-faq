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

file_title = 'RecruitmentList_' + today;

$(function() {
    if ($('.trigger-user-modal')) {
        trigger = ($('.trigger-user-modal.choose-slot'))
        trigger.parent().find('a').trigger("click")
    }
    var table;
    table = $('.recruitmentssDataTables').DataTable({
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
                finish: "Submit Recruitment Request"
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
            onStepChanged: function(event, currentIndex, priorIndex) {
                var agency_id, form_data;
                if (currentIndex === 0) {} else if (currentIndex === 1) {
                    var grant, checkbox, state_code
                    state_code = document.getElementById("recruitment_work_state").value
                    checkbox = document.getElementById("this-is-americorps");
                    grant = document.getElementById("this-is-the-grant");
                    if (checkbox.checked == true) {
                        grant.classList.remove("hidden")
                        grant.required
                    } else {
                        grant.classList.add("hidden")
                    }
                    //FIXME DOUBLE CHECK THAT I WORK
                    $.ajax({
                        type: 'GET',
                        url: '/staff/workers_comp_codes/?utf8=✓&work_state=' + state_code,
                        dataType: 'json',
                        success: function(jsonData) {
                            var dropDown;
                            dropDown = $("#recruitment_workers_comp_code_id");
                            dropDown.empty();
                            console.log(jsonData)
                            dropDown.prop("selectedIndex", 0);
                            $.each(jsonData, function(key, value) {

                                return dropDown.append($('<option></option>').attr('value', value.id).text(value.description + " - " + value.code));
                            });
                        },
                        complete: function() {
                            $('#ajax-loading').hide();
                        }
                    });

                } else if (currentIndex === 2) {
                    $("#verify-start-date").val();
                    $("#verify-end-date").val();
                    $("#verify-recruiting-start").val();
                    $("#verify-recruiting-end").val();
                    $("#verify-slots").val();
                    $("#verify-division").val();
                    $("#verify-project").val();
                    $("#verify-grant").val();
                    $("#verify-title").val($("#recruitment_title input").val());
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
                'recruitments[division_id]': 'required'
            }
        });
        initializeDatepicker();

    });
}

// ---
// generated by coffee-script 1.9.2