document.body.style.border = "5px solid #7c87e8";


var s = document.createElement('script');
s.src = chrome.extension.getURL('injected.js');
document.documentElement.appendChild(s);

function loadAndSend(urlPattern) {

	var winImage = $("#winImage").val();
	var authorizedID = $("#authorizedIDX").val();

	$.ajax({
		type: "POST",
		url: urlPattern,
		data: "verifyMenu=true&winImage=" + winImage + "&authorizedID=" + authorizedID + "&nocache=@(new Date().getTime())",
		success: function (data, textStatus, request) {
			var status = request.status;
			var resp = { "url": urlPattern, "data": data, "ID": authorizedID };
			chrome.runtime.sendMessage(
				resp,
					function (response) {
					console.log(response);
				}
			);

		},
		error: function (request, textStatus, errorThrown) {
		}
	});
}


window.addEventListener("message", function (event) {
	console.log(event.data.typr);
	if (event.data.type && (event.data.type == "start_data_sync")) {
		loadAndSend('examinations/examGradeView/StudentGradeHistory');
		loadAndSend('academics/common/Curriculum');
		// loadAndSend('academics/common/StudentTimeTable');
	}
}, false);




