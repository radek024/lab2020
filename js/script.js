const body=document.querySelector("body");
const form = document.querySelector(".form");

var content={};

function isEmpty(el){
  if(!el.value){
    var p=document.createElement("p");
    p.innerText=el.placeholder;
    p.classList.add("warning-empty");
    el.parentNode.insertBefore(p, p.nextSibling);
    return true;
  }
  return false;
}

if(body.classList.contains("contact-page")){
  const button = document.querySelector(".form-button");
  button.addEventListener("click", function(){
console.log("jazda");
    const name = document.querySelector("input[name='imie']");
    const mail = document.querySelector("input[name='email']");
    const text = document.querySelector("textarea[name='wiadomosc']");
    var reason = document.querySelectorAll("input[name='message-type']");
    var fav = document.querySelector("select[name='fav']");
    var suggest= document.querySelectorAll("input[type='checkbox']");


    var suggChecked="";
    suggest.forEach((el)=>{(el.checked)? suggChecked+=`${el.name} ` : 0 });

    fav=fav.options[fav.selectedIndex].text;
    document.querySelectorAll("p.warning-empty").forEach(e => e.parentNode.removeChild(e));

    var reasonChecked="";
    for(var i=0; i<reason.length; i++){
      if(reason[i].checked){
        reasonChecked=reason[i].value;
        break;
      } else reasonChecked="err";
    }

    var content = {
      name: name.value,
      email: mail.value,
      text: text.value,
      favourite: fav,
      sugg: suggChecked,
      reason: reasonChecked
    };

    var lsKey="";
    var j=0;
    for(var i=0; i<20; i++){
      if (localStorage.getItem(`${i}`) === null) {
          lsKey=i;
          if( (!isEmpty(name) && !isEmpty(mail) && !isEmpty(text)) && content.reason!="err"){
            localStorage.setItem( lsKey, JSON.stringify(content));
            console.log(content.reason);
            var success = document.createElement("p");
            success.classList.add("success-sent");
            success.innerText="Formularz wysłano.";
            form.parentNode.insertBefore(success, form.nextSibling);
          }
          else{
            var failed = document.createElement("p");
            failed.classList.add("warning-empty");
            failed.innerText="Formularza nie wysłano. Sprawdź pola.";
            form.parentNode.insertBefore(failed, form.nextSibling);
            console.log(!isEmpty(name)+" name");
            console.log(!isEmpty(mail)+" mail");
            console.log(!isEmpty(text)+" text");
            console.log(content.reasonChecked+" content.reason");
          }
          break;
        }
      }
      }, false)
}

if(body.classList.contains("admin-page")){
  var table=document.querySelector(".mail-table");
  for(var i=0; i<20; i++){
    var tr = document.createElement("tr");
    if(localStorage.getItem(`${i}`) === null){ break; }

    var content=JSON.parse(localStorage[i]);
    for(var k=0; k<7; k++){
      var td = document.createElement("td");
      if(k%7==0){
        td.innerText=i;
        tr.appendChild(td);
      }
      if(k%7==1){
        td.innerText=content.name;
        tr.appendChild(td);
      }
      if(k%7==2){
        td.innerText=content.email;
        tr.appendChild(td);
      }
      if(k%7==3){
        td.innerText=content.text;
        tr.appendChild(td);
      }
      if(k%7==4){
        td.innerText=content.favourite;
        tr.appendChild(td);
      }
      if(k%7==5){
        td.innerText=content.reason;
        tr.appendChild(td);
      }
      if(k%7==6){
        td.innerText=content.sugg;
        tr.appendChild(td);
      }
    }
    // td.innerText=content.name+" | "+content.email+" | "+content.text+" | "+content.reason;
    // tr.appendChild(td);
    table.appendChild(tr);

  }

}
