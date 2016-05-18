function Application(options) {

  var view = options.view;

  function boot() {
    _bindUpdateEvents();
  }

  function _bindUpdateEvents() {
    document.getElementById('process').addEventListener('click', _process);
  }

  function _process() {
    var data = Papa.parse(view.csv()).data;

    data.forEach(_renderRow);
  }

  function _renderRow(row, index, rows) {
    function replacer(match, p1) {
      return row[parseInt(p1)];
    }
    var template = view.template();
    var compiledTemplate = template.replace(/{{(\d+)}}/gi, replacer);

    view.append(compiledTemplate);
  }

  return {
    boot: boot
  }
}

function ApplicationView() {

  function append(text) {
    var div = document.getElementById('output');
    div.innerHTML = div.innerHTML + text;

    var code = document.getElementById('code');
    code.innerHTML = code.innerHTML + text;
  }

  function csv() {
    return document.getElementById('csv').value;
  }

  function template() {
    return document.getElementById('template').value;
  }

  return {
    append: append,
    csv: csv,
    template: template
  }
}
