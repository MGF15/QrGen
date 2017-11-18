/* QRGen */

function qrcode(text) {
	$("#qr").html(""); // clean dev for new qrcode 
	$("#qr").prop("title",text);
	$("#qr").qrcode({correctLevel: 1,text:text});
}

function saveqr(){
	canvas = $("canvas")[0].toDataURL();
	base64 = canvas.replace("data:image/png;base64,","");
	url = base64js.toByteArray(base64);
	blob = new Blob([url], {type: "image/png"});
	link = URL.createObjectURL(blob);
	downloading = browser.downloads.download({
	filename: "qrcode.png",
	url : link,
	});
	
}
function run(tabs) {

	var data = new URL(document.URL);
	da  = data.searchParams.get("qrgen");
	
	if (da != null){
		if (da == "qrtext"){
			text = data.searchParams.get("qrdata");
			qrcode(text);
	
		}
		else if(da == "qrlink"){
			link = document.URL.split("&qrdata=")[1]
			qrcode(link);
		}

		browser.pageAction.setPopup({
		   tabId:tabs[0].id,
        	   popup: "/qr.html"
			});

	}
	else {
		var qrurl = tabs[0].url;
		qrcode(qrurl);
  	}
	
	var save = document.getElementById("save");
	save.onclick = function() { 
	    saveqr();
	}
}

var querying = browser.tabs.query({
	currentWindow: true,
	active: true
});

querying.then(run);
