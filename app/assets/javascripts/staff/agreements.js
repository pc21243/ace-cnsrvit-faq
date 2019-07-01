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

file_title = 'ListOfAgreements_' + today;

$(function() {
    var table;
    table = $('.agreementsDataTables').DataTable({
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
        table.column(12).search(searchTerm || '').draw();
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
    $.fn.typeahead.defaults = {
        items: 20
    };
    $('.cfdapick').editable({
        typeahead: {
            name: 'cfda_id',
            limit: 20,
            remote: $('.cfdapick').data("searchurl") + ".json?q=%QUERY",
            template: function(item) {
                return item.text;
            },
            valueKey: "text"
        }
    });
});

$(function() {
    $('.cfdapick [data-toggle="popover"]').on('hidden.bs.popover', function() {
        $('.twitter-typeahead').on('typeahead:selected', function(evt, item) {});
    });
});

$(function() {
    return $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target;
        target = $(e.target).attr('href');
        return setCookie("agreementsTab", target, 5);
    });
});

$(function() {
    var neededTab, tabCookie;
    tabCookie = getCookie("agreementsTab");
    if (typeof tabCookie === 'undefined') {

    } else {
        neededTab = $('a[href="' + tabCookie + '"]');
        return neededTab.tab('show');
    }
});

$(function() {
    if ($(".default-program-division").attr("data-programCode")) {
        var program = $(".default-program-division").attr("data-programCode");
        $('.btn-group.programs :input[value=' + program + ']').trigger("click");
        if ($(".default-program-division").attr("data-divisionCode").length > 0) {
            setTimeout(function() {
                btn = $('.btn-group.' + program + 'Divisions :input[value=' + $(".default-program-division").attr("data-divisionCode") + ']');
                console.log(btn);
                btn.trigger("click");
            }, 1000);
        }
    }
});

if ($('#form').length > 0) {
    $(function() {
        $('#form').steps({
            bodyTag: 'fieldset',
            forceMoveForward: true,
            labels: {
                finish: "Create Agreement"
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
                let agency, agencySelect, agency_id, americorps, division, divisionSelect, endDate, form_data, location, locationSelect, plc, reportingCycle, reportingCycleSelect, startDate, startYear, title;
                if (currentIndex === 2) {
                    title = form.querySelector('#agreement_title').value;
                    agencySelect = form.querySelector('#agreement_agency_id');
                    agency = agencySelect.options[agencySelect.selectedIndex].innerText;
                    divisionSelect = form.querySelector('#agreement_division_id');
                    division = divisionSelect.options[divisionSelect.selectedIndex].innerText;
                    startYear = form.querySelector('#agreement_start_year').value;
                    startDate = form.querySelector('#agreement_start_date_p').value;
                    endDate = form.querySelector('#agreement_end_date_p').value;
                    reportingCycleSelect = form.querySelector('#agreement_reporting_cycle');
                    reportingCycle = reportingCycleSelect.options[reportingCycleSelect.selectedIndex].innerText;
                    reportingStartDate = form.querySelector('#agreement_reporting_start_date_p').value;
                    locationSelect = form.querySelector('#agreement_location_id');
                    americorps = form.querySelector('#agreement_americorps').checked;
                    plc = form.querySelector('#agreement_plc').checked;
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
                    document.querySelector('#verify-reporting-start-date').textContent = reportingStartDate;
                    console.log("Americorps: " + americorps);
                    console.log("PLC: " + plc);
                    if (plc === true) {
                        document.querySelector('#verify-plc-true').classList.remove('hidden');
                        document.querySelector('#verify-plc-false').classList.add('hidden');
                    } else {
                        document.querySelector('#verify-plc-false').classList.remove('hidden');
                        document.querySelector('#verify-plc-true').classList.add('hidden');
                    }
                    if (americorps === true) {
                        document.querySelector('#verify-americorps-true').classList.remove('hidden');
                        document.querySelector('#verify-americorps-false').classList.add('hidden');
                    } else {
                        document.querySelector('#verify-americorps-false').classList.remove('hidden');
                        document.querySelector('#verify-americorps-true').classList.add('hidden');

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
    })
    initializeDatepicker();
}

updateLocationDropdown = (e) => {
    let agency_id
    document.getElementById('agreement_location_id').classList.remove("hidden")
    agency_id = e.options[e.selectedIndex].value
    $.ajax({
        type: 'GET',
        url: '/staff/agencies/' + agency_id + '.json?get_locations=true',
        dataType: 'json',
        success: function(jsonData) {
            var dropDown;
            dropDown = $("#agreement_location_id");
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

updateReportingDropdown = (e) => {
    let reportingCycle, agreementStartDate, reportingStartDate, uglyReportingStartDate
    document.getElementById('agreement_reporting_start_date_p').classList.remove("hidden")
    reportingCycle = e.options[e.selectedIndex].value
    document.getElementById('agreement_reporting_start_date').value = ""
    document.getElementById('agreement_reporting_start_date_p').value = ""
    agreementStartDate = document.getElementById('agreement_start_date_p').value
    if (reportingCycle === "quarter") {
        $.ajax({
            type: 'GET',
            url: `/dates?agreement_start_date=${agreementStartDate}`,
            dataType: 'json',
            success: function(jsonData) {
                document.getElementById('agreement_reporting_start_date').value = jsonData.report_due_date
                document.getElementById('agreement_reporting_start_date_p').value = jsonData.pretty_report_due_date
            },
            complete: function() {
                $('#ajax-loading').hide();
            }
        });
    }

}