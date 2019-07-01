$(function() {
    return $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target, id, title, urlSplit, amIATab;
        target = e.target.getAttribute("href")
        urlSplit = window.location.href.split("/")
        id = urlSplit.pop()
        title = urlSplit.pop()
        amIATab = e.target.classList.contains("tab-tastic")
        return amIATab ? null : setCookie(`${title}_card_${id}`, target, 1);
    });
});

$(function() {
    var neededTab, cardCookie, id, urlSplit, title;
    urlSplit = window.location.href.split("/")
    id = urlSplit.pop()
    title = urlSplit.pop()
    cardCookie = getCookie(`${title}_card_${id}`);
    if (typeof cardCookie === 'undefined') {

    } else {
        neededTab = $('a[href="' + cardCookie + '"]');
        return neededTab.tab('show');
    }
});