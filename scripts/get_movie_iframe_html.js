/*jshint esnext: true */ //you should set this option so JSHint doesn't raise unnecessary warnings

const {ipcRenderer} = require('electron');

function findIframeDocument() {
  var singleDiv = document.getElementById('single');
  var trayDiv = singleDiv.getElementsByClassName('tray')[0];
  var iframe = trayDiv.getElementsByClassName('ifram')[0];
  var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

  return iframeDocument;
}

function constuctHTML(head, body) {
  return "<!DOCTYPE html><html><head>" + head + "</head><body>" + body + "</body></html>";
}

function sendHTMLtoMainProcess(html) {
  ipcRenderer.send('iframe_body_html_retrieved', html);
}

var iframeDocument = findIframeDocument();

var head = iframeDocument.head.innerHTML;
var body = iframeDocument.body.innerHTML;
var html = constuctHTML(head, body);

sendHTMLtoMainProcess(html);
