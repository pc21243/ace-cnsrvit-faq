if ($('#form').length > 0) {
  $(function() {
    $('#form').steps({
      bodyTag: 'fieldset',
      forceMoveForward: true,
      labels: {
        finish: "Create VSP"
      },
      onStepChanging(event, currentIndex, newIndex) {
        let form = undefined;
        if (currentIndex > newIndex) {
          return true;
        }
        form = $(this);
        console.log(form);
        if (currentIndex < newIndex) {
          $(`.body:eq(${newIndex}) label.error`, form).remove();
          $(`.body:eq(${newIndex}) .error`, form).removeClass('error');
        }
        form.validate().settings.ignore = ':disabled,:hidden';
        return form.valid();
      },
      onStepChanged(event, currentIndex, priorIndex) {
        if (currentIndex === 1) {
          const units = form.querySelector('#expense_units').value;
          const endDate =form.querySelector('#expense_end_date').value;
          const startDate =form.querySelector('#expense_start_date').value;
          const unitCost = form.querySelector('#expense_unit_cost').value;
          const reimbursement = form.querySelector('#expense_reimbursement').value;
          const perDiem = form.querySelector('#expense_per_diem').value;
          document.querySelector('#dateOfEvent').textContent = category;
          document.querySelector('#location').textContent = startDate;
          document.querySelector('#volunteerCount').textContent = endDate;
          document.querySelector('#totalNumberOfVolunteerHours').textContent = units;
        }
      },
      onFinishing(event, currentIndex) {
        let form = undefined;
        form = $(this);
        form.validate().settings.ignore = ':disabled';
        return form.valid();
      },
      onFinished(event, currentIndex) {
        let form = undefined;
        form = $(this);
        form.submit();
      }
    }).validate({
      errorPlacement(error, element) {
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
