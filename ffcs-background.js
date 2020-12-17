chrome.runtime.onMessage.addListener(
    async function(message, sender, sendResponse) {
		$.post('https://ffcs.ooo/api/ext/processExtensionData', message, async function(data) {
			console.log(message);
			sendResponse(data);
			sendResponse("OK");
		});
    }
);
