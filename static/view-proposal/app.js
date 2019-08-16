getProp();
getAccept();

function getProp(){
	var urlParams = new URLSearchParams(location.search);
	var proposalId = urlParams.get('id');
	// Get proposal data
	var url = 'https://liquid.supply/proposal-data/'+proposalId;
	var proposalData = new XMLHttpRequest();
	proposalData.open("GET", url);
	proposalData.onload = function() {
		displayData(JSON.parse(proposalData.responseText))
	}
	proposalData.send();
}

function getAccept(){
	var urlParams = new URLSearchParams(location.search);
	var proposalId = urlParams.get('id');
	// Get proposal acceptance data
	var acceptUrl = 'https://liquid.supply/accept-data/'+proposalId;
	var acceptData = new XMLHttpRequest();
	acceptData.open("GET", acceptUrl);
	acceptData.onload = function() {
		displayAccept(JSON.parse(acceptData.responseText))
	}
	acceptData.send();
}

function displayData(data){
	var htmlString = '';
	var propString = '';
	for (var i in data){
		htmlString += "<tr class='swap' id='proposal_"+i+"'>";
		htmlString += "<td>"+data[i]['post_date']+"</td>";
		htmlString += "<td>"+data[i]['base_cur']+"</td><td>"+data[i]['base_amt']+"</td><td>"+data[i]['sec_cur']+"</td><td>"+data[i]['sec_amt']+"</td>";
		htmlString += "</tr>";
		propString += "<div><strong>Proposal:</strong> <br/><textarea class='form-control' rows='4' readonly>"+data[i]['proposal']+"</textarea></div><br/>";
		propString += "<div><strong>Encryption instructions:</strong> <br/><textarea class='form-control' rows='4' readonly>"+data[i]['pgp_key']+"</textarea></div><hr>";
		i++;
	}
	document.getElementById('swap-holder').insertAdjacentHTML('beforeend', htmlString);
	document.getElementById('swap-holder').insertAdjacentHTML('afterend', propString);
}

function displayAccept(data){
	console.log(data);
	document.getElementById('swap-acceptance').innerText='';
	document.getElementById('swap-acceptance').innerHTML='<h2>Acceptance Receipts</h2>';
	var htmlString = '';
	for (var i in data){
		htmlString += "<p><strong>"+data[i]['post_date']+"</strong></p>";
		htmlString += "<textarea readonly class='form-control' rows='5'>"+data[i]['acceptance']+"</textarea>";
		htmlString += "<hr>";
	}
	document.getElementById('swap-acceptance').insertAdjacentHTML('beforeend', htmlString);
}

var submitAccept = document.getElementById('acceptSubmit');
submitAccept.addEventListener('click', function() {
	var acceptance = document.getElementById('acceptProposal').value;
	acceptance = encodeURIComponent(acceptance);
	
	if (acceptance == null || acceptance == ''){
		console.log('Empty!');
	} else {
		document.getElementById('responseBar').innerHTML='';
		document.getElementById('responseBar').innerHTML='<img src="https://media1.tenor.com/images/d6cd5151c04765d1992edfde14483068/tenor.gif" />';
		
		var urlParams = new URLSearchParams(location.search);
		var proposalId = urlParams.get('id');
		var url = 'https://liquid.supply/accept?swap_id='+proposalId+"&accepted="+acceptance;
		var url = encodeURI(url);
		var addAccept = new XMLHttpRequest();
		addAccept.open("POST", url);
		addAccept.onload = function() {
			console.log(JSON.parse(addAccept.responseText));
		}
		addAccept.send();
		setTimeout(function() {
			document.getElementById('responseBar').innerHTML='<strong>Success!</strong> Your acceptance is visible below.';
			document.getElementById('responseBar').className += 'alert alert-success';
			getAccept();
		}, 1000);
	}
});