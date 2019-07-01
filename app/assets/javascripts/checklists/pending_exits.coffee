# REquired javascript dependencies
#= require dataTables/datatables.min.js


#Get the date for adding to the end of the file name
today = new Date
dd = today.getDate()
#January is 0!
mm = today.getMonth() + 1
yyyy = today.getFullYear()
#Add a leading zero to the day and month if needed
if dd < 10
  dd = '0' + dd
if mm < 10
  mm = '0'+ mm
today = mm + '.' + dd + '.' + yyyy
file_title = 'pendingExits_' + today

# Set up the datatable with export options and default ordering
# We also don't want to sort by the edit icon in the first column
$ ->
  table = $('.pendingExits').DataTable
    pageLength: 25
    responsive: true
    searching: true,
    bPaginate: true,
    ordering: true
    order: [1, 'asc']
    dom: '<"html5buttons"B>lTfgitp'
    buttons: [
      { extend: 'csv' }
      {
        extend: 'excel'
        title: file_title
      }
      {
        extend: 'pdf'
        title: file_title
      }
      {
        extend: 'print'
        customize: (win) ->
          $(win.document.body).addClass 'white-bg'
          $(win.document.body).css 'font-size', '10px'
          $(win.document.body).find('table').addClass('compact').css 'font-size', 'inherit'
          return

      }
    ]

  $('.programs .btn').on 'click', ->
      searchTerm = $(this).find('input').val()
      switch(searchTerm)
        when 'EPIC'
          $('.btn-group.EPICDivisions').removeClass('hide')
          $('.btn-group.CORPSDivisions').addClass('hide')
        when 'CORPS'
          $('.btn-group.CORPSDivisions').removeClass('hide')
          $('.btn-group.EPICDivisions').addClass('hide')
        when ''
          table.column(4).search('' ).draw()
          $('.btn-group.CORPSDivisions').addClass('hide')
          $('.btn-group.EPICDivisions').addClass('hide')
        else
          $('.btn-group.CORPSDivisions').addClass('hide')
          $('.btn-group.EPICDivisions').addClass('hide')

      table.column(3).search(searchTerm || '' ).draw()
      return

  $('.EPICDivisions .btn').on 'click', ->
    searchTerm = $(this).find('input').val()
    table.column(4).search(searchTerm || '' ).draw()
    return

  $('.CORPSDivisions .btn').on 'click', ->
    searchTerm = $(this).find('input').val()
    table.column(4).search(searchTerm || '' ).draw()
    return

  return
