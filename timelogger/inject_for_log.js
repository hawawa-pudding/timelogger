var injectScript;

injectScript = function(file, node) {
  var s, th;
  th = document.getElementsByTagName(node)[0];
  s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  return th.appendChild(s);
};


window.addEventListener('DOMContentLoaded', ()=>{
  const messElement = document.querySelector("#message");
  while (messElement.firstChild) {
    messElement.removeChild(messElement.firstChild);
  }

    injectScript(chrome.runtime.getURL('main_for_log.js'), 'body');
});