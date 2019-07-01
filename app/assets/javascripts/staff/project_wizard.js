//=require handlebars.js
//=require handlebars_helpers
//=require_tree ../templates
if ($('#form').length > 0) {
    $(function() {
        $('#form').steps({
            bodyTag: 'fieldset',
            forceMoveForward: true,
            enableCancelButton: true,
            onCanceled: function(event) {
                console.log('canceling project creation')
                var jsonUnsentData = JSON.parse(JSON.stringify(jQuery('form').serializeArray()))
                pid = $("#project_id")
                aid = $("#project_agreement_id").val()
                if (pid.length) {
                    $.ajax({
                        type: 'DELETE',
                        url: `/staff/agreements/${aid}/project_wizard/${pid.val()}`,
                        dataType: 'json',
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
                        },
                        success: function(results) {
                            window.location.replace(`/staff/agreements/${aid}`)
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            alert(`Your project (id: ${pid.val()}) could not be deleted, or there are errors remaining, please contact an administrator`);
                            window.location.replace(`/staff/agreements/${aid}`)
                        }
                    })
                } else {
                    window.location.replace(`/staff/agreements/${aid}`)
                }
            },
            onStepChanging: function(event, currentIndex, newIndex) {
                let form = void 0;
                form = $(this);

                form.validate().settings.ignore = ':disabled,:hidden, .date';
                if (currentIndex === 0) {
                    var ending;
                    if (form.valid()) {
                        let formData;
                        $('#ajax-loading').show();
                        formData = $("form").serialize();
                        $.ajax({
                            type: $('#form').attr('method'),
                            url: $('#form').attr('action'),
                            data: formData,
                            async: false,
                            beforeSend: function(xhr) {
                                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
                            },
                            dataType: 'json',
                            success: function(jsonData) {
                                var parent, projectLocationInputHtml;
                                parent = $('.location-input');
                                if (jsonData.error !== 'No valid project') {
                                    parent.empty();
                                    projectLocationInputHtml = HandlebarsTemplates['project_wizard_location']({
                                        project: jsonData
                                    });
                                    parent.replaceWith(projectLocationInputHtml);
                                }
                                $("#form").attr('action', $("form").attr('action') + "/" + jsonData.id);
                                $("#form").attr('method', 'PUT');

                                $(`.body:eq(${currentIndex}) label.error`, form).remove();
                                $(`.body:eq(${currentIndex}) .error`, form).removeClass('error');
                                ending = true
                            },
                            complete: function() {
                                $('#ajax-loading').hide();
                            },
                            error: function(m, d) {
                                ending = false
                                setDangerAlert("There was an error in completing your project setup, please inform administrators")
                            }
                        });
                    }
                    return ending

                    //  },
                    //  onStepChanged: function(event, currentIndex, priorIndex) {
                } else if (currentIndex === 1) {
                    var ending;
                    if (form.valid()) {
                        let formData;
                        $('#ajax-loading').show();
                        formData = $("form").serialize();
                        $.ajax({
                            type: 'PUT',
                            url: $('#form').attr('action') + "/?wizard=true&set_members=true",
                            data: formData,
                            async: false,
                            dataType: 'json',
                            success: function(jsonData) {
                                var parent, projectMemberInputHtml, memberCount;
                                parent = $('.member-input');
                                parent.empty();
                                projectMemberInputHtml = HandlebarsTemplates['project_wizard_members']({
                                    project: jsonData
                                });
                                parent.replaceWith(projectMemberInputHtml);
                                $('input.ta-member-select').typeahead({
                                    prefetch: `/staff/members.json?q=nomember`,
                                    limit: 20,
                                    remote: `/staff/members.json?q=%QUERY&with_terms=true&fields=term_id,name&division=${$('.project_division_id option:selected').val()}&start_date=${$('.start-date-selector').first().text()}`,
                                    open: function(event, ui) {
                                        var $input = $(event.target),
                                            $results = $input.autocomplete("widget"),
                                            top = $results.position().top,
                                            height = $results.height(),
                                            inputHeight = $input.height(),
                                            newTop = top - height - inputHeight;

                                        $results.css("top", newTop + "px");
                                    }
                                });
                                $('input.ta-member-select').on('typeahead:autocomplete', function(event, item) {
                                    selector = document.getElementById(event.currentTarget.attributes.name.value)
                                    selector.value = `${item.id}`
                                })
                                $('input.ta-member-select').on('typeahead:selected', function(event, item) {
                                    selector = document.getElementById(event.currentTarget.attributes.name.value)
                                    selector.value = `${item.id}`
                                })
                                $('.tt-hint').addClass('form-control')

                                if (jsonData.billing_type == "individual") {
                                    $('.project_default_leader_rate').parent().parent().remove()
                                    $('h2.rates-label').remove()
                                }
                                $('.project_pmt_quantity').parent().remove()
                                $('.member-input').append("<div class='form-group project_updated_children'><input class='form-control hidden' type='hidden'  name='project[updated_children]' id='project_updated_children' value=true></div>")
                                $('.member-input').append("<div class='form-group project_id_fm'><input class='form-control hidden' type='hidden'  name='project[id_fm]' id='project_id_fm' value=999999999></div>")

                                ending = true
                                $(`.body:eq(${currentIndex}) label.error`, form).remove();
                                $(`.body:eq(${currentIndex}) .error`, form).removeClass('error');
                                console.log(event)
                            },
                            complete: function() {
                                $("#form .term-input").remove();
                                $('#ajax-loading').hide();
                            },
                            error: function(m, d) {
                                setDangerAlert("There was an error in completing your project setup, please inform administrators")
                                ending = false
                            }
                        });
                    }
                    return ending
                } else if (currentIndex === 2) {
                    var ending;
                    $('#ajax-loading').show();
                    formData = $("form").serialize() + '&updated_children=' + true
                    $.ajax({
                        type: 'PUT',
                        url: `${$('#form').attr('action')}/?wizard=true&review=true&set_members=false`,
                        data: formData,
                        async: false,
                        dataType: 'json',
                        success: function(jsonData) {
                            var parent, projectSetupReviewHtml;
                            parent = $('.review');
                            if (jsonData.error !== 'No valid project') {
                                parent.empty();
                                console.log(jsonData)
                                projectSetupReviewHtml = HandlebarsTemplates['project_wizard_review']({
                                    project: jsonData
                                });
                                parent.replaceWith(projectSetupReviewHtml);
                                $('#status').val('pending');
                            }
                            ending = true
                        },
                        complete: function() {
                            $('.wizard .content').redraw();
                            $('#ajax-loading').hide();
                        },
                        error: function(e) {
                            setDangerAlert("Your project could not be saved, please click cancel and start over")
                        }
                    });
                    return ending
                } else {
                    if (currentIndex > newIndex) {
                        return true;
                    }
                    if (currentIndex < newIndex) {
                        $(`.body:eq(${newIndex}) label.error`, form).remove();
                        $(`.body:eq(${newIndex}) .error`, form).removeClass('error');
                    }
                    return form.valid()
                }
            },
            onStepChanged: function(event, currentIndex, priorIndex) {
                // Used to skip the "page if individual" step. Individaul projects don't add members until later
                const individual = document.getElementById("project_billing_type_individual").checked
                if (currentIndex === 2 && individual) {
                    console.log("skip")
                    $('#form').steps("next");
                }
            },
            onFinished: function(event, currentIndex) {
                var form;
                pid = $("#project_id").val()
                form = void 0;
                form = $(this);
                $.ajax({
                    type: 'PUT',
                    url: `${$('#form').attr('action')}/?finished=true`,
                    data: {
                        project: {
                            id: pid,
                            status: "draft"
                        }
                    },
                    dataType: 'json',
                    error: function(m) {
                        setDangerAlert("There was an error in completing your project setup, please inform administrators")
                    },
                    success: function() {
                        window.location.replace(`/staff/projects/${pid}`)
                    }
                });


            }
        }).validate({
            errorPlacement: function(error, element) {
                console.log(element)
                if (element.is(":radio")) {
                    error.appendTo(element.parent().parent().parent().find("label.control-label"));
                } else if (element.is(".date")) {
                    error.remove()
                } else {
                    element.before(error);
                }
            },
            rules: {
                'project[division_id]': 'required',
                'project[billing_type]': 'required',
            },
            messages: {
                'project[billing_type]': {
                    required: "You must select a billing type"
                }
            },
        });
        initializeDatepicker();
    });
}

$(function() {
    function hideProjectMembers() {
        $(".project-week-member-table").addClass("hide");
    };
    $("a.show-week-members").on('click', function() {
        hideProjectMembers();
        memberTable = $(this).attr("href");
        $(memberTable).removeClass("hide");
    });
    $("a.hide-week-members").on('click', function() {
        hideProjectMembers();
    });
});

$.fn.steps.setStep = function(step) {
    var currentIndex = $(this).steps('getCurrentIndex');
    for (var i = 0; i < Math.abs(step - currentIndex); i++) {
        if (step > currentIndex) {
            $(this).steps('next');
        } else {
            $(this).steps('previous');
        }
    }
};

var fetchMemberList = (el, cls) => {
    $.ajax({
        type: 'DELETE',
        url: `/staff/project_wizard/${pid.val()}`,
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        success: function(results) {
            location.reload();
        }
    })
}

const toggleBillingStyle = (el) => {
    toggleDueDate(el)
    toggleProjectMembers(el)
    toggleTitles(el)
}

const toggleDueDate = (el) => {
    const dueDate = document.getElementById("due-date")
    //const title = document.getElementById("title")
    const year = document.getElementById("project_due_date_1i")
    const month = document.getElementById("project_due_date_2i")
    const day = document.getElementById("project_due_date_3i")
    const requiredDueDateText = `<abbr title="required">*</abbr> Projected End Date`
    //const requiredTitleText = `<abbr title="required">*</abbr> Title`


    if (el.value == "org") {
        dueDate.classList.add("hidden")
        //title.classList.add("hidden")

        year.value = null
        month.value = null
        day.value = null

        year.required = false
        month.required = false
        day.required = false

        dueDate.firstChild.classList.remove("required")
        dueDate.firstChild.classList.add("optional")
    } else {
        dueDate.classList.remove("hidden")
        //title.classList.remove("hidden")
        //title.firstChild.innerHTML = requiredTitleText
        //title.firstChild.classList.add("required")
        //title.firstChild.classList.remove("optional")

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        //clearing out values so we don't send a due date
        year.value = yyyy
        month.value = mm
        day.value = dd

        year.required = true
        month.required = true
        day.required = true

        dueDate.firstChild.innerHTML = requiredDueDateText
        dueDate.firstChild.classList.add("required")
        dueDate.firstChild.classList.remove("optional")
    }
}

const toggleProjectMembers = (el) => {
    const termInput = document.getElementsByClassName("term-input")[0]
    const memberRates = document.getElementById("member-rates")

    if (el.value == "org") {
        termInput.classList.remove("hidden")
        memberRates.classList.remove("hidden")
    } else {
        termInput.classList.add("hidden")
        memberRates.classList.add("hidden")
    }
}

const toggleTitles = (el) => {
    const secondTitle = document.getElementById("form-t-1")
    const thirdTitle = document.getElementById("form-t-2")
    const fourthTitle = document.getElementById("form-t-3")

    if (el.value == "org") {
        thirdTitle.classList.remove("hidden")
        secondTitle.innerText = "2. Location & Financials"
        fourthTitle.innerText = "4. Review"
    } else {
        thirdTitle.classList.add("hidden")
        secondTitle.innerText = "2. Location & Contact"
        fourthTitle.innerText = "3. Review"
    }
}

const shortenDisplay = (short) => {
    const defaultLeaderRate = document.getElementById("default-leader-rate")
    const defaultMemberRate = document.getElementById("default-member-rate")
    const defaultMatchRate = document.getElementById("default-match-rate")
    const defaultAsstLeaderRate = document.getElementById("default-asst-leader-rate")
    const defaultAsstLeaderMatchRate = document.getElementById("default-asst-leader-match-rate")
    defaultLeaderRate.parentNode.classList.remove("hidden")
    defaultMemberRate.parentNode.classList.remove("hidden")
    defaultMatchRate.parentNode.classList.remove("hidden")
    defaultAsstLeaderRate.parentNode.classList.remove("hidden")
    defaultAsstLeaderMatchRate.parentNode.classList.remove("hidden")
    if (short === true) {
        defaultLeaderRate.parentNode.classList.add("hidden")
        defaultAsstLeaderRate.parentNode.classList.add("hidden")
        defaultAsstLeaderMatchRate.parentNode.classList.add("hidden")
        defaultMemberRate.firstChild.innerText = "Team Rate"
        defaultMatchRate.firstChild.innerText = "Match Rate"
    } else {
        defaultLeaderRate.firstChild.innerText = "Leader Rate"
        defaultMemberRate.firstChild.innerText = "Member Rate"
        defaultMatchRate.firstChild.innerText = "Match Rate"
        defaultAsstLeaderRate.firstChild.innerText = "Asst Leader Rate"
        defaultAsstLeaderMatchRate.firstChild.innerText = "Asst Leader Match Rate"
    }
}

const toggleCostUnitDisplay = (unit) => {
    switch (unit) {
        case "daily":
            shortenDisplay(false)
            break;
        case "weekly":
            shortenDisplay(true)
            break;
        case "flat_rate":
            shortenDisplay(true)
            break;
        case "hourly":
            shortenDisplay(false)
            break;
        default:
            shortenDisplay(true)
            break;
    }
}


$("#form").on('change', '#project_default_invoice_unit', function() {
    const invoiceUnitInput = document.getElementById("project_default_invoice_unit")
    toggleCostUnitDisplay(invoiceUnitInput.value)
});
