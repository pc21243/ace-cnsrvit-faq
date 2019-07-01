//= require moment-with-locales.js
//= require datapicker/bootstrap-datepicker.js

$(window).bind("load", function() {
    $.validator.addMethod("validDate", function(value, element) {
        return this.optional(element) || moment(value, "MM/DD/YYYY").isValid();
    }, "Please enter a valid date in the format MM/DD/YYYY");
    initializeDatepicker()
})

initializeDatepicker = () => {
    console.log("(Re)Loading Datepicker Defaults")
    $('.bsdatepicker').datepicker({
        orientation: 'bottom auto',
        autoclose: true,
        calendarWeeks: false,
        todayHighlight: true,
        zIndexOffset: 9999999999,
        format: 'mm/dd/yyyy',
        todayBtn: true
    }).on('changeDate', function(e) {
        var realDateField = $(e.currentTarget).find('input').attr('id').replace(/_p$/, '');
        realFormat = moment(e.date).format("YYYY-MM-DD");
        $("#" + realDateField).val(realFormat);
    })
};



$(document).on('shown.bs.modal', '#modal-holder', function() {
    initializeDatepicker()
});

$(document).on('cocoon:after-insert', function() {
    initializeDatepicker()
});


$(document).on('show.bs.modal', '#ajax-modal', function(e) {
    if (e.namespace === 'bs.modal') {
        initializeDatepicker()
    }
});