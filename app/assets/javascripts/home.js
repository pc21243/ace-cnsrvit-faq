//= require chartjs/Chart.min.js
//= require morris/morris.js
//= require morris/raphael-2.1.0.min.js
//= require dataTables/datatables.min.js
//= require library/greeting.js


// Widgets are where it is at and you get check them out below.
$(document).ready(function() {

    document.getElementById('welcomeGreeting').innerHTML = `${getGreeting(new Date().getHours())}, ${document.getElementById('welcomeGreeting').innerHTML}`
    document.getElementById('welcomeGreeting').classList.remove("hidden");

    if ($('#weeksRemaining').length) {
        Morris.Donut({
            element: 'weeksRemaining',
            data: [{
                    label: "Weeks Remaining",
                    value: 12
                },
                {
                    label: "Weeks Served",
                    value: 14
                },
            ]
        });
    }
    if ($('#americorpsRemaining').length) {
        Morris.Donut({
            element: 'americorpsRemaining',
            data: [{
                    label: "Hours Remaining",
                    value: 329
                },
                {
                    label: "Hours Served",
                    value: 571
                },
            ],
            colors: ["#c68947", "#f8ac59"],
        });
    }
    if ($('#plcRemaining').length) {
        Morris.Donut({
            element: 'plcRemaining',
            data: [{
                    label: "Hours Remaining",
                    value: 69
                },
                {
                    label: "Hours Served",
                    value: 571
                },
            ],
            colors: ["#188a8c", "#1fb2b4"],
        });
    }
    if ($('#divisionRevenueChart').length) {
        var data = $('#divisionRevenueChart').data('invoices');
        new Morris.Line({
            // ID of the element in which to draw the chart.
            element: 'divisionRevenueChart',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: data,
            // The name of the data record attribute that contains x-values.
            xkey: 'quarter',
            // A list of names of data record attributes that contain y-values.
            ykeys: ["total_revenue_amount"],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            // These are the labels that the clients see
            labels: ["Revenue"],
            hideHover: false,
            smooth: false,
            fillOpacity: '0.3',
            preUnits: '$',
            behaveLikeLine: true,
            // lineColors: ['#751108', '#23c6c8'],
        });
    }
    if ($('#partnerBarChart').length) {
        new Morris.Bar({
            element: 'partnerBarChart',
            data: [{
                    y: '2013',
                    a: 55123,
                    b: (55123 * .75),
                    c: 63456
                },
                {
                    y: '2014',
                    a: 75432,
                    b: (75432 * .75),
                    c: 85345
                },
                {
                    y: '2015',
                    a: 34534,
                    b: 30000,
                    c: 45948
                },
                {
                    y: '2016',
                    a: 110087,
                    b: (110087 * .80),
                    c: 120239
                },
                {
                    y: '2017',
                    a: 120087,
                    b: (120087 * .80),
                    c: 120239
                }
            ],
            xkey: 'y',
            ykeys: ['a', 'b', 'c'],
            labels: ['Total Budget', 'Expected Match', 'Actual Match'],
            hideHover: 'auto',
            preUnits: '$',
            resize: true,
            barColors: ['#1ab394', '#148F76', '#23c6c8'],
        });
    }
    //widget list view of agreements that filters
    if ($('.agreementStatus').length) {
        const table = $('#AgreementWidgetList').DataTable({
            pageLength: 25,
            scrollY: 225,
            paging: false,
            responsive: true,
            ordering: true,
            order: [0, 'asc'],
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [],
        });
        table.column(4).search("active" || '').draw()
        document.querySelector('#AgreementWidgetList_filter').classList.add('hidden')
        document.querySelector('#AgreementWidgetList_info').classList.add('hidden')
        $('.agreementStatus .btn').on('click', function() {
            document.querySelector('#agreementCountPreQuoteQuote').classList.add('hidden')
            document.querySelector('#agreementCountAccepted').classList.add('hidden')
            document.querySelector('#agreementCountActive').classList.add('hidden')
            document.querySelector('#agreementCountExpired').classList.add('hidden')
            // table = document.querySelector('#AgreementWidgetList')
        });
        $('#preQuoteQuote').on('click', function() {
            document.querySelector('#agreementCountPreQuoteQuote').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#accepted').on('click', function() {
            document.querySelector('#agreementCountAccepted').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#active').on('click', function() {
            document.querySelector('#agreementCountActive').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#expired').on('click', function() {
            document.querySelector('#agreementCountExpired').classList.remove('hidden');
            const searchTerm = $(this).find('input').val();
            table.column(4).search(searchTerm || '').draw();
        });


    }
    //widget list view of recruitment that filters
    if ($('.recruitmentStatus').length) {
        const table = $('#recruitmentWidgetList').DataTable({
            pageLength: 25,
            scrollY: 225,
            paging: false,
            responsive: true,
            ordering: true,
            order: [0, 'asc'],
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [],
        });
        //I am doing an automatic search filter and removing features that I don't like
        table.column(4).search("active" || '').draw()
        document.querySelector('#recruitmentWidgetList_filter').classList.add('hidden')
        document.querySelector('#recruitmentWidgetList_info').classList.add('hidden')
        // I am updating the counts next the word recruitment
        $('.recruitmentStatus .btn').on('click', function() {
            document.querySelector('#recruitmentCountPending').classList.add('hidden')
            document.querySelector('#recruitmentCountActive').classList.add('hidden')
            document.querySelector('#recruitmentCountReview').classList.add('hidden')
        });
        //below is where the filtering magic happens.
        $('#recruitmentPending').on('click', function() {
            document.querySelector('#recruitmentCountPending').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#recruitmentActive').on('click', function() {
            document.querySelector('#recruitmentCountActive').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#recruitmentReview').on('click', function() {
            document.querySelector('#recruitmentCountReview').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });


    }
    //widget list view of terms that filters
    if ($('.termStatus').length) {
        const table = $('#termWidgetList').DataTable({
            pageLength: 25,
            scrollY: 225,
            paging: false,
            responsive: true,
            ordering: true,
            order: [0, 'asc'],
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [],
        });
        //I am doing an automatic search filter and removing features that I don't like
        table.column(4).search("expired" || '').draw()
        document.querySelector('#termWidgetList_filter').classList.add('hidden')
        document.querySelector('#termWidgetList_info').classList.add('hidden')
        // I am updating the counts next the word recruitment
        $('.termStatus .btn').on('click', function() {
            document.querySelector('#termCountEnrolling').classList.add('hidden')
            document.querySelector('#termCountInService').classList.add('hidden')
            document.querySelector('#termCountExpired').classList.add('hidden')
            document.querySelector('#termCountSuspended').classList.add('hidden')
        });
        //below is where the filtering magic happens.
        $('#termEnrolling').on('click', function() {
            document.querySelector('#termCountEnrolling').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#termInService').on('click', function() {
            document.querySelector('#termCountInService').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#termExpired').on('click', function() {
            document.querySelector('#termCountExpired').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#termSuspended').on('click', function() {
            document.querySelector('#termCountSuspended').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });


    }
    //widget list view of terms that filters
    if ($('#staffUserWidgetList').length) {
        const table = $('#staffUserWidgetList').DataTable({
            pageLength: 25,
            scrollY: 225,
            paging: false,
            responsive: true,
            ordering: true,
            order: [0, 'asc'],
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [],
        });
        //I am doing an automatic search filter and removing features that I don't like
        table.column(4).search("pending" || '').draw()
        document.querySelector('#staffUserWidgetList_filter').classList.add('hidden')
        document.querySelector('#staffUserWidgetList_info').classList.add('hidden')
        // I am updating the counts next the word recruitment
        $('.staffUserStatus .btn').on('click', function() {
            document.querySelector('#staffUsersPendingCount').classList.add('hidden')
            document.querySelector('#staffUsersDivisionCount').classList.add('hidden')
            document.querySelector('#staffUsersProgramCount').classList.add('hidden')
            document.querySelector('#staffUsersCenOpsCount').classList.add('hidden')
            document.querySelector('#staffUsersAdminCount').classList.add('hidden')
        });
        //below is where the filtering magic happens.
        $('#staffUserPending').on('click', function() {
            document.querySelector('#staffUsersPendingCount').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#staffUserDivision').on('click', function() {
            document.querySelector('#staffUsersDivisionCount').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#staffUserProgram').on('click', function() {
            document.querySelector('#staffUsersProgramCount').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#staffUserCenOps').on('click', function() {
            document.querySelector('#staffUsersCenOpsCount').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#staffUserAdmin').on('click', function() {
            document.querySelector('#staffUsersAdminCount').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });


    }
    // this is only loaded if invoices are on the page
    if ($('#invoiceWidgetList').length) {
        const table = $('#invoiceWidgetList').DataTable({
            pageLength: 25,
            scrollY: 225,
            paging: false,
            responsive: true,
            ordering: true,
            order: [0, 'asc'],
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [],
        });
        //I am doing an automatic search filter and removing features that I don't like
        table.column(4).search("review" || '').draw()
        document.querySelector('#invoiceWidgetList_filter').classList.add('hidden')
        document.querySelector('#invoiceWidgetList_info').classList.add('hidden')
        // I am updating the counts next the word recruitment
        $('.invoiceStatus .btn').on('click', function() {
            document.querySelector('#invoiceDraftCount').classList.add('hidden')
            document.querySelector('#invoiceReviewCount').classList.add('hidden')
            document.querySelector('#invoiceApprovedCount').classList.add('hidden')
        });
        //below is where the filtering magic happens.
        $('#invoiceDraft').on('click', function() {
            document.querySelector('#invoiceDraftCount').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#invoiceReview').on('click', function() {
            document.querySelector('#invoiceReviewCount').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#invoiceApproved').on('click', function() {
            document.querySelector('#invoiceApprovedCount').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
    }

    // this is only loaded if invoices are on the page
    if ($('#projectWidgetList').length) {
        const table = $('#projectWidgetList').DataTable({
            pageLength: 25,
            scrollY: 225,
            paging: false,
            responsive: true,
            ordering: true,
            order: [0, 'asc'],
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [],
        });
        //I am doing an automatic search filter and removing features that I don't like
        table.column(4).search("active" || '').draw()
        document.querySelector('#projectWidgetList_filter').classList.add('hidden')
        document.querySelector('#projectWidgetList_info').classList.add('hidden')
        // I am updating the counts next the word recruitment
        $('.projectStatus .btn').on('click', function() {
            document.querySelector('#projectCountPending').classList.add('hidden')
            document.querySelector('#projectCountActive').classList.add('hidden')
            document.querySelector('#projectCountSuspended').classList.add('hidden')
        });
        //below is where the filtering magic happens.
        $('#projectPending').on('click', function() {
            document.querySelector('#projectCountPending').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#projectActive').on('click', function() {
            document.querySelector('#projectCountActive').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#projectSuspended').on('click', function() {
            document.querySelector('#projectCountSuspended').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
    }

    // this is only loaded if reports are on the page
    if ($('#reportWidgetList').length) {
        const table = $('#reportWidgetList').DataTable({
            pageLength: 25,
            scrollY: 225,
            paging: false,
            responsive: true,
            ordering: true,
            order: [0, 'asc'],
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [],
        });
        //I am doing an automatic search filter and removing features that I don't like
        table.column(4).search("active" || '').draw()
        document.querySelector('#reportWidgetList_filter').classList.add('hidden')
        document.querySelector('#reportWidgetList_info').classList.add('hidden')
        // I am updating the counts next the word recruitment
        $('.projectStatus .btn').on('click', function() {
            document.querySelector('#reportCountDraft').classList.add('hidden')
            document.querySelector('#reportCountActive').classList.add('hidden')
            document.querySelector('#draftCountApproved').classList.add('hidden')
        });
        //below is where the filtering magic happens.
        $('#reportDraft').on('click', function() {
            document.querySelector('#reportCountDraft').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#reportActive').on('click', function() {
            document.querySelector('#reportCountActive').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
        $('#reportApproved').on('click', function() {
            document.querySelector('#reportCountApproved').classList.remove('hidden')
            const searchTerm = $(this).find('input').val();
            console.log(searchTerm)
            console.log(table)
            table.column(4).search(searchTerm || '').draw()
        });
    }

});

if ($('#DriverChecksWidgetList').length) {
    const table = $('#DriverChecksWidgetList').DataTable({
        pageLength: 25,
        scrollY: 225,
        paging: false,
        responsive: true,
        ordering: true,
        order: [0, 'asc'],
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [],
    });
    document.querySelector('#DriverChecksWidgetList_filter').classList.add('hidden')
    document.querySelector('#DriverChecksWidgetList_info').classList.add('hidden')
}

if ($('#bugTrackingListWidget').length) {
    let bugBtn = document.querySelector('#bugStatuses')
    let bugStatuses = JSON.parse(bugBtn.getAttribute('data-statuses'))
    let showButtons = bugBtn.getAttribute('data-show-button')
    const table = $('#bugTrackingListWidget').DataTable({
        pageLength: 25,
        scrollY: 225,
        paging: false,
        responsive: true,
        ordering: true,
        order: [0, 'asc'],
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [],
    });
    if (showButtons === "true") {
        table.column(0).search("open" || '').draw()
    }
    document.querySelector('#bugTrackingListWidget_filter').classList.add('hidden')
    document.querySelector('#bugTrackingListWidget_info').classList.add('hidden')
    $('#bugStatuses .btn').on('click', function() {
        for (i = 0; i < bugStatuses.length; i++) {
            document.querySelector(`#bug_count_${bugStatuses[i]}`).classList.add('hidden')
        }
    });
    $('#bugOpen').on('click', function() {
        document.querySelector('#bug_count_open').classList.remove('hidden')
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        table.column(0).search("Open" || '').draw()
    });
    $('#bugInProgress').on('click', function() {
        document.querySelector('#bug_count_in_progress').classList.remove('hidden')
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        table.column(0).search("In Progress" || '').draw()
    });
    $('#bugPending').on('click', function() {
        const searchTerm = $(this).find('input').val();
        document.querySelector(`#bug_count_${searchTerm}`).classList.remove('hidden')
        console.log("Pending")
        table.column(0).search("Pending" || '').draw()
    });
    $('#bugScheduledForRelease').on('click', function() {
        const searchTerm = $(this).find('input').val();
        document.querySelector(`#bug_count_${searchTerm}`).classList.remove('hidden')
        console.log("Scheduled For Release")
        table.column(0).search("Scheduled For Release" || '').draw()
    });
    $('#bugCompleted').on('click', function() {
        const searchTerm = $(this).find('input').val();
        document.querySelector(`#bug_count_${searchTerm}`).classList.remove('hidden')
        console.log("Completed")
        table.column(0).search("Completed" || '').draw()
    });
}

if ($('.bcStatus').length) {
    const table = $('#backgroundCheckWidgetList').DataTable({
        pageLength: 25,
        scrollY: 225,
        paging: false,
        responsive: true,
        ordering: true,
        order: [0, 'asc'],
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [],
    });
    table.column(3).search("pending" || '').draw()
    document.querySelector('#backgroundCheckWidgetList_filter').classList.add('hidden')
    document.querySelector('#backgroundCheckWidgetList_info').classList.add('hidden')
    $('.bcStatus .btn').on('click', function() {
        document.querySelector('#bcCountPending').classList.add('hidden')
        document.querySelector('#bcCountInitiated').classList.add('hidden')
        document.querySelector('#bcCountClearedForService').classList.add('hidden')
        // table = document.querySelector('#AgreementWidgetList')
    });
    $('#backgroundCheckPending').on('click', function() {
        document.querySelector('#bcCountPending').classList.remove('hidden')
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(3).search(searchTerm || '').draw()
    });
    $('#backgroundCheckInitiated').on('click', function() {
        document.querySelector('#bcCountInitiated').classList.remove('hidden')
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(3).search(searchTerm || '').draw()
    });
    $('#backgroundCheckClearedForService').on('click', function() {
        document.querySelector('#bcCountClearedForService').classList.remove('hidden')
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(3).search(searchTerm || '').draw()
    });
}

if ($('#ProgramListFinancialWidgetList').length) {
    const table = $('#ProgramListFinancialWidgetList').DataTable({
        pageLength: 25,
        scrollY: 225,
        paging: false,
        responsive: true,
        ordering: true,
        order: false,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [],
    });
    table.column(2).search("SHOW NOTHING" || '').draw()
    document.querySelector('#ProgramListFinancialWidgetList_filter').classList.add('hidden')
    document.querySelector('#ProgramListFinancialWidgetList_info').classList.add('hidden')
    var buttonLabels = $('#divisionFinancialButtons').data('labels')

    $('.bcStatus .btn').on('click', function() {
        // document.querySelector('#bcCountPending').classList.add('hidden')
        // document.querySelector('#bcCountInitiated').classList.add('hidden')
        // document.querySelector('#bcCountClearedForService').classList.add('hidden')
        // table = document.querySelector('#AgreementWidgetList')
    });
    $('#division-SWA').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-SWT').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-MTW').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-PWN').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-PWC').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-PWS').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-SEN').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-YCC').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-NPS').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-BLM').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-FWS').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-USF').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-BOR').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });
    $('#division-SPE').on('click', function() {
        const searchTerm = $(this).find('input').val();
        console.log(searchTerm)
        console.log(table)
        table.column(2).search(searchTerm || '').draw()
    });

}


// Program Revenue Previous Quarter
if ($('#programPreviousRevenueChart').length) {
    Morris.Donut({
        element: 'programPreviousRevenueChart',
        data: $('#programPreviousRevenueChart').data('invoices')
    });
    console.log($('#programPreviousRevenueChart').data('invoices'))

}

// Program Revenue Current Quarter
if ($('#programCurrentRevenueChart').length) {
    Morris.Donut({
        element: 'programCurrentRevenueChart',
        data: $('#programCurrentRevenueChart').data('invoices')
    });
}

// Program Revenue per Division Chart
if ($('#revenue_per_division_chart').length) {
    var labels = $('#revenue_per_division_chart').data('labels');
    var data = $('#revenue_per_division_chart').data('invoices');
    areaChart = Morris.Line({
        element: 'revenue_per_division_chart',
        data: data,
        xkey: 'quarter',
        ykeys: labels,
        labels: labels,
        hideHover: false,
        smooth: false,
        fillOpacity: '0.6',
        preUnits: '$',
        resize: false,
        behaveLikeLine: true,
        pointSize: 3,
        lineColors: ['#396ab1', '#1f3a63', '#da7c30', '#6d3e18', '#3e9651', '#24562f', '#cc2529', '#7f1517', '#535154', '#a884ba', '#99969b', '#7608ad', '#948b3d', '#e0d891', '#e524a8']

    });
}
// $('#divisionRevenueChart').resize(function () { areaChart.redraw(); });