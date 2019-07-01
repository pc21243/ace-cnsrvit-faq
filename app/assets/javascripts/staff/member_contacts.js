//= require dataTables/datatables.min.js
//= require select2/select2.full.min
//= require library/hide_cards_when_tabbing.js
//= require library/tab_cookie.js
//= require library/card_cookie.js








if (window.location.pathname == "/staff/member_contacts") {
    let today = new Date;
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    today = mm + '.' + dd + '.' + yyyy;
    const file_title = `bugs_${today}`;

    jQuery(document).ready(function() {
        oTable = $('.memberDataTables').DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: $('memberDataTables').data('source'),
                dataType: 'json'
            },
            pagingType: "full_numbers",
            columns: [{
                "data": "status",
                render: function(data, type, row, meta) {
                    if (data == '-') {
                        return 'nada'
                    } else {
                        return statusBadge(data)
                    }
                },
                width: "10%",
                orderData: [0]
            }, {
                "data": "name",
                render: function(data, type, row, meta) {
                    if (data == '-') {
                        return 'No Description'
                    } else {
                        return `<a href="/staff/member_contacts/${row.DT_RowId}">${data}</a>`
                    }
                },
                width: "30%",
                orderData: [1]
            }, {
                "data": "email",
                render: function(data, type, row, meta) {
                    if (row.work_email.length > 0) {
                        email = `<a href="mailto:${row.work_email}">${row.work_email}</a>`
                    } else if (row.work_email.length > 0) {
                        email = `<a href="mailto:${row.peronsal_email}">${row.personal_email}</a>`
                    } else {
                        email = "Unknown"
                    }
                    return email
                },
                width: "30%",
                orderData: [2]
            }, {
                "data": "phone",
                width: "10%",
                orderData: [3]
            }, {
                "data": "last_position",
                width: "10%",
                orderData: [4]
            }, {
                "data": "term_status",
                render: function(data, type, row, meta) {
                    if (data == '-') {
                        return 'nada'
                    } else {
                        return statusBadge(data)
                    }
                },
                width: "10%",
                orderData: [5]

            }],
            autoWidth: true,
            pageLength: 25,
            responsive: true,
            colReorder: false,
            stateSave: false,
            order: [
                [0, 'asc'],
                [1, 'asc']
            ],
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [{
                extend: 'excel',
                title: file_title
            }, {
                extend: 'print',
            }, {
                /// Why is there no button, what did I do? -trh
                extend: 'pdfHtml5',
                text: 'PDF',
                orientation: 'portrait'
            }],
            initComplete: function() {
                document.getElementById("DataTables_Table_0_filter").firstChild.classList.add("hidden")
                return $('.filters input, .filters select', this).on('change', (function(_this) {
                    return function(e) {
                        var th;
                        th = $(e.target).closest("th");
                        console.log(e)
                        return _this.api().column(th.index()).search($(e.target).val()).draw();
                    };
                })(this));
            }
        })
    })

}