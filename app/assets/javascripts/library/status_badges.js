//FIXME make sure this aligns with helper from rails
const statuses = {
    "unsent": "plain",
    "closed": "plain",
    "in_service": "primary",
    "sent": "primary",
    "waiting_for_others": "primary",
    "signed": "primary",
    "autoresponded": "primary",
    "created": "primary",
    "delivered": "primary",
    "faxpending": "primary",
    "unallocated": "primary",
    "allocated": "primary",
    "reserved": "primary",
    "assigned": "primary",
    "reduced_part_time": "primary",
    "part_time": "primary",
    "full_time": "primary",
    "new_hire": "primary",
    "extension": "primary",
    "rehire": "primary",
    "two_part_fbi_check": "primary",
    "approved": "primary",
    "resubmitted": "primary",
    "filled": "primary",
    "three_part_check": "info",
    "minimum_time": "info",
    "accepted": "info",
    "initiated": "info",
    "corps_member": "info",
    "two_part_state_check": "success",
    "all_results_received": "success",
    "quarter_time": "success",
    "active": "success",
    "paid": "success",
    "exited": "success",
    "completed": "success",
    "cleared": "success",
    "cleared_for_service": "success",
    "inactive": "warning",
    "pending": "warning",
    "draft": "warning",
    "enrolling": "warning",
    "suspended": "warning",
    "expired": "danger",
    "rejected": "danger",
    "exited_early": "danger",
    "error": "danger",
    "disabled": "danger",
    "used": "danger",
    "disqualified": "danger",
    "declined": "danger",
    "incomplete": "danger",
    "pre_quoted": "grey",
    "quoted": "grey",
    "recruiting": "grey",
    "remaining": "grey",
    "not_applicable": "grey",
    "crew_leader": "grey",
    "low": "primary",
    "medium": "info",
    "high": "success",
    "critical": "warning"

}

titleize = word => {
    if (!word.split("_")) {
        return word;
    }
    var _titleizeWord = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        },
        result = [];
    word.split("_").forEach(function(w) {
        result.push(_titleizeWord(w));
    });
    return result.join(" ");
}


statusBadge = (status) => {

    return (
        template = `
            <div>
              <small>
                <div>
                  <span class="badge badge-${statuses[status]} status_badge" data-badge-label="data-badge-${statuses[status]}">${titleize(status)}</span>
                </div>
              </small>
            </div>
        `
    )
}

console.log("status badges are loaded")