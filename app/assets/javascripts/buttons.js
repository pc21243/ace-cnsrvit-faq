var buttonSetup;

$(function() {
  return buttonSetup();
});

buttonSetup = function() {
  $('.button-checkbox').each(function() {
    var $button, $checkbox, $widget, color, init, settings, updateDisplay;
    $widget = $(this);
    $button = $widget.find('button');
    $checkbox = $widget.find('input:checkbox');
    color = $button.data('color');
    settings = {
      on: {
        icon: 'glyphicon glyphicon-check'
      },
      off: {
        icon: 'glyphicon glyphicon-unchecked'
      }
    };
    updateDisplay = function() {
      var isChecked;
      isChecked = $checkbox.is(':checked');
      $button.data('state', isChecked ? 'on' : 'off');
      $button.find('.state-icon').removeClass().addClass('state-icon ' + settings[$button.data('state')].icon);
      if (isChecked) {
        $button.removeClass('btn-default').addClass('btn-' + color + ' active');
      } else {
        $button.removeClass('btn-' + color + ' active').addClass('btn-default');
      }
    };
    init = function() {
      updateDisplay();
      if ($button.find('.state-icon').length === 0) {
        $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
      }
    };
    $button.on('click', function() {
      $checkbox.prop('checked', !$checkbox.is(':checked'));
      $checkbox.triggerHandler('change');
      updateDisplay();
    });
    $checkbox.on('change', function() {
      updateDisplay();
    });
    init();
  });
};
