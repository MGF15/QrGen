/* QRGen */

function qrcode(text) {
	document.getElementById("qr").innerHTML = "";
	document.getElementById("qr").title = text;
	jQuery('#qr').qrcode({correctLevel: 1,text:text});
}

function save(){
	url = document.getElementsByTagName("canvas")[0].toDataURL();
	url = url.replace("data:image/png;base64,","");
	url = base64js.toByteArray(url);
	var blob = new Blob([url], {type: "image/png"});
	url = URL.createObjectURL(blob);
	var downloading = browser.downloads.download({
	filename: "qrcode.png",
	url : url,
	});
	
}
function logTabs(tabs) {
 
	var url = tabs[0].url;
	qrcode(url); 
  
}

var querying = browser.tabs.query({currentWindow: true, active: true});
querying.then(logTabs);
var sav = document.getElementById("save");
sav.onclick = function() { 
	    save();
}


