var originalXHR = XMLHttpRequest;
XMLHttpRequest = function()
{
    var ret = new originalXHR();
    ret.addEventListener('load', function(e)
    {
		console.log(e.srcElement.responseURL);
		if (e.srcElement.responseURL == "https://vtop.vit.ac.in/vtop/academics/common/Curriculum"){
            setTimeout(function(){
				window.postMessage({ type: "start_data_sync" }, "*");
				console.log("Starting data sync");
            },5000);
        }
    });
    return ret;
};
