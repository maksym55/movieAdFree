/*jshint esnext: true */ //you should set this option so JSHint doesn't raise unnecessary warnings

const {ipcRenderer} = require('electron');

function findIframeWindow() {
  var singleDiv = document.getElementById('single');
  var trayDiv = singleDiv.getElementsByClassName('tray')[0];
  var iframe = trayDiv.getElementsByClassName('ifram')[0];
  var iframeWindow = iframe.contentWindow;

  return iframeWindow;
}

function timeout(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, ms);
  });
}

var iframeWindow = findIframeWindow();
var iframeDocument = iframeWindow.document;

iframeWindow.showVideo();

/* test: remove extra elements from DOM
function cutExtraNodes(iframeDocument) {
  var MToverrollDiv = iframeDocument.getElementById('MToverroll');
  var childs = MToverrollDiv.parentNode.childNodes;
  console.log("lenght = " + childs.length);
  for (i = 0; i < childs.length; i++) {
    var element = childs[i];
    if (element.id != 'MToverroll') {
      element.parentNode.removeChild(element);
    }
  }
  childs = MToverrollDiv.parentNode.childNodes;
  console.log("lenght after = " + childs.length);
}
*/

/* test: send events from second iframe
var iframe2 = iframeDocument.getElementsByTagName('IFRAME')[0];
var window2 = iframe2.contentWindow;

timeout(5000)
.then(value => {
  console.log("send to main load");
  window2.sendToMain("load");
  return timeout(5000);
})
.then(value => {
  console.log("send to main play");
  window2.sendToMain("play");
  return timeout(5000);
})
.then(value => {
  console.log("send to main fin");
  window2.sendToMain("auto");
});
*/


/* test: click
var movieBlock = iframeDocument.getElementsByClassName('movie-block')[0];
setTimeout(function() {
  var clickEvent = new MouseEvent("click", {
      "view": iframeWindow,
      "bubbles": true,
      "cancelable": false
  });

  movieBlock.dispatchEvent(clickEvent);
});
*/
