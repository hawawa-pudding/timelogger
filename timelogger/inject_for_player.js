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
    injectScript(chrome.runtime.getURL('main_for_player.js'), 'body');
    console.log("Done");
});