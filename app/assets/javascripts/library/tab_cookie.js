$(function() {
    return $('.tab-tastic').on('shown.bs.tab', function(e) {
        var target, id, title, urlSplit;
        target = e.target.getAttribute("href")
        urlSplit = window.location.href.split("/")
        id = urlSplit.pop()
        title = urlSplit.pop()
        return setCookie(`${title}_tab_${id}`, target, 1);
    });
});

$(function() {
    var neededTab, tabCookie, id, urlSplit, title;
    urlSplit = window.location.href.split("/")
    id = urlSplit.pop()
    title = urlSplit.pop()
    tabCookie = getCookie(`${title}_tab_${id}`);
    if (typeof tabCookie === 'undefined') {

    } else {
        neededTab = $('a[href="' + tabCookie + '"]');
        return neededTab.tab('show');
    }
});