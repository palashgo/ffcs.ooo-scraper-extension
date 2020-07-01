document.body.style.border = "5px solid #7c87e8";

var s = document.createElement('script');
s.src = chrome.extension.getURL('injected.js');
document.documentElement.appendChild(s);

function loadAndSend(urlPattern) {

	var winImage = $("#winImage").val();
	var authorizedID = $("#authorizedIDX").val();
	console.log($.ajax);
	var http = XPCNativeWrapper(new window.wrappedJSObject.XMLHttpRequest());
	var url = urlPattern;
	var data = "verifyMenu=true&winImage=" + winImage + "&authorizedID=" + authorizedID + "&nocache=@(new Date().getTime())";
	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
	http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
        	var resp = { "url": urlPattern, "data": http.responseText, "ID": authorizedID };
			console.log(resp);
			browser.runtime.sendMessage(
				resp,
					function (response) {
					console.log(response);
				}
			);
    	}
	}
	http.send(data);

}
console.log($.ajax);

window.addEventListener("message", function (event) {
	if (event.data.type && (event.data.type == "start_data_sync")) {
		console.log('Doing load and send');
		loadAndSend('examinations/examGradeView/StudentGradeHistory');
		loadAndSend('academics/common/Curriculum');
	}
}, false);




