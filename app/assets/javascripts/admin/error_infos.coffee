#= require dataTables/datatables.min.js

$ ->
  table = undefined
  table = $('.error_infosDataTables').DataTable(
    pageLength: 25
    responsive: true
    ordering: true
    order: [
      1
      'asc'
    ]
    )
  return

$ ->
  $('a.add-found-on').on 'click', (ev) ->
    ev.preventDefault()
    $lastFoundOnField = $('input[name="management_error_info[found_on][]"]:last-of-type').clone()
    $lastFoundOnField.val("")
    $lastFoundOnField.attr("value", "")
    $(".management_error_info_found_on").append($lastFoundOnField)
    return
