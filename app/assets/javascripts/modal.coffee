$ ->
  modal_holder_selector = '#modal-holder'
  modal_selector = '.modal'

  $(document).on 'click', 'a[data-modal]', ->
      $(modal_selector).modal({show: false})
    false

  $(document).on 'ajax:success',
    'form[data-modal]', (event, data, status, xhr)->
      url = xhr.getResponseHeader('Location')
      if url
        # Redirect to url
        window.location = url
      else
        # Remove old modal backdrop
        $('.modal-backdrop').remove()

        # Replace old modal with new one
        $(modal_holder_selector).html(data).
        find(modal_selector).modal()

      false
