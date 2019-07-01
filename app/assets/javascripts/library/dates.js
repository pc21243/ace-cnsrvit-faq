//= require fullcalendar/moment.min.js

$('document').ready(function() {
    let dates = document.getElementsByClassName("timestamp")
    longDateTranslator = (dates) => {
        dates_array = Array.from(dates)
        return (
            approvedList = dates_array.map(date => date.innerHTML = moment(date.innerHTML).format('LLL'))
        )
    }
    longDateTranslator(dates)
});

$('document').ready(function() {
    let dates = document.getElementsByClassName("short-timestamp")
    shortDateTranslator = (dates) => {
        dates_array = Array.from(dates)
        return (
            approvedList = dates_array.map(date => date.innerHTML = moment(date.innerHTML).format('lll'))
        )
    }
    shortDateTranslator(dates)
});
