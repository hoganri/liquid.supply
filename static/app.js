loadProps();

function loadProps(){
	document.getElementById('swap-holder').innerText='';
	document.getElementById('swap-holder').innerHTML="<tr><th>Posted</th><th>Base Currency</th><th>Base Currency Amount</th><th>Quote Currency</th><th>Quote Currency Amount</th><th>&nbsp; </th></tr>";
	var url = 'https://liquid.supply/swap-feed';
	var swapFeed = new XMLHttpRequest();
	swapFeed.open("GET", url);
	swapFeed.onload = function() {
		displayData(JSON.parse(swapFeed.responseText));
	}
	swapFeed.send();
}

function displayData(data){
	var htmlString = '';
	for (var i in data){
		htmlString += "<tr class='swap' id='proposal_"+i+"'>";
		htmlString += "<td>"+data[i]['post_date']+"</td>";
		htmlString += "<td>"+data[i]['base_cur']+"</td><td>"+data[i]['base_amt']+"</td><td>"+data[i]['sec_cur']+"</td><td>"+data[i]['sec_amt']+"</td>";
		htmlString += "<td><a href='./view-proposal?id="+data[i]['id']+"'>View this Proposal</a></td>";
		htmlString += "</tr>";
		i++;
	}
	document.getElementById('swap-holder').insertAdjacentHTML('beforeend', htmlString);
}


var sendSwap = document.getElementById('sendSwap');
sendSwap.addEventListener('click', function() {
	var baseCur = document.getElementById('baseCur').value;
	var baseAmt = document.getElementById('baseAmt').value;
	var countCur = document.getElementById('countCur').value;
	var countAmt = document.getElementById('countAmt').value;
	var proposal = document.getElementById('swapProposal').value;
	var swapPgp = document.getElementById('swapPgp').value;
	swapPgp = encodeURIComponent(swapPgp);
	if (baseCur == null || baseCur == '' || baseAmt == null || baseAmt == '' || countCur == null || countCur == '' || countAmt == null || countAmt == '' || proposal == null || proposal == '' || swapPgp == '' || swapPgp == null){
		console.log('Empty submission error');
	} else {
		document.getElementById('responseBar').innerHTML='';
		document.getElementById('responseBar').innerHTML='<img src="https://media1.tenor.com/images/d6cd5151c04765d1992edfde14483068/tenor.gif" />';
		
		var url = 'https://liquid.supply/new-swap?baseCur='+baseCur+'&baseAmt='+baseAmt+'&countCur='+countCur+'&countAmt='+countAmt+'&proposal='+proposal+"&pgp="+swapPgp;
 		var url = encodeURI(url);
		var addSwap = new XMLHttpRequest();
		addSwap.open("POST", url);
		addSwap.onload = function() {
			console.log(JSON.parse(addSwap.responseText));
		}
		addSwap.send();
		setTimeout(function() {
			document.getElementById('swap-holder').innerText='';
			
			loadProps();
			document.getElementById('responseBar').innerHTML='<strong>Success!</strong> Your swap is now visible below.';
			document.getElementById('responseBar').className += 'alert alert-success';
		}, 1000);
	}
});

function confirmSwap(data){
	
}