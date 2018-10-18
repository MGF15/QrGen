/* QRGen */

function getid(tabs){

	id = tabs[0].id;
	browser.pageAction.show(id);
};

var querying = browser.tabs.query({
	currentWindow: true,
	active: true
});

querying.then(getid);

browser.contextMenus.create({
  id: "show",
  title: "Make Qrcode",
  contexts: ["link","selection"]
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
    
    if (info.selectionText != undefined){
	qrdata = "qrtext";
	info = info.selectionText;
      
	}
    else if(info.linkUrl != undefined){
	qrdata = "qrlink";
	info = info.linkUrl;
	}

     browser.pageAction.setPopup({
        tabId:tab.id,
        popup: "/qr.html?qrgen=" + qrdata + "&qrdata=" +  info
	}); 
      
      browser.pageAction.openPopup()
});

function handleActivated(activeInfo) {
  var id = activeInfo.tabId;
   browser.pageAction.setPopup({
        tabId:id,
        popup: "/qr.html"
	}); 
  browser.pageAction.show(id);
};

browser.tabs.onActivated.addListener(handleActivated);

function handleUpdated(tabId) {
   browser.pageAction.setPopup({
        tabId:tabId,
        popup: "/qr.html"
	}); 
  browser.pageAction.show(tabId);
};

browser.tabs.onUpdated.addListener(handleUpdated);

