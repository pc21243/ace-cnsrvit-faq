# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
#= require iCheck/icheck.min.js
#= require jeditable/jquery.jeditable.js
#= require dataTables/datatables.min.js
#= require jqGrid/i18n/grid.locale-el.js
#= require jqGrid/jquery.jqGrid.min.js

#= require footable/footable.all.min.js
#= require fullcalendar/moment.min.js
#= require fullcalendar/fullcalendar.min.js
#= require peity/jquery.peity.min.js
#= require sparkline/jquery.sparkline.min.js

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
file_title = 'ListOfStaff_' + today

# Set up the datatable with export options and default ordering
# We also don't want to sort by the edit icon in the first column
$ ->
  $('.staffDataTables').DataTable
    pageLength: 25
    responsive: true
    ordering: true
    order: [1, 'asc']
    columnDefs: [
      {
      searchable: false
      orderable: false
      targets: 'edit'
      }
    ]
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
          table.column(10).search('' ).draw()
          $('.btn-group.EPICDivisions').removeClass('hide')
          $('.btn-group.CORPSDivisions').addClass('hide')
        when 'CORPS'
          table.column(10).search('' ).draw()
          $('.btn-group.CORPSDivisions').unbind("click").removeClass('hide')
          $('.btn-group.EPICDivisions').addClass('hide')
        when ''
          table.column(10).search('' ).draw()
          $('.btn-group.CORPSDivisions').addClass('hide')
          $('.btn-group.EPICDivisions').addClass('hide')
        else
          $('.btn-group.CORPSDivisions').addClass('hide')
          $('.btn-group.EPICDivisions').addClass('hide')

      table.column(0).search(searchTerm || '' ).draw()
      return

  $('.EPICDivisions .btn').on 'click', ->
    searchTerm = $(this).find('input').val()
    table.column(10).search(searchTerm || '' ).draw()
    return

  $('.CORPSDivisions .btn').on 'click', ->
    searchTerm = $(this).find('input').val()
    table.column(10).search(searchTerm || '' ).draw()
    return




  return
