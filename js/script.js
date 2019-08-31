document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze() {
	keyPhrases();
	language();
	sentiment();
}

function language() {
	var reqBody = {
		documents: [{
			language: "en",
			id: 1,
			text: document.getElementById("input").value
		}]
	};

	var myHeader = new Headers({
		"Content-Type": "application/json",
		"Ocp-Apim-Subscription-Key": "ACCESS_KEY"
	});

	var initObject = {
		method: "POST",
		body: JSON.stringify(reqBody),
		headers: myHeader
	};

	var request = new Request("https://testtextanal.cognitiveservices.azure.com/text/analytics/v2.1/languages?",
		initObject
	);

	fetch(request)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(new Error(response.statusText));
			}
		})
		.then(function (response) {
			document.getElementById("language").innerHTML =
				"<h5>" + response.documents[0].detectedLanguages[0].name + "</h5>";
		})
		.catch(function (err) {
			alert(err);
			document.getElementById("output").innerHTML = "";
		});
}

function keyPhrases() {
	var reqBody = {
		documents: [{
			language: "en",
			id: 1,
			text: document.getElementById("input").value
		}]
	};

	var myHeader = new Headers({
		"Content-Type": "application/json",
		"Ocp-Apim-Subscription-Key": "ACCESS_KEY"
	});

	var initObject = {
		method: "POST",
		body: JSON.stringify(reqBody),
		headers: myHeader
	};

	var request = new Request("https://testtextanal.cognitiveservices.azure.com/text/analytics/v2.1/keyPhrases",
		initObject
	);

	fetch(request)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(new Error(response.statusText));
			}
		})
		.then(function (response) {
			document.getElementById("keyPhrases").innerHTML =
				"<h5>" +
				response.documents[0].keyPhrases.length +
				"</h5>" +
				"</br>" +
				response.documents[0].keyPhrases;
		})
		.catch(function (err) {
			alert(err);
			document.getElementById("output").innerHTML = "";
		});
}

function sentiment() {
	var reqBody = {
		documents: [{
			language: "en",
			id: 1,
			text: document.getElementById("input").value
		}]
	};

	var myHeader = new Headers({
		"Content-Type": "application/json",
		"Ocp-Apim-Subscription-Key": "ACCESS_KEY"
	});

	var initObject = {
		method: "POST",
		body: JSON.stringify(reqBody),
		headers: myHeader
	};

	var request = new Request("https://testtextanal.cognitiveservices.azure.com/text/analytics/v2.1/sentiment?",
		initObject
	);

	fetch(request)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(new Error(response.statusText));
			}
		})
		.then(function (response) {
			var sentiment = response.documents[0].score;
			document.getElementById("sentiment").innerHTML =
				"<h5>" +
				sentiment +
				"</h5>"
		})
		.catch(function (err) {
			alert(err);
			document.getElementById("sentiment").innerHTML = "Error";
		});
}
var input = document.getElementById("myFile");
var output = document.getElementById("input");


input.addEventListener("change", function () {
	if (this.files && this.files[0]) {
		var myFile = this.files[0];
		var reader = new FileReader();

		reader.addEventListener('load', function (e) {
			output.textContent = e.target.result;
		});

		reader.readAsBinaryString(myFile);
	}
});