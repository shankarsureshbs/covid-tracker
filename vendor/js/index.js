let appChart = document.getElementById('appChart').getContext('2d')
//Doughnut
var popChart = new Chart(appChart,{
	type : "doughnut",
	data :{
		labels :["Total Recovered","Total Confirmed"],
		datasets : [{
			label :"Patients",
			data:[],
			backgroundColor: [
				'rgba(16,194,6)',
				'rgba(209,18,19)'                         
            ]
		}]
	},
	options : {}
})

fetch("https://api.covid19api.com/summary").then(res => res.json()).then(function(data){
	popChart.data.datasets[0].data[0]  =  data.Global["TotalRecovered"]
	popChart.data.datasets[0].data[1]  =  data.Global["TotalConfirmed"]
	popChart.update()

	var appTop = document.getElementsByClassName('app-top-box')
	var activeCases = data.Global["TotalConfirmed"] - data.Global["TotalRecovered"]

			appTop[0].innerHTML = `<div class="row">
			<div class="col-12"><b>Total Cases:</b></div>
			<div class="col-12"><b>${data.Global["TotalConfirmed"]}</b></div></div>`

			appTop[1].innerHTML = `<div class="row">
			<div class="col-12"><b>Recovered:</b></div>
			<div class="col-12"><b>${data.Global["TotalRecovered"]}</b></div></div>`

			appTop[2].innerHTML = `<div class="row">
			<div class="col-12"><b>Active Cases:</b></div>
			<div class="col-12"><b>${activeCases}</b></div></div>`

			appTop[3].innerHTML =  `<div class="row">
			<div class="col-12"><b>Total Death:</b></div>
			<div class="col-12"><b>${data.Global["TotalDeaths"]}</b></div></div>`
})

//Pagination

var myArr = []
fetch('https://api.covid19api.com/summary').then(response => response.json())
  .then(data => {
  	for(var i = 1; i<data.Countries.length;i+=1){
  		myArr.push(data.Countries[i])
  	}
  	var sortedArray = (myArr.sort(function(a,b){
  		return  b.TotalConfirmed - a.TotalConfirmed
  	}))
  	var arr = sortedArray.slice(0,3)
  	var topCountry = document.getElementsByClassName('app-box')

  	topCountry[0].innerHTML = 
  		`<div class="row">
			<div class="col"><b>${arr[0].Country}</b>
				<div class="row">
					<div class="col-6 text-center">
						<div class ="row">
							<div class = "col-12"><small><b>Affected</b></small></div>
							<div class = "col-12"><small><b>${arr[0].TotalConfirmed}</b></small></div>
						</div>
					</div>
					<div class="col-6 text-center">
						<div class ="row">
							<div class ="col-12"><small><b>Recovered</b></small>
							<div class = "col-12"><small><b>${arr[0].TotalRecovered}</b></small></div>
						</div>
					</div>
				</div>
			</div>
		</div>`

		topCountry[1].innerHTML = 
		`<div class="row">
			<div class="col"><b>${arr[1].Country}</b>
				<div class="row">
					<div class="col-6 text-center">
						<div class ="row">
							<div class = "col-12"><small><b>Affected</b></small></div>
							<div class = "col-12"><small><b>${arr[1].TotalConfirmed}</b></small></div>
						</div>
					</div>
					<div class="col-6 text-center">
						<div class ="row">
							<div class ="col-12"><small><b>Recovered</b></small>
							<div class = "col-12"><small><b>${arr[1].TotalRecovered}</b></small></div>
						</div>
					</div>
				</div>
			</div>
		</div>`

		topCountry[2].innerHTML = 
		`<div class="row">
			<div class="col"><b>${arr[2].Country}</b>
				<div class="row">
					<div class="col-6 text-center">
						<div class ="row">
							<div class = "col-12"><small><b>Affected</b></small></div>
							<div class = "col-12"><small><b>${arr[2].TotalConfirmed}</b></small></div>
						</div>
					</div>
					<div class="col-6 text-center">
						<div class ="row">
							<div class ="col-12"><small><b>Recovered</b></small>
							<div class = "col-12"><small><b>${arr[2].TotalRecovered}</b></small></div>
						</div>
					</div>
				</div>
			</div>
		</div>`

	for(i in sortedArray){
    	document.getElementById('demo').innerHTML += `<tr><td>${sortedArray[i].Country}</td><td>${sortedArray[i].TotalConfirmed}</td></tr>`
  	}})
  .then(
	function(){
  		$(document).ready( function () {
    		$('#covidData').DataTable({
      			"bInfo": false,
      			"bLengthChange": false,
      			"pageLength": 4,
      			"pagingType": "simple",
       			"bFilter": false,
    		});
		})
	})


