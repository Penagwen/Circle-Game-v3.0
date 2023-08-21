let savedLevel = 0;
let savedCurrExp = 0;
let savedNeededExp = 0;

function initData(){
    if(getCookie("level") == null){document.cookie = "level=0; expires=Wed, 18 Dec 4000 12:00:00 GMT;";}
    else{savedLevel = getCookie("level");}
    if(getCookie("currExp") == null){document.cookie = "currExp=0; expires=Wed, 18 Dec 4000 12:00:00 GMT;";}
    else{savedCurrExp = getCookie("currExp");}
    if(getCookie("neededExp") == null){document.cookie = "neededExp=0; expires=Wed, 18 Dec 4000 12:00:00 GMT;";}
    else{savedNeededExp = getCookie("neededExp");}
}

function SaveData(v, data){
    if(v == "level"){document.cookie = `level=${data}; expires=Wed, 18 Dec 4000 12:00:00 GMT;`;}
    if(v == "currExp"){document.cookie = `currExp=${data}; expires=Wed, 18 Dec 4000 12:00:00 GMT;`;}
    if(v == "neededExp"){document.cookie = `neededExp=${data}; expires=Wed, 18 Dec 4000 12:00:00 GMT;`;}
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(nameEQ) != -1) return c.substring(nameEQ.length,c.length);
    }
    return null;
} 