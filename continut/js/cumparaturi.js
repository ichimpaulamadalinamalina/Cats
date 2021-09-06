function adauga(){
    let nume=document.getElementById('nume').value;
    let cantitate=document.getElementById('cantitate').value;
    var produs=new Produs(nume,cantitate);
    localStorage.setItem('nume',produs.nume);
    localStorage.setItem('cantitate',produs.cantitate);
    console.log(localStorage.getItem('nume')+" "+localStorage.getItem('cantitate'));
}

function Produs(nume, cantitate) {
  this.nume = nume;
  this.cantitate = cantitate;
}


 
function insertData() {

  console.log("am intrat in functie");
  var nume = document.getElementById("nume").value;
  var cant = document.getElementById("cantitate").value;
  console.log("nume: " +nume);
  console.log("cant: " +cant);
  var p = Produs(nume, cant);
  localStorage.setItem(nume, cant, JSON.stringify(p));
  console.log(localStorage.getItem('nume')+" "+localStorage.getItem('cantitate'));
  var list = "<tr><th>Id</th><th>Produs</th><th>Cantitate</th></tr>\n";
  var i = 0;
  for (i = 0; i <= localStorage.length - 1; i++) {
      key = localStorage.key(i);
      list += "<tr><td>" + (i + 1) + "</td>\n<td>" +
          key + "</td>\n<td>" + localStorage.getItem(key) + "</td></tr>\n";
  }
  

  if (list == "<tr><th>Id</th><th>Produs</th><th>Cantitate</th></tr>\n") {
      list += "<tr><td><i>empty</i></td><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
  }
  console.log(list);
  document.getElementById('buy_table').innerHTML = list;

}

function del() {
  localStorage.clear();
}

