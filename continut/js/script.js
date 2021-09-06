
function data()
{
    var d=new Date();
    var doc = document.getElementById("demo");
    if (doc)
       doc.innerHTML=d.toUTCString();
}

function url()
{
  var url  = window.location.href; 
  var doc = document.getElementById("demo2");
  if(doc)
    doc.innerHTML=url;
}

 
function Versiune()
{
  let versiune=navigator.appCodeName;
  var doc = document.getElementById("versiune");
  if(doc)
    doc.innerHTML=versiune;
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var x = document.getElementById("locatie");
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

function informatii(){
	
	var inf="<p><b>Locatie: </b>"+getLocation()+"</p>";
	
	document.getElementById("locatie").innerHTML=inf;
}
function malina1()
{
    var txt = "";
            txt += "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
            txt += "<p>Browser Name: " + navigator.appName + "</p>";
            txt += "<p>Browser Version: " + navigator.appVersion + "</p>";
            txt += "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
            txt += "<p>Browser Language: " + navigator.language + "</p>";
            txt += "<p>Browser Online: " + navigator.onLine + "</p>";
            txt += "<p>Platform: " + navigator.platform + "</p>";
            txt += "<p>User-agent header: " + navigator.userAgent + "</p>";

            document.getElementById("demo3").innerHTML = txt;
}

function extragere(){
    var myText = "";
    var castigatoare = 0;
    var selected = document.getElementsByClassName("numarLoto");
    var rand, hexaRand;
    var ok = true;

    for(var i=1; i <= 8; i++)
    {
        do{
            rand = Math.trunc(Math.random()*256);
            hexaRand = rand.toString(16);

            ok = true;

            for(var number in myText.split(" "))
                if(number == hexaRand)
                    ok = false;

        }while(ok == false);


        myText += hexaRand + " ";

        for(var index = 0; index < selected.length; index ++)
            if(selected[index].value == rand)
                castigatoare += 1;
    }

    document.getElementById("castigatoare").innerText = myText;
    document.getElementById("mesajCastigator").innerText = "Din numarele alese, " + castigatoare + " au fost castigatoare!";
}
 var p=null;
 function drawsquare(event)
 {
     var contur=document.getElementById("culoaretrasare").value;
     var umplere=document.getElementById("culoareumplere").value;
     var canvas=document.getElementById("desen1");
     c=canvas.getContext("2d");

     var x=event.offsetX;
     var y=event.offsetY;

     if(p == null)
     {
         p=[x,y];    
     }
     else{
         var p1=p;
         var p2=[x,y];
         console.log( p1 +  " p2= " + p2);

         var height =Math.abs(p1[1]-p2[1]);
         var width=Math.abs(p1[0]-p2[0]); 
         //c.moveTo(0,0);
         c.beginPath();
         console.log("height =" + height + " width=" + width);
         c.rect(p1[0],p1[1],width,height);
         console.log( "p1 "+ p1);
        
         c.fillStyle=umplere;
         console.log(umplere);
         
         c.strokeStyle =contur;
         console.log(contur);
         c.fill();
         c.stroke();
         p=null;


     }
    }
     

    function schimbaContinut(resursa,jsFisier="",jsFunctie="") {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("continut").innerHTML =
            this.responseText;
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function () {
                    console.log("hello");
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                console.log("fis :"+ jsFisier);
                document.head.appendChild(elementScript);
                console.log("fis2 :"+ elementScript);

            } else {
                if (jsFunctie!="") {
                    window[jsFunctie]();
                }
            }
          }
           
        };
        xhttp.open("GET", resursa+".html", true);
        xhttp.send();
      }
 
      

function insertNewCol() {
    var poz = document.getElementById("poz").value;
    var tbl = document.getElementById("table");
    var i;
    for (i = 0; i < tbl.rows.length; i++) {
        createCell(tbl.rows[i].insertCell(poz), i, 'col');
    }
}


function insertNewRow() {
    var poz = document.getElementById("poz").value;
    var tbl = document.getElementById("table");
    var row = tbl.insertRow(poz);
    for (i = 0; i < tbl.rows[0].cells.length; i++) {
        createCell(row.insertCell(i), i, 'row');
    }
}

function createCell(cell, text, style) {
    var div = document.createElement('div'); 
    var txt = document.createTextNode(text); 
    div.appendChild(txt); 
    div.setAttribute('class', style);
    div.setAttribute('className', style); 
    cell.appendChild(div); 
}
function generate_table() {
    var body = document.getElementsByTagName("main")[0];
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    for (var i = 0; i < 2; i++) {
      var row = document.createElement("tr");
  
      for (var j = 0; j < 2; j++) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode("linia "+i+", coloana "+j);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
  }
function mouseDown() {
    document.getElementById("myP").style.color = "red";
  }
  
  function mouseUp() {
    document.getElementById("myP").style.color = "yellow";
  }

  function incarcaUtilizatori(){
    var xmlhttp = new XMLHttpRequest();  
    console.log("step1 ");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           console.log("step2 ");
           var myXml = this.response;
           console.log(myXml);
           verify(myXml);
        }
    };
    
    xmlhttp.open("GET", "resurse/utilizatori.json", true);
    xmlhttp.send();
}
 function verify(text)
 {
     // am facut doar pentru test:test pentru ca nu am adaugat alti utilizatori
    obj = JSON.parse(text);
    document.getElementById("very").innerHTML =obj.utilizator + " " + obj.parola;
    let nume=document.getElementById('nume1').value;
    let parola=document.getElementById('pass').value;
    if(nume== obj.utilizator && parola==obj.parola)
    {
        print1();
    }
    else{
        print2();
    }

 } 


 function print1() 
 {
    window.alert("Utilizator corect");
 }

 function print2()
 {
    window.alert("Utilizator sau parola gresita");
 }