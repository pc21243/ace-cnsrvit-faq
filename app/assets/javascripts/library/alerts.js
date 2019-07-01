removeAlert = () => {
    $(".notif").delay(4000).fadeTo(3000, 500).slideUp(500, function() {
        console.log("remove Alert")
        $(".notif").slideUp(500);
        $(".notif").remove()
    });
}

messageTemplate = (action, message) => {
    return (
        template = `
          <div class="notif">
            <div class="alert alert-${action} alert-dismissible z-depth-1" role="alert">
              <button class="close" data-dismiss="alert" type="button">
                <span aria-hidden="true">x</span><span class="sr-only">"Close"</span>
              </button>
              <div>${message}</div>
            </div>
          </div>
        `
    )
}


setAlert = (action, message) => {
    let notification, newNode

    notification = document.getElementById('notifications')
    newNode = document.createElement('div');

    notification.firstChild.nextSibling.before(newNode)
    notification.firstChild.nextSibling.innerHTML = messageTemplate(action, message)

    removeAlert()
}

setDangerAlert = (errorMessage) => {
    setAlert("danger", errorMessage)
}

setWarningAlert = (errorMessage) => {
    setAlert("warning", errorMessage)
}

setInfoAlert = (errorMessage) => {
    setAlert("info", errorMessage)
}

setSuccessAlert = (errorMessage) => {
    setAlert("success", errorMessage)
}