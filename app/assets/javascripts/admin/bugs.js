//= require dataTables/datatables.min.js
//= require select2/select2.full.min

redrawBugDatatable = (file_title) => {
    if ( $.fn.dataTable.isDataTable( '#bug-datatable' ) ) {
      table = $('#bug-datatable').DataTable()
      table.state.clear()
      table.destroy()
      let inputs = document.getElementsByClassName("filters")[0].querySelectorAll("input")
      inputs.forEach(function(input,idx){
      console.log(input)
      input.value = ''
      })
      drawBugDatatable(file_title)
    }
}
removeTagFilters = () => {
    window.location = window.location.pathname
}



drawBugDatatable = (file_title) => {
    oTable = $('#bug-datatable').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: $('#bugs-datatable').data('source'),
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
        }, {
            "data": "priority",
            render: function(data, type, row, meta) {
                if (data == '-') {
                    return 'nada'
                } else {
                    return statusBadge(data)
                }
            },
            width: "10%",
        }, {
            "data": "name",
            render: function(data, type, row, meta) {
                if (data == '-') {
                    return 'No Description'
                } else {
                    return `<a href="/admin/bugs/${row.DT_RowId}">${data}</a>`
                }
            },
            width: "20%",
        }, {
            "data": "from_url",
            render: function(data, type, row, meta) {
                if (data == '-') {
                    return 'No URL'
                } else {
                    return `<a href="${data}">${data}</a>`
                }
            },
            width: "18%",
        }, {
            "data": "action_user_id",
            render: function(data, type, row, meta) {
                if (data == '-') {
                    return 'No person'
                } else {
                    return data
                }
            },
            width: "18%",
        }, {
            "data": "user_id",
            render: function(data, type, row, meta) {
                if (data == '-') {
                    return 'No person'
                } else {
                    return data
                }
            },
            width: "15%",
        }, {
            "data": "assigned_to_id",
            width: "17%",
        }, {
            "data": "updated_at",
            width: "7%",
        }, {
            "data": "request_type",
            width: "7%",

        }],
        columnDefs: [ {
            targets: [ 0 ],
            orderData: [ 0, 1 ]
        }, {
            targets: [ 1 ],
            orderData: [ 1, 0 ]
        }, {
            targets: [ 7 ],
            orderData: [ 7,0 ]
        } ],
        autoWidth: false,
        pageLength: 25,
        responsive: true,
        stateSave: true,
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
            return $('.filters input, .filters select', this).on('change', (function(_this) {
                return function(e) {
                    var th;
                    th = $(e.target).closest("th");
                    return _this.api().column(th.index()).search($(e.target).val()).draw();
                };
            })(this));
        }
    })

}
if (window.location.pathname == "/admin/bugs") {
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

    $(function() {
        $('.multi-selects-yum').select2();
        drawBugDatatable(file_title)
    })
    document.getElementById("clear-filters").addEventListener("click", redrawBugDatatable)
    document.getElementById("clear-tags").addEventListener("click", removeTagFilters)
}
