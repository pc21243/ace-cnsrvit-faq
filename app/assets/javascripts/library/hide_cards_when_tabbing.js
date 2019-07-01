// Hide card when new tab
console.log("tab-tastic tab hiding is a go!")
$(function() {
    return $('.tab-tastic').on('shown.bs.tab', function(e) {
        let el, tabElement
        el = e.target
        tabElement = el.classList.contains("tab-tastic")
        if (tabElement) {
            let cardsCollection = document.getElementsByClassName("tab-tastic-card")
            let cards = [...cardsCollection]
            for (let card in cards) {
                card = cards[card]
                card.classList ? card.classList.remove("active") : null

            }
        }
    });
});