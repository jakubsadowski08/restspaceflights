function getHttpRequest() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xmlhttp;
}


function availableFlights() {

    var req = getHttpRequest();
    req.open('GET', "http://localhost:8080/flights", true);
    req.onload = function () {
        if (req.readyState === 4 && req.status === 200) {
            var jsonResponse = JSON.parse(req.responseText);
            makeLists(jsonResponse);
        }
    };
    req.send(null);

    /*axios.get("http://localhost:8080/flights")
        .then(function (response) {
            makeLists(response);
        });*/
}

function makeLists(parsedJSON) {
    var ids = [];
    for (var i = 0; i < parsedJSON.length; i++) {
        ids.push(parsedJSON[i]["id"]);
    }
    var lists = document.getElementsByClassName("flightsList");
    for (var i = 0; i < lists.length; i++) {
        for (var j = 0; j < ids.length; j++) {
            var option = document.createElement("option");
            option.value = ids[j];
            option.text = "id: " + ids[j];
            lists[i].appendChild(option);
        }
    }


}


function availableTourists() {

    var req = getHttpRequest();
    req.open('GET', "http://localhost:8080/tourists", true);
    req.onload = function () {
        if (req.readyState === 4 && req.status === 200) {
            var jsonResponse = JSON.parse(req.responseText);
            makeFlightLists(jsonResponse);
        }
    };
    req.send(null)


}

function makeFlightLists(parsedJSON) {
    var ids = [];
    for (var i = 0; i < parsedJSON.length; i++) {
        ids.push(parsedJSON[i]["id"]);
    }
    var lists = document.getElementsByClassName("touristsList");
    for (var i = 0; i < lists.length; i++) {
        for (var j = 0; j < ids.length; j++) {
            var option = document.createElement("option");
            option.value = ids[j];
            option.text = "id: " + ids[j];
            lists[i].appendChild(option);
        }
    }


}


function myFlights(id, i) {

    var req = getHttpRequest();
    req.open('GET', "http://localhost:8080/tourist/" + id, true);
    req.onload = function () {
        if (req.readyState === 4 && req.status === 200) {
            var jsonResponse = JSON.parse(req.responseText);
            makeDropDown(jsonResponse, i);
        }
    };
    req.send(null);

    /*axios.get("http://localhost:8080/tourist/" + id)
        .then(function (response) {
            makeDropDown(response, i);
        });*/

}

function makeDropDown(parsedJSON, ind) {
    var ids = [];
    for (var i = 0; i < parsedJSON.length; i++) {
        ids.push(parsedJSON[i]["id"]);
    }
    ids = ids.sort();
    var lists = document.getElementsByClassName("flights")[ind];
    for (var j = 0; j < ids.length; j++) {
        var option = document.createElement("option");
        option.value = ids[j].toString();
        option.text = "id: " + ids[j];
        lists.appendChild(option);
    }


}

function myTourists(id, i) {

    var req = getHttpRequest();
    req.open('GET', "http://localhost:8080/flight/" + id, true);
    req.onload = function () {
        if (req.readyState === 4 && req.status === 200) {
            var jsonResponse = JSON.parse(req.responseText);
            makeDropDowns(jsonResponse, i);
        }
    };
    req.send(null);

    /*axios.get("http://localhost:8080/flight/" + id)
        .then(function (response) {
            makeDropDowns(response, i);
        });*/
}

function makeDropDowns(parsedJSON, ind) {
    var ids = [];
    for (var i = 0; i < parsedJSON.length; i++) {
        ids.push(parsedJSON[i]["id"]);
    }
    ids = ids.sort();
    var lists = document.getElementsByClassName("tourists")[ind];
    for (var j = 0; j < ids.length; j++) {
        var option = document.createElement("option");
        option.value = ids[j].toString();
        option.text = "id: " + ids[j];
        lists.appendChild(option);
    }


}


function myFunction(arr, elementId) {
    if (arr != null) {
        var i;
        var l = 0;
        var q = 0;
        var out = "";
        var table = document.getElementById(elementId);
        out += " <thead><tr>";
        console.log(arr.length)
        for (var k in arr[0]) {
            out += "<th>" + k + "</th>";


        }
        if (elementId === "dataTable") {
            out += " <th> Flights</th>";
            out += " <th> DeleteFlight</th>";
            out += " <th> AvailableFlights</th>";
            out += " <th> AddFlight</th>";
        } else {
            out += " <th> Tourists</th>";
            out += " <th> DeleteTourist</th>";
            out += " <th> AvailableTourists</th>";
            out += " <th> AddTourist</th>";
        }


        out += "</tr></thead><tbody>";
        for (i = 0; i < arr.length; i++) {
            out += "<tr>";
            for (var key in arr[i]) {
                if (arr[i][key] != null) {
                    out += "<td class='normalTd'>";
                    out += arr[i][key];
                    out += "</td>";
                }
            }
            if (elementId === "dataTable") {
                out += "<td class='smallerTd'>" + "<select class='flights'></select></td>";
                out += "<td class='smallerTd'>" + '<button onclick=\"deleteFlightFromTourist(' + arr[i]["id"] + "," + l + ')\"></button>' + "</td>";
                l++;
                out += "<td class='smallerTd'>" + "<select class='flightsList'></select></td>";
                out += "<td class='smallerTd'>" + '<button onclick=\"addFlightToTourist(' + arr[i]["id"] + "," + i + ')\"></button>' + "</td>" + "</td>";
                out += "<td class='smallerTd'>";
            } else {
                out += "<td class='smallerTd'>" + "<select class='tourists'></select></td>";
                out += "<td class='smallerTd'>" + '<button onclick=\"deleteTouristFromFlight(' + arr[i]["id"] + "," + q + ')\"></button>' + "</td>";
                q++;
                out += "<td class='smallerTd'>" + "<select class='touristsList'></select></td>";
                out += "<td class='smallerTd'>" + '<button onclick=\"addTouristToFlight(' + arr[i]["id"] + "," + i + ')\"></button>' + "</td>" + "</td>";
                out += "<td class='smallerTd'>";
            }
            if (elementId === "dataTable") {
                myFlights(arr[i]["id"], i);
            } else {
                myTourists(arr[i]["id"], i);

            }


        }
        out += "</tbody>";
        table.innerHTML = out;
        if (elementId === "dataTable") {
            availableFlights();
        } else {
            availableTourists();

        }

    }


}

function displayTable() {
    var req = getHttpRequest()
    req.open('GET', "http://localhost:8080/tourists", true);
    req.onload = function () {
        var jsonResponse = JSON.parse(req.responseText);
        myFunction(jsonResponse, "dataTable");
    };
    req.send(null);

    /*axios.get("http://localhost:8080/tourists")
        .then(function (response) {
            myFunction(response, "dataTable");
        });*/

    let table = document.getElementById("tourist_container");
    if (table.style.display === "none" || table.style.display === "") {
        table.style.display = "block";
    } else {
        table.style.display = "none";
    }
}

function displayForm() {
    let table = document.getElementById("tourist_form");
    if (table.style.display === "none" || table.style.display === "") {
        table.style.display = "block";
    } else {
        table.style.display = "none";
    }
}

function displayBox() {
    let table = document.getElementById("tourist_box");
    if (table.style.display === "none" || table.style.display === "") {
        table.style.display = "block";
    } else {
        table.style.display = "none";
    }
}

function displayFlightTable() {
    var req = getHttpRequest()
    req.open('GET', "http://localhost:8080/flights", true);
    req.onload = function () {
        var jsonResponse = JSON.parse(req.responseText);
        myFunction(jsonResponse, "flight_dataTable");
    };
    req.send(null);

    /*axios.get("http://localhost:8080/flights")
        .then(function (response) {
            myFunction(response, "flight_dataTable");
        });*/

    let table = document.getElementById("flight_container");
    if (table.style.display === "none" || table.style.display === "") {
        table.style.display = "block";
    } else {
        table.style.display = "none";
    }
}

function displayFlightForm() {
    let table = document.getElementById("flight_form");
    if (table.style.display === "none" || table.style.display === "") {
        table.style.display = "block";
    } else {
        table.style.display = "none";
    }
}

function displayFlightBox() {
    let table = document.getElementById("flight_box");
    if (table.style.display === "none" || table.style.display === "") {
        table.style.display = "block";
    } else {
        table.style.display = "none";
    }
}

function onSubmit() {
    var form = document.getElementById("form");
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if (name) {
            obj[name] = value;
        }
    }
    var str = document.getElementById("testinput").innerText;
    var newStr = str.substring(0, str.length - 1);
    obj["country"] = newStr;
    return addTourist(JSON.stringify(obj));
}

function onFlightSubmit() {
    var form = document.getElementById("forms");
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if (name) {
            obj[name] = value;
        }
    }
    return addFlight(JSON.stringify(obj));
}

function addTourist(json) {
    var xmlhttp = getHttpRequest();
    xmlhttp.open('POST', "http://localhost:8080/tourist", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(json);
    alert("Tourist has been added")
    location.reload();


    return false;
}

function addFlight(json) {
    var xmlhttp = getHttpRequest();
    xmlhttp.open('POST', "http://localhost:8080/flight", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(json);
    alert("Flight has been added")
    location.reload();
    return false;
}

function deleteTourist() {
    /*var xhr = getHttpRequest();

    xhr.open("DELETE", "http://localhost:8080/tourist" + "/" + value, true);
    xhr.send(null);*/
    var value = document.getElementById("tourist_deleteById").value;
    axios.delete("http://localhost:8080/tourist" + "/" + value);
    alert("Tourist has been deleted");
    location.reload();
}

function deleteFlight() {
    /*var xhr = getHttpRequest();

    xhr.open("DELETE", "http://localhost:8080/flight" + "/" + value, true);
    xhr.send(null);*/
    var value = document.getElementById("flight_deleteById").value;
    axios.delete("http://localhost:8080/flight" + "/" + value);
    alert("Flight has been deleted");
    location.reload();
}

function deleteFlightFromTourist(id, list_index) {
    // var xhr = getHttpRequest();
    var value = document.getElementsByClassName("flights")[list_index].value;
    var url = "http://localhost:8080/tourist" + "/" + id + "/" + "flight" + "/" + value;
    // alert(url);
    // xhr.open("DELETE", url, true);
    // xhr.setRequestHeader("Host", "localhost:8080");
    // xhr.send(null);
    // location.reload();

    //alert('here');

    axios.delete(url);

    location.reload();
}

function deleteTouristFromFlight(id, list_index) {
    // var xhr = getHttpRequest();
    var value = document.getElementsByClassName("tourists")[list_index].value;
    var url = "http://localhost:8080/flight" + "/" + id + "/" + "tourist" + "/" + value;
    // alert(url);
    // xhr.open("DELETE", url, true);
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.send(null);
    // location.reload();

    //alert('here');

    axios.delete(url);

    location.reload();
}

function addFlightToTourist(id, list_index) {
   //var xhr = getHttpRequest();
    var value = document.getElementsByClassName("flightsList")[list_index].value;

    var flights = document.getElementsByClassName("flights")[list_index];
    if (flights) {
        for (var i = 0; i < flights.length; i++) {
            if (flights.options[i].value === value) {
                alert("Flight is already in tourists flights");
                return false;
            }
        }
    }
    // addTouristToFlightById(value,id)
    var url = "http://localhost:8080/tourist" + "/" + id + "/" + "flight" + "/" + value;
    /*xhr.open("PUT", url, true);
    xhr.send(null);*/

    axios.put(url, {withCredentials: true});

    location.reload();


}

function addTouristToFlight(id, list_index) {
   // var xhr = getHttpRequest();
    var value = document.getElementsByClassName("touristsList")[list_index].value;

    var tourists = document.getElementsByClassName("tourists")[list_index];
    if (tourists) {
        for (var i = 0; i < tourists.length; i++) {
            if (tourists.options[i].value === value) {
                alert("Tourist is already in flight");
                return false;
            }
        }
    }
    //  addFlightToTouristById(value,id)
    var url = "http://localhost:8080/flight" + "/" + id + "/" + "tourist" + "/" + value;
  /*  xhr.open("PUT", url, true);
    xhr.send(null);*/

    axios.put(url, {withCredentials: true});

    location.reload();


}








