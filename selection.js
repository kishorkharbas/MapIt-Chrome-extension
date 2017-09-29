console.log("Adding listener in content script")
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection") {
    var sel = window.getSelection();
    var selectedText = sel.toString();
    console.log("getSelection requested, sending \""+selectedText+"\"")
    if(selectedText)
      sendResponse({data: selectedText})
  }
  else {
  	//alert("sending request for something else");
    console.log("received unidentified message")
  }
});

