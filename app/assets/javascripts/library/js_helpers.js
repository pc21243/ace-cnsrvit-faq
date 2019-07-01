// Added for universal string find inside an array
Array.prototype.findString = function(regex) {
  return this.reduce(function (acc, curr, index, arr) {
    if (regex.test(curr)) { acc.push(index); }
    return acc;
  }, [ ]);
}

const setAttributes = (el, attrs) => {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}

 hasClass = (ele,cls) => {
  vv = ele.classList.contains(cls)
  return vv
}

 addClass = (ele,cls) => {
  if (!hasClass(ele,cls)) ele.className += ` ${cls}`
}

 removeClass = (ele,cls) => {
  if (hasClass(ele,cls)) {
    let reg = new RegExp('(\\s|^)'+cls+'(\\s|$)')
    ele.className=ele.className.replace(reg,' ')
  }
}

 humanize = (str) => {
  let words = str.replace(/_/g, ' ').split(' ')
  words.forEach(function(word, idx) {
    words[idx] = word.charAt(0).toUpperCase() + word.slice(1)
  })
  return words.join(' ')
}


const underscorize = (str) => {
  let words = str.replace(/ /g, '_').split('_')
  words.forEach(function(word, idx) {
    words[idx] = word.charAt(0).toLowerCase() + word.slice(1)
  })
  return words.join('_')
}

$.fn.redraw = function() {
    $(this).each(function() {
        var redraw;
        redraw = this.offsetHeight;
    });
};

 insertAfter = (el, referenceNode) => {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

closest = (el, predicate) => {
  return predicate(el) ? el : (
     el && closest(el.parentNode, predicate)
  );
}

currencyWithCommas = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
