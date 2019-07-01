//=require handlebars.js
//=require handlebars_helpers
//=require_tree ./templates


  updateTotals = () => {
    let serviceRows = document.querySelectorAll(".service, .wcc, .training, .overtime, .doubletime")
    rowTotal = 0
    serviceRows.forEach(function (row, idx) {
      sum = sumHours(row.querySelectorAll(".hoursinput"))
      row.querySelectorAll(".rowtotal span.hours")[0].innerHTML = sum
      rowTotal += sum
    })
    document.getElementById('hours-total').innerHTML = `${rowTotal} `
  }
  sumHours = (items) => {
    let itemCount = items.length;
    let total = 0;
    items.forEach(function(item, idx){
      total = total + parseInt(item.value)
    })
    return total
  }


$(function() {

  enablePopulateLink = function(){
  }

  fetchTimesheetData = function(arg) {
    let data, options;
    data = arg.data;
    options = arg.options;
    console.log(options.dataType)
    urlOptions = Object.entries(options).map(([key, val]) => `${key}=${val}`).join('&')
    $('#ajax-loading').show();
    $.ajax({
      type: 'GET',
      url: options.fetchUrl + "?" + urlOptions,
      data: data,
      dataType: options.dataType,
      success: function(jsonData) {
      console.log(jsonData[0].id)
      if (jsonData[0].id) {
        let parent, replaceHtmlVal, templateInfo;
        parent = void 0;
        replaceHtmlVal = void 0;
        parent = $(options.parentEl);
        if (jsonData.error !== 'No valid project week') {
          parent.empty();
          templateInfo = {}
          templateInfo[options.objectName] = jsonData;
          replaceHtmlVal = HandlebarsTemplates[options.template](templateInfo);
          parent.html(replaceHtmlVal);
        }
      }
        return $('#ajax-loading').hide();
      },
      error: function(textMessage, err) {
        $('#ajax-loading').hide();
        console.log(err)
        console.log(textMessage)
        let error = "<div class='notif'> <div class='alert alert-danger alert-dismissible', role='alert'> " + err +"</div> </div>";
        return $("#notifications").html(error);
      }
    });
  };

  $('#timesheet-master').on('input', '#hours', function(e) {
    link = $(this).parent().parent().parent().find("a")
    if ($(this).val().length > 0 ){
      link.attr("disabled", false)
    }
  })

  divisionId = $('*[data-division]').data("division");
  if (divisionId) {
    options = {
      objectName: "projects",
      template: "timesheets_project_list",
      parentEl: "#timesheet-data",
      fetchUrl: "/timesheets/fetch_projects",
      params: "['division_id']"
    };
    new fetchTimesheetData({
      data: {
        divisionId: divisionId
      },
      options: options
    });
  }

  $('#timesheet-master').on('click', '.pj-selector', function(e) {
    let projectId = $(this).attr('class').split(' ')[$(this).attr('class').split(' ').findString(/project/)].split('-')[1];
    options = $(this).data();
    return new fetchTimesheetData({
      data: {
        project_id: projectId
      },
      options: options
    });
  });


  $('#timesheet-data').on('change', '.hours-type-select', function(e) {
    initialClass = (e.currentTarget.parentNode.parentNode.className.split(" ")).find(obj => {
       return obj != '-'
    })
    selected = e.currentTarget[e.currentTarget.selectedIndex]
    cssClass = selected = e.currentTarget[e.currentTarget.selectedIndex].value
    addClass(e.currentTarget.parentNode.parentNode, cssClass)
    removeClass(e.currentTarget.parentNode.parentNode, initialClass)
    if (cssClass == "wcc"){
      removeClass( e.currentTarget.parentNode.getElementsByClassName("workers-comp-code-select")[0], "hide")
    }
  })

  $('#timesheet-data').on("shown.bs.popover", function() {
  $('.popover-content').on('change', '.week-type-selector', function(e) {
    $(e.currentTarget.parentNode.parentNode).popover('hide')
    dataEl = e.currentTarget.parentNode.parentNode.parentNode.getElementsByClassName("addrowbutton")[0]
    cssClass = dataEl.dataset.target
    el = document.getElementsByClassName(cssClass)[0]
    row = el.cloneNode(true)
    for (let item of row.getElementsByClassName("hoursinput")) { item.value = 0 }
    insertAfter(row,el)
  })
  });
  $('#timesheet-data').on('change', '.week_type', function(e) {
    console.log(e)
    cssClass = e.currentTarget.dataset.target
    el = document.getElementsByClassName(cssClass)[0]
    row = el.cloneNode(true)
    for (let item of row.getElementsByClassName("hoursinput")) { item.value = 0 }
    insertAfter(row,el)
  })

  $('#timesheet-data').on('click', '.edit-lunch-button', function(e) {
    cssClass = e.currentTarget.dataset.target
    el = document.getElementsByClassName(cssClass)
    if (el[0].style.display == "table-row"){
      el[0].style.display = "none"
    } else {
      el[0].style.display = "table-row"
    }
  })

  $('#timesheet-data').on('click', '.populate-crew a', function(e) {
    e.preventDefault()
    console.log(this)
    hours = $(this).parent().find("#hours").val()
    week = $(this).data("week-updater")
    days = $(this).parent().find(".dows")
    people = $(this).parent().find(".pwm-member-checkbox")
    selected = [];
    days.each(function() {
      day = $(this).find('input:checked');
      if ( day.length >0){
      selected.push(day.attr('name'));
      }
    });
    selectedDays = selected.filter( i => i)
    selected = [];
    people.each(function() {
      person = $(this).find("input:checked")
      if (person.length > 0){
        selected.push(person.attr("id").split("-")[2]);
      }
    });
    selectedPeople = selected.filter( i => i)
    updateWeek = $('*[data-week='+week+']');
    if (updateWeek.length > 0) { 
      updateWeek.find("tr.service").each(function(i){
        $(this).find('input.hoursinput').val(0)
        // fnd people rows from selectedPeople arr
        selectedPeople.forEach(function(personId){
          // find day inputs fromm selectedDays arr
          row = updateWeek.find("tr.member-hours-"+personId)
          row.each(function(i){
            // apply hours
            selectedDays.forEach(function(dayName){
              workDays = row.find('input.hoursinput')
              workDays.each(function(i){
                workDay = $(this)
                if (workDay.data("work-day") == dayName) {
                  if (workDay.parent().parent().hasClass("service")){
                    workDay.val(hours)
                    workDay.attr("name", workDay.attr("name").replace(/hours/,workDay.parent().parent().find("option:selected").val()))
                  } else if (workDay.parent().parent().hasClass("lunch")){
                    workDay.val(0.5)
                  }
                }
              })
            })
          })
        })

      })
    }
          updateTotals()
  });

});
