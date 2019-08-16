var newSearch = document.getElementById('submitReq');
newSearch.addEventListener('click', function() {
	var searchData = document.getElementById('requestData').value;
	getData(searchData);
});

function getData(reqData) {
	// if (asset) {
	// 	var url = 'https://blockstream.info/liquid/api/address/'+reqData;
	// 	var exploreRequest = new XMLHttpRequest();
	// 	exploreRequest.open("GET", url);
	// 	exploreRequest.onload = function() {
	// 		displayAsset(JSON.parse(exploreRequest.responseText));
	// 	}
	// 	exploreRequest.send();
	// } else if (address) {
	//
	// } else if (transaction) {
	// 	var url = 'https://blockstream.info/liquid/api/tx/'+reqData;
	// 	var exploreRequest = new XMLHttpRequest();
	// 	exploreRequest.open("GET", url);
	// 	exploreRequest.onload = function() {
	// 		displayData(JSON.parse(exploreRequest.responseText));
	// 	}
	// 	exploreRequest.send();
	// } else if (block) {
		var url = 'https://blockstream.info/liquid/api/block/'+reqData;
		var exploreRequest = new XMLHttpRequest();
		exploreRequest.open("GET", url);
		exploreRequest.onload = function() {
			displayBlock(JSON.parse(exploreRequest.responseText));
		}
		exploreRequest.send();
	// }
}

function displayAsset(data){
	var htmlString = '';
	document.getElementById('').innerText='';
	document.getElementById('').innerHTML='';
	for (var i in data){
		console.log(data[i]);
		i++;
	}
	document.getElementById('').insertAdjacentHTML('beforeend', htmlString);
}

function displayAddress(data){
	var htmlString = '';
	document.getElementById('table').innerText='';
	for (var i in data){
		console.log(data[i]);
		htmlString += "<tr>";
		if (i == 'chain_stats'){
			for (var x in i){
				htmlString += "<td>"+x+"</td><td>"+data[x]+"</td>";			
			}
		} else {
			htmlString += "<td>"+i+"</td><td>"+data[i]+"</td>";			
		}
		htmlString += "</tr>";
		i++;
	}
	console.log(htmlString);
	document.getElementById('table').insertAdjacentHTML('beforeend', htmlString);
}

// function displayTx(data){
// 	var htmlString = '';
// 	document.getElementById('table').innerText='';
// 	for (var i in data){
// 		console.log(data[i]);
// 		i++;
// 	}
// 	document.getElementById('').insertAdjacentHTML('beforeend', htmlString);
// }

function displayBlock(data){
	var htmlString = '';
	document.getElementById('table').innerText='';
	for (var i in data){
		console.log(data[i]);
		htmlString += "<tr>";
		if (i !== 'proof'){
			htmlString += "<td>"+i+"</td><td>"+data[i]+"</td>";			
		}
		htmlString += "</tr>";
		i++;
	}
	document.getElementById('table').insertAdjacentHTML('beforeend', htmlString);
}