
function incarcaPersoane(){
    var xmlhttp = new XMLHttpRequest();  
    console.log("step1 ");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           console.log("step2 ");
           var myXml = this.responseText;
           console.log(myXml);
           myFunction(myXml);
        }
    };
    
    xmlhttp.open("GET", "resurse/persoane.xml", true);
    xmlhttp.send();
}

function myFunction(xml) {
    var i;
    var parser = new DOMParser();
    var xmlText = "";
    var splitted = xml.split("\n");
    for(var index=0; index<splitted.length; index ++){
      if(index >= 1)
        xmlText += splitted[index] + "\n";
    }
    var xmlDoc = parser.parseFromString(xmlText,"text/xml");
    console.log(xmlDoc);
    var table="<table><tr><th>Nume</th><th>Prenume</th><th>Vârsta</th><th>Adresa</th><th>Email</th><th>Telefon</th></tr>";
    var x = xmlDoc.getElementsByTagName("persoana");
    console.log(x);
    console.log("x-length :"+ x.length);
    
    for (i = 0; i <x.length; i++) { 
      table += "<tr><td>" +
      x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +"</td><td>" + 
      x[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue+"</td><td>"+
      x[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue+"</td><td>"+
      x[i].getElementsByTagName("strada")[0].childNodes[0].nodeValue+ " " +
      x[i].getElementsByTagName("numar")[0].childNodes[0].nodeValue+  " " +
      x[i].getElementsByTagName("localitate")[0].childNodes[0].nodeValue+ " " +
      x[i].getElementsByTagName("judet")[0].childNodes[0].nodeValue+ " " +
      x[i].getElementsByTagName("tara")[0].childNodes[0].nodeValue+ " " +
      "</td><td>"+
      x[i].getElementsByTagName("telefon")[0].childNodes[0].nodeValue+"</td><td>"+
      x[i].getElementsByTagName("email")[0].childNodes[0].nodeValue+
      "</td></tr>";
      console.log("nume1: " + x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue);
    }
    table +="</table>"
    document.getElementById("incarcaPersoane").innerHTML = table;
  }