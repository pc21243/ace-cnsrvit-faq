runTotals = ->
  #  this will be for totaling each column, dunno if we need this #FIXME

totalColumn = (table, siblingIndex) ->
  columnHours = 0
  $(table).find('tbody').find('tr').each (i, el) ->
    hours = $(el).find('td').eq(siblingIndex).find('input').val()
    if ! !hours
      columnHours += parseFloat(hours)
    return
  $('.daytotals span').eq(siblingIndex - 1).html columnHours
  return

totalRow = (table, index) ->
  rowHours = 0
  siblingIndex = $(table).find('tr').eq(index + 1).find('td').each((i, sibling) ->
    hours = $(sibling).find('input').val()
    if ! !hours
      rowHours += parseFloat(hours)
    $(this).closest('tr').find('.rowtotal').find('span').html rowHours
    return
  )
  return

$(document).ready ->
  $('.addrowbutton').click ->
    $(this).addClass 'clicked'
    return
  $('.submission_period').on 'click', '.remove-row-button', ->
    $(this).closest('tr').remove()
    return
  # Hours updating
  $('.submission_period').on 'change', '.hoursinput', (e) ->
    `var table`
    # Tally column
    siblingIndex = $(this).closest('td').index()
    table = $(this).closest('table')
    totalColumn table, siblingIndex
    #Tally row
    table = $(this).closest('table')
    rowIndex = $(this).closest('tr').index()
    totalRow table, rowIndex
    return
  return
