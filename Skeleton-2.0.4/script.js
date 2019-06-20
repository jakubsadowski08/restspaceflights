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
    req.send(null);


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

function myFunction(arr, elementId) {
    if (arr != null) {
        var i;
        var l = 0;
        var q = 0;
        var out = "";
        var table = document.getElementById(elementId);
        out += " <thead><tr>";
        for (var k in arr[0]) {
            if (k !== "flights" && k !== "tourists") {
                out += "<th>" + k + "</th>";
            }

        }
        if (elementId === "dataTable") {
            out += " <th> Flights</th>";
            out += " <th> DeleteButton</th>";
            out += " <th> AvailableFlights</th>";
            out += " <th> AddButton</th>";
        } else {
            out += " <th> Tourists</th>";
            out += " <th> DeleteButton</th>";
            out += " <th> AvailableTourists</th>";
            out += " <th> AddButton</th>";
        }


        out += "</tr></thead><tbody>";
        for (i = 0; i < arr.length; i++) {
            var flights = "";
            var tourists = "";
            var flightIds = [];
            var touristIds = [];
            out += "<tr>";
            for (var key in arr[i]) {
                if (arr[i][key] != null) {
                    if (key === "flights") {
                        if (arr[i][key].length > 0) {
                            flights += "<td><select class='flights'>";

                            for (var property in arr[i][key]) {
                                flightIds.push(arr[i][key][property]["id"]);
                            }
                            flightIds = flightIds.sort();
                            for (var w = 0; w < flightIds.length; w++) {
                                flights += "<option value=" + flightIds[w] + ">" + "id: " + flightIds[w] + "</option>";
                            }
                            flights += "</select>";
                            flights += "</td>";
                        } else {
                            flights += "<td></td>";
                        }

                    } else if (key === "tourists") {
                        if (arr[i][key].length > 0) {
                            tourists += "<td><select class='tourists'>";

                            for (var property in arr[i][key]) {
                                touristIds.push(arr[i][key][property]["id"]);
                            }
                            touristIds = touristIds.sort();
                            for (var w = 0; w < touristIds.length; w++) {
                                tourists += "<option value=" + touristIds[w] + ">" + "id: " + touristIds[w] + "</option>";
                            }
                            tourists += "</select>";
                            tourists += "</td>";
                        } else {
                            tourists += "<td></td>";
                        }

                    } else {
                        out += "<td>";
                        out += arr[i][key];
                        out += "</td>";
                    }
                }
            }
            if (flights !== "<td></td>" && elementId === "dataTable") {
                out += flights + "<td>" + '<button onclick=\"deleteFlightFromTourist(' + arr[i]["id"] + "," + l + ')\"></button>' + "</td>";
                l++;
            } else {
                out += flights + flights;
            }

            if (tourists !== "<td></td>" && elementId === "flight_dataTable") {
                out += tourists + "<td>" + '<button onclick=\"deleteTouristFromFlight(' + arr[i]["id"] + "," + q + ')\"></button>' + "</td>";
                q++;
            } else {
                out += tourists + tourists;
            }
            if (elementId === "dataTable") {
                out += "<td>" + "<select class='flightsList'></select></td>";
                out += "<td>" + '<button onclick=\"addFlightToTourist(' + arr[i]["id"] + "," + i + ')\"></button>' + "</td>" + "</td>";
                out += "</tr>";
            } else {
                out += "<td>" + "<select class='touristsList'></select></td>";
                out += "<td>" + '<button onclick=\"addTouristToFlight(' + arr[i]["id"] + "," + i + ')\"></button>' + "</td>" + "</td>";
                out += "</tr>";
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
    var xhr = getHttpRequest();
    var value = document.getElementById("tourist_deleteById").value;
    xhr.open("DELETE", "http://localhost:8080/tourist" + "/" + value, true);
    xhr.send(null);
    alert("http://localhost:8080/tourist" + "/" + value);
    alert("Tourist has been deleted");
    location.reload();
}

function deleteFlight() {
    var xhr = getHttpRequest();
    var value = document.getElementById("flight_deleteById").value;
    xhr.open("DELETE", "http://localhost:8080/flight" + "/" + value, true);
    xhr.send(null);
    alert("Flight has been deleted");
    location.reload();
}

function deleteFlightFromTourist(id, list_index) {
    var xhr = getHttpRequest();
    var value = document.getElementsByClassName("flights")[list_index].value;
    var url = "http://localhost:8080/tourist" + "/" + id + "/" + "flight" + "/" + value;
    xhr.open("DELETE", url, true);
    xhr.send(null);
    alert("Flight has been deleted");
    location.reload();
}

function deleteTouristFromFlight(id, list_index) {
    var xhr = getHttpRequest();
    var value = document.getElementsByClassName("tourists")[list_index].value;
    var url = "http://localhost:8080/flight" + "/" + id + "/" + "tourist" + "/" + value;
    xhr.open("DELETE", url, true);
    xhr.send(null);
    alert("Flight has been deleted");
    location.reload();
}

function addFlightToTourist(id, list_index) {
    var xhr = getHttpRequest();
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
    var url = "http://localhost:8080/tourist" + "/" + id + "/" + "flight" + "/" + value;
    xhr.open("PUT", url, true);
    xhr.send(null);
    alert("Flight has been added");
    location.reload();
}

function addTouristToFlight(id, list_index) {
    var xhr = getHttpRequest();
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
    var url = "http://localhost:8080/flight" + "/" + id + "/" + "tourist" + "/" + value;
    xhr.open("PUT", url, true);
    xhr.send(null);
    alert("Tourist has been added");
    location.reload();
}




