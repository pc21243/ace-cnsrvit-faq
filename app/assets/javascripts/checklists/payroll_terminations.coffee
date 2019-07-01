# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
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
file_title = 'payrollTerminations_' + today


$ ->
  table = $('.payrollTerminationsDataTables').DataTable
    pageLength: 25
    responsive: true
    ordering: true
    order: [1, 'desc']
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
          console.log("Hello World");
          $('.btn-group.epicDivisions').removeClass('hide')
          $('.btn-group.corpsDivisions').addClass('hide')
        when 'CORPS'
          $('.btn-group.corpsDivisions').removeClass('hide')
          $('.btn-group.epicDivisions').addClass('hide')
        when ''
          table.column(3).search('' ).draw()
          $('.btn-group.corpsDivisions').addClass('hide')
          $('.btn-group.epicDivisions').addClass('hide')
        else
          $('.btn-group.corpsDivisions').addClass('hide')
          $('.btn-group.epicDivisions').addClass('hide')

      table.column(3).search(searchTerm || '' ).draw()
      return

  $('.epicDivisions .btn').on 'click', ->
    searchTerm = $(this).find('input').val()
    table.column(4).search(searchTerm || '' ).draw()
    return

  $('.corpsDivisions .btn').on 'click', ->
    searchTerm = $(this).find('input').val()
    table.column(4).search(searchTerm || '' ).draw()
    return

  $('.selector').tooltip content: 'Awesome title!'
  return


  return
