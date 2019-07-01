if ($('#form').length > 0) {
  $(function() {
    $('#form').steps({
      bodyTag: 'fieldset',
      forceMoveForward: true,
      labels: {
        finish: "Create Modification"
      },
      onStepChanging: function(event, currentIndex, newIndex) {
        var form;
        form = void 0;
        if (currentIndex > newIndex) {
          return true;
        }
        form = $(this);
        if (currentIndex < newIndex) {
          $('.body:eq(' + newIndex + ') label.error', form).remove();
          $('.body:eq(' + newIndex + ') .error', form).removeClass('error');
        }
        form.validate().settings.ignore = ':disabled,:hidden';
        return form.valid();
      },
      onStepChanged: function(event, currentIndex, priorIndex) {
        var agreementEndDate, agreementStartDate, fundsAdded, indirectRate, matchAdded, modStartDate;
        if (currentIndex === 1) {
          modStartDate = form.querySelector('#modification_mod_start_date_p').value;
          agreementStartDate = form.querySelector('#modification_agreement_start_date_p').value;
          agreementEndDate = form.querySelector('#modification_agreement_end_date_p').value;
          fundsAdded = form.querySelector('#modification_funds_added').value;
          matchAdded = form.querySelector('#modification_match_added').value;
          indirectRate = form.querySelector('#modification_indirect_rate').value;
          document.querySelector('#modStartDate').textContent = modStartDate;
          document.querySelector('#agreementStartDate').textContent = agreementStartDate;
          document.querySelector('#agreementEndDate').textContent = agreementEndDate;
          document.querySelector('#fundsAdded').textContent = "$" + fundsAdded;
          document.querySelector('#matchAdded').textContent = "$" + matchAdded;
          document.querySelector('#indirectRate').textContent = indirectRate + "%";
        }
      },
      onFinishing: function(event, currentIndex) {
        var form;
        form = void 0;
        form = $(this);
        form.validate().settings.ignore = ':disabled';
        return form.valid();
      },
      onFinished: function(event, currentIndex) {
        var form;
        form = void 0;
        form = $(this);
        form.submit();
      }
    }).validate({
      errorPlacement: function(error, element) {
        element.before(error);
      },
      rules: {
        start_year: 'required',
        division_id: 'required'
      }
    });
   initializeDatepicker();

  });
}
