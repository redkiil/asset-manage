
var selectSectorField = document.getElementById('selectSector')
var selectSubSectorField = document.getElementById('selectSubSector');
var members = [];
axios.get(`${API_URL}/sectors`).then(function(response){
        console.log(response.data);
        for(var i = 0; i < response.data.length; ++i){
            var opt = document.createElement("option");
            
            opt.text = response.data[i].name;
            opt.value = response.data[i]._id;
            selectSectorField.appendChild(opt);

            members.push(response.data[i].members);

        }
    }).catch(e=>{
        
    });
var btn = document.getElementById("btnsend");
var form = document.getElementById("registrarForm");
btn.addEventListener("click", function(e){
    e.preventDefault();
    var obj = {};
    var tes = false;
    let zzform = new FormData();
    Array.from(form.elements).forEach(data =>{
        let fname = data.name;
        let fvalue = data.value;
        tes = validateData(fname, fvalue);
        if(fname == 'birth'){
            fvalue = localeDataToISO(data.value);
            zzform.append(fname, fvalue);
        }else if(fname == 'avatarimg'){
            zzform.append('avatarimg', data.files[0]);
        }else{
            zzform.append(fname, fvalue);
        }

        if(!tes)return;
    })
    axios.post(`${API_URL}/users`, zzform)
        .then(function (response) {
        console.log("RE", response);
        })
        .catch(function (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    });
});
selectSector.addEventListener("change", function(e){
    e.preventDefault();
    console.log(e, members,selectSector.selectedIndex);
    var idx = selectSector.selectedIndex;
    selectSubSectorField.innerHTML = "<option>Choose a subsector</option>";
    for(var i = 0; i < members[idx-1].length; ++i){
            var opt = document.createElement("option");
            
            opt.text = members[idx-1][i].name;
            opt.value = members[idx-1][i]._id;
            selectSubSectorField.appendChild(opt);

        }
});
function localeDataToISO(date){
    let dates = date.split("/").map(Number);
    var d = new Date(dates[2], dates[1] - 1, dates[0]);
    return d;
}
function validateData(dataName, dataValue){
    if(!dataValue){
        return false;
    }else if(dataName==='birth'){
        let regexp = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
        let valid = regexp.test(dataValue);
        return valid;
    }
    return true;
}