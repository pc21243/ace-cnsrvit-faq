//= require dataTables/datatables.min.js


// Member Tab Cookie
$(function() {
    return $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target, id;
        target = e.target.getAttribute("href")
        id = e.target.dataset.contactId
        return setCookie(`membersTab${id}`, target, 1);
    });
});

$(function() {
    var neededTab, tabCookie, id;
    id = window.location.href.split("/").pop();
    tabCookie = getCookie(`membersTab${id}`);
    if (typeof tabCookie === 'undefined') {

    } else {
        neededTab = $('a[href="' + tabCookie + '"]');
        return neededTab.tab('show');
    }
});


let cfda_display, dd, file_title, mm, today, yyyy;

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

file_title = 'ListOfMembers_' + today;

$(function() {
    $('.membersDataTables').DataTable({
        pageLength: 25,
        responsive: true,
        ordering: true,
        order: [1, 'asc'],
        columnDefs: [{
            searchable: false,
            orderable: false,
            targets: 'edit'
        }],
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [{
                extend: 'csv'
            }, {
                extend: 'excel',
                title: file_title
            },
            {
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
                table.column(10).search('').draw();
                $('.btn-group.EPICDivisions').removeClass('hide');
                $('.btn-group.CORPSDivisions').addClass('hide');
                break;
            case 'CORPS':
                table.column(10).search('').draw();
                $('.btn-group.CORPSDivisions').unbind("click").removeClass('hide');
                $('.btn-group.EPICDivisions').addClass('hide');
                break;
            case '':
                table.column(10).search('').draw();
                $('.btn-group.CORPSDivisions').addClass('hide');
                $('.btn-group.EPICDivisions').addClass('hide');
                break;
            default:
                $('.btn-group.CORPSDivisions').addClass('hide');
                $('.btn-group.EPICDivisions').addClass('hide');
        }
        table.column(0).search(searchTerm || '').draw();
    });
    $('.EPICDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(10).search(searchTerm || '').draw();
    });
    $('.CORPSDivisions .btn').on('click', function() {
        var searchTerm;
        searchTerm = $(this).find('input').val();
        table.column(10).search(searchTerm || '').draw();
    });
});

$(function() {
    return $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target, id;

        target = $(e.target).attr('href');
        id = $(e.target).data('contact-id');
        return setCookie(`membersTab${id}`, target, 1);
    });
});

$(function() {
    var neededTab, tabCookie, id;
    id = window.location.href.split("/").pop();
    tabCookie = getCookie(`membersTab${id}`);
    if (typeof tabCookie === 'undefined') {

    } else {
        neededTab = $('a[href="' + tabCookie + '"]');
        return neededTab.tab('show');
    }
});

if ($('#form').length > 0) {
    $(function() {
        $('#form').steps({
            bodyTag: 'fieldset',
            forceMoveForward: true,
            labels: {
                finish: "Create Partner Contact"
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
                if (currentIndex === 1) {
                    agency_id = $("#user_contact_attributes_partners_attributes_0_agency_id").val();
                    console.log(agency_id);
                    form_data = $("form").serialize();
                    $.ajax({
                        type: 'GET',
                        url: '/staff/agencies/' + agency_id + '.json?get_locations=true',
                        dataType: 'json',
                        success: function(jsonData) {
                            var dropDown;
                            dropDown = $("#user_contact_attributes_partners_attributes_0_location_id");
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
                } else if (currentIndex === 3) {
                    //future verify stuff
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
    initializeDatepicker();
}