$(function() {
    $('.editable-basic').editable({
        placement: "bottom",
        format: "yyyy-mm-dd",
        viewformat: "mm/dd/yyyy",
        emptytext: "blank",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        }
    })
});
$(function() {
    $('.editable-basic-top').editable({
        placement: "top",
        format: "yyyy-mm-dd",
        viewformat: "mm/dd/yyyy",
        emptytext: "blank",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        }
    })
});
$(function() {
    $('.editable-basic-right').editable({
        placement: "right",
        format: "yyyy-mm-dd",
        viewformat: "mm/dd/yyyy",
        emptytext: "blank",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        }
    })
});
$(function() {
    $('.editable-boolean').editable({
        placement: "bottom",
        emptytext: "blank",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        }
    })
});
$(function() {
    $('.editable-email').editable({
        placement: "bottom",
        emptytext: "blank",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        },
    })
});
$(function() {
    $('.editable-currency').editable({
        display: function(value) {
            $(this).text('$' + value);
        },
        value: function(value) {
            $(this).text(value.replace('$', ''))
        },
        placement: "bottom",
        emptytext: "blank",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        },
        success: function(response, newValue) {
            // console.log(response)
            // console.log(newValue)
            if (!response.success) return response.msg;
        },
    })
});
$(function() {
    $('.editable-currency-refresh').editable({
        display: function(value) {
            $(this).text('$' + value);
        },
        value: function(value) {
            $(this).text(value.replace('$', ''))
        },
        placement: "bottom",
        emptytext: "blank",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        },
        success: function(response, newValue) {
            // console.log(response)
            // console.log(newValue)
            location.reload();
            if (!response.success) return response.msg;
        },
    })
});
$(function() {
    $('.editable-phone').editable({
        placement: "bottom",
        emptytext: "blank",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        },
    })
});

$(function() {
    $('.editable-refresh').editable({
        placement: "bottom",
        format: "yyyy-mm-dd",
        viewformat: "mm/dd/yyyy",
        emptytext: "blank",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        },
        success: function(response, newValue) {
            // console.log(response)
            // console.log(newValue)
            location.reload();
            if (!response.success) return response.msg;
        },
    })
});

$(function() {
    $('.editable-refresh-top').editable({
        placement: "top",
        format: "yyyy-mm-dd",
        viewformat: "mm/dd/yyyy",
        emptytext: "blank",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        },
        success: function(response, newValue) {
            // console.log(response)
            // console.log(newValue)
            location.reload();
            if (!response.success) return response.msg;
        },
    })
});

$(function() {
    $('.editable-button').editable({
        placement: "top",
        format: "yyyy-mm-dd",
        viewformat: "mm/dd/yyyy",
        emptytext: "  Edit",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        },
        success: function(response, newValue) {
            console.log(response)
            console.log(newValue)
            location.reload();
            if (!response.success) return response.msg;
        },
    })
});

$(function() {
    $('.editable-division-group-select').editable({
        placement: "top",
        format: "yyyy-mm-dd",
        viewformat: "mm/dd/yyyy",
        emptytext: "blank",
        error: function(response, newValue) {
            var error_msgs = []
            $.each(response.responseJSON, function(key, value) {
                error_msgs.push(key + ' ' + value)
            })
            return error_msgs.join("; ");
        },
        success: function(response, newValue) {
            console.log(response)
            console.log(newValue)
            location.reload();
            if (!response.success) return response.msg;
        },
    })
});
$(function() {
    if ($('.editable-typeahead').length > 0) {
        let source = $('.editable-typeahead').data("source")
        $('.editable-typeahead').editable({
            placement: "bottom",
            typeahead: {
                local: source,
                template: function(item) {
                    return item.tokens[2];
                }
            },
            display: function(value, tokens) {
                return (source.filter(data => data.value === value))
            },
            emptytext: "blank",
            error: function(response, newValue) {
                var error_msgs = []
                $.each(response.responseJSON, function(key, value) {
                    error_msgs.push(key + ' ' + value)
                })
                return error_msgs.join("; ");
            },
            success: function(response, newValue) {
                location.reload();
                if (!response.success) return response.msg;
            },
        })
        $("body").on('typeahead:selected', function(evt, item) {
            realTarget = evt.target.closest('.tt-query')
            realTarget.value = item.text;
        })
        $('.editable-typeahead').on('click', function() {
            popoverId = $(".editable-typeahead").attr('aria-describedby')
            $("#" + popoverId).css('width', '100%')
            $("#" + popoverId).find('.control-group').css('width', '100%')
            $("#" + popoverId).find('.editable-input').css('width', '80%')
            $("#" + popoverId).find('.editable-input').find('span.twitter-typeahead').css('width', '100%')
            $("#" + popoverId).find('.editable-input').find('input').css('width', '100%')
            $("#" + popoverId).find('.editable-input').find('input').css('width', '100%')
        })
    }
});