Handlebars.registerHelper('times', function(n, block) {
  let accum, i;
  accum = '';
  i = 0;
  while (i < n) {
    accum += block.fn(i);
    ++i;
  }
  return accum;
});

Handlebars.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});
Handlebars.registerHelper('to_upper', function(str, options) {
  return str.toUpperase();
});
Handlebars.registerHelper('to_lower', function(str, options) {
  return str.toLowerCase();
});
Handlebars.registerHelper('if_eq', function(a, b, opts) {
  if (a === b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

Handlebars.registerHelper('debug', function(data, breakpoint) {
  console.log(data);
  if (breakpoint === true) {
    debugger;
  }
  return '';
});
