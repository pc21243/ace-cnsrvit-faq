//= require dataTables/datatables.min.js

var cfda_display, dd, file_title, mm, today, yyyy;

cfda_display = function() {
    $(".cfdapick").html($(".cfdapick").data("display"));
};

$(function() {
    return cfda_display();
});

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

file_title = 'ListOfMasterAgreements_' + today;

$(function() {
    var table;
    table = $('.masterAgreementsDataTables').DataTable({
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
});




if ($('#form').length > 0) {
    $(function() {
        $('#form').steps({
            bodyTag: 'fieldset',
            forceMoveForward: true,
            labels: {
                finish: "Create Master Agreement"
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
                var agency, agencySelect, agency_id, americorps, division, divisionSelect, endDate, form_data, location, locationSelect, plc, reportingCycle, reportingCycleSelect, startDate, startYear, title;
                if (currentIndex === 2) {
                    title = form.querySelector('#agreement_title').value;
                    agencySelect = form.querySelector('#agreement_agency_id');
                    agency = agencySelect.options[agencySelect.selectedIndex].innerText;
                    divisionSelect = form.querySelector('#agreement_division_id');
                    division = divisionSelect.options[divisionSelect.selectedIndex].innerText;
                    startYear = form.querySelector('#agreement_start_year').value;
                    startDate = form.querySelector('#agreement_start_date').value;
                    endDate = form.querySelector('#agreement_end_date').value;
                    reportingCycleSelect = form.querySelector('#agreement_reporting_cycle');
                    reportingCycle = reportingCycleSelect.options[reportingCycleSelect.selectedIndex].innerText;
                    locationSelect = form.querySelector('#agreement_location_id');
                    americorps = form.querySelector('#agreement_americorps').value;
                    plc = form.querySelector('#agreement_plc').value;
                    if (locationSelect.length > 0) {
                        location = locationSelect.options[locationSelect.selectedIndex].innerText;
                        document.querySelector('#verify-location').textContent = location;
                    }
                    console.log(startDate + " to " + endDate);
                    document.querySelector('#verify-title').textContent = title;
                    document.querySelector('#verify-agency').textContent = agency;
                    document.querySelector('#verify-division').textContent = division;
                    document.querySelector('#verify-start-year').textContent = startYear;
                    document.querySelector('#verify-start-date').textContent = startDate;
                    document.querySelector('#verify-end-date').textContent = endDate;
                    document.querySelector('#verify-reporting-cycle').textContent = reportingCycle;
                    console.log("Americorps: " + americorps);
                    console.log("PLC: " + plc);
                    if (plc === true) {
                        document.querySelector('#verify-plc-true').classList.remove('hidden');
                    } else {
                        document.querySelector('#verify-plc-false').classList.add('hidden');
                    }
                    if (americorps === true) {
                        document.querySelector('#verify-americorps-true').classList.remove('hidden');
                    } else {
                        document.querySelector('#verify-americorps-false').classList.add('hidden');
                    }
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
        initializeDatepicker();

    });

}

updateLocationDropdown = (e) => {
    let agency_id
    document.getElementById('master_agreement_location_id').classList.remove("hidden")
    agency_id = e.options[e.selectedIndex].value
    $.ajax({
        type: 'GET',
        url: '/staff/agencies/' + agency_id + '.json?get_locations=true',
        dataType: 'json',
        success: function(jsonData) {
            var dropDown;
            dropDown = $("#master_agreement_location_id");
            dropDown.empty();
            dropDown.prop("selectedIndex", 0);
            $.each(jsonData, function(key, value) {
                return dropDown.append($('<option></option>').attr('value', value.id).text(value.code + ": " + value.title));
            });
        },
        complete: function() {
            $('#ajax-loading').hide();
        }
    });
}