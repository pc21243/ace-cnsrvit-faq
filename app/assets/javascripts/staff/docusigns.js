$(function() {
    if ($('#form').length) {
        $('#form').steps({
            bodyTag: 'fieldset',
            forceMoveForward: false,
            labels: {
                finish: "Submit"
            },
            onStepChanging: function(event, currentIndex, newIndex) {
                var form;
                if (currentIndex > newIndex) {
                    return true;
                }
                if (newIndex === 3 && Number($('#age').val()) < 18) {
                    return false;
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
                var division, divisionSelect, endDate, period;
                if (currentIndex === 1) {
                    division = $("#invoice_division_id option:selected").text();
                    endDate = $('.invoice_end_date_p input').val();
                    billing = $("#invoice_billing_id option:selected").text();
                    period = $("#invoice_marking_period_2i option:selected").text() + " " + $("#invoice_marking_period_1i option:selected").text();
                    $("#division").text(division)
                    $("#endDate").text(endDate);
                    $("#period").text(period);
                    $("#billing-contact").text(billing);
                }
            },
            onFinishing: function(event, currentIndex) {
                var form;
                form = $(this);
                form.validate().settings.ignore = ':disabled';
                return form.valid();
            },
            onFinished: function(event, currentIndex) {
                var form;
                form = $(this);
                form.submit();
            }
        }).validate({
            errorPlacement: function(error, element) {
                element.before(error);
            },
            rules: {
                confirm: {
                    equalTo: '#password'
                }
            }
        });
        initializeDatepicker();
    }
});

const toggleDisabilityExplainDropdown = (el) => {
    if (el.value == "true") {
        document.getElementById("docusign_demographic_data_disability_explain").parentNode.classList.remove("hidden")
    } else {
        document.getElementById("docusign_demographic_data_disability_explain").parentNode.classList.add("hidden")
    }
}