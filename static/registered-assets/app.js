window.onload = function() {
	var url = 'https://assets.blockstream.info/';
	var registeredAssets = new XMLHttpRequest();
	registeredAssets.open("GET", url);
	registeredAssets.onload = function() {
		displayData(JSON.parse(registeredAssets.responseText));
	}
	registeredAssets.send();
}

function displayData(data){
	var htmlString = '';
	document.getElementById('table').innerText='';
	document.getElementById('table').innerHTML="<thead><tr><th style='font-weight:600;'>Asset Name</th><th style='font-weight:600;'>Ticker</th><th style='font-weight:600;'>Asset ID</th></tr></thead>";
	for (var i in data){
		console.log(data[i]);
		htmlString += "<tr>";
		htmlString += "<td><a target='_blank' href=http://www."+data[i]['contract']['entity']['domain']+">"+data[i]['contract']['name']+"</a></td>";
		htmlString += "<td>"+data[i]['contract']['ticker']+"</td>";
		htmlString += "<td>"+data[i]['asset_id']+"</td>";
		htmlString += "</tr>";
		i++;
	}
	document.getElementById('table').insertAdjacentHTML('beforeend', htmlString);
}