function initialize () {
}

function findRestaurants () {
   var xhr = new XMLHttpRequest();
   var area = document.getElementById("city").value;
   var searchbyterm = document.getElementById("search").value;
   var eval = document.getElementById("level");
   var limit = eval.options[eval.selectedIndex].text
   var url = "proxy.php?term="+searchbyterm+"&location="+area+"&limit="+limit
   xhr.open("GET", url);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
      console.log(this.readyState)
      if (this.readyState == 4) {
			var json = JSON.parse(this.responseText);
			if(json.hasOwnProperty("error")) document.getElementById("output").innerHTML = json.error.code+"</br>"+json.error.description;
			else{
				//if no results are found when searched
				if(json["businesses"].length==0) document.getElementById("output").innerHTML = "Similar data not found."
				else{
					showResult(json)
				}
			}
		}
   };
   xhr.send(null);
}

function showResult(json){
	output = "<table style=\"border: 1px \"><tr style=\"margin-left: 30px;margin-right: 30px;border: 1px solid;\"><th>No.</th><th>Image</th><th>Name</th><th>Categories</th><th style=\"text-align:center;\">Price</th><th>Rating</th><th>PostalAddress</th><th>PhoneNumber</th></tr>"
	for(var i=0;i<json["businesses"].length;i++){
		output += "<tr><td>"
		output += (i+1) + ".</td><td>"
		output += "<img src=\"" + json["businesses"][i]["image_url"] + "\" style=\"height:200px;width:200px;\"></td><td style=\"width:300px;text-align:center;\">"
		output += "<a href=\"" + json["businesses"][i]["url"] + "\">" + json["businesses"][i]["name"]  + "</a></td><td style=\"color:blue;width:300px;text-align:center;\">"
      	output += json["businesses"][i]["categories"][0]["alias"] +", " +json["businesses"][i]["categories"][0]["title"] + "</td><td  style=\"color:blue;width:100px;text-align:center;\">"
		output += json["businesses"][i]["price"] + "</td><td style=\"color:blue;width:100px;text-align:center;\">"
		output += json["businesses"][i]["rating"]+ "</td><td style=\"color:blue;width:200px;text-align:center;\">"
		output += json["businesses"][i]["location"]["address1"] + ", " + json["businesses"][i]["location"]["city"]+", "+ json["businesses"][i]["location"]["zip_code"] + "</td><td style=\"color:blue;text-align:center;\">"
      	output += json["businesses"][i]["phone"]
		output += "</td></tr>"
		resno = json.total
	}
	output += "</table>"
	document.getElementById("output").innerHTML = output;
}
