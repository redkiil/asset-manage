
var selectSectorField = document.getElementById('selectSector')
var selectSubSectorField = document.getElementById('selectSubSector');
var selectJobField = document.getElementById('selectJob');
var matriculaField = document.getElementById('registration');
var nameField = document.getElementById('name');
var birthField = document.getElementById('birth');
var fleetField = document.getElementById('fleetid');
var tokenField = document.getElementById('token');

var members = [];
axios.get(`${API_URL}/sectors`).then(function(response){
        console.log(response.data);
        for(var i = 0; i < response.data.length; ++i){
            var opt = document.createElement("option");
            opt.setAttribute('id', response.data[i]._id);
            opt.text = response.data[i].name;
            opt.value = response.data[i]._id;
            selectSectorField.appendChild(opt);

            members.push(response.data[i].members);

        }
    }).catch(e=>{
        
    });
    axios.get(`${API_URL}/jobs`).then(function(response){
        console.log(response.data);
        for(var i = 0; i < response.data.length; ++i){
            var opt = document.createElement("option");
            opt.setAttribute('id', response.data[i]._id);
            opt.text = response.data[i].jobname;
            opt.value = response.data[i]._id;
            selectJobField.appendChild(opt);

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
    if(USER_TOEDIT){
        axios.put(`${API_URL}/users/${USER_TOEDIT}`, zzform).then(function (response) {
            console.log("REEDIT", response);
        })
        .catch(function (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    });
    }else{
        axios.post(`${API_URL}/users/generatetoken`, zzform).then(function (response) {
                var base_url = window.location.origin;
                console.log(base_url, tokenField);
                tokenField.value = `${base_url}/user/changepass/${response.data.token}`;
            })
            .catch(function (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        });
    } 
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

window.onload = function(){
    if(USER_TOEDIT){
        axios.get(`${API_URL}/users/${USER_TOEDIT}`).then(function(response){
            console.log("THE", response)
            let sectorIndex = document.querySelector(`#selectSector option[value='${response.data.sector._id}']`);
            selectSectorField.selectedIndex = sectorIndex.index;
            selectSector.dispatchEvent(new Event('change'));
            let subsectorIndex = document.querySelector(`#selectSubSector option[value='${response.data.subsector._id}']`);
            selectSubSectorField.selectedIndex = subsectorIndex.index;
            let jobIndex = document.querySelector(`#selectJob option[value='${response.data.job._id}']`);
            selectJobField.selectedIndex = jobIndex.index;
            matriculaField.value = response.data.registration;
            nameField.value = response.data.name;
            fleetField.value = response.data.fleetid;
            birthField.value = ISOToLocaleDate(response.data.birth);
            /*for(var i = 0; i < response.data.length; ++i){
                var opt = document.createElement("option");
                
                opt.text = response.data[i].jobname;
                opt.value = response.data[i]._id;
                selectJobField.appendChild(opt);
    
            }*/
        }).catch(e=>{
            
        });
    }
  }
function localeDataToISO(date){
    let dates = date.split("/").map(Number);
    var d = new Date(dates[2], dates[1] - 1, dates[0]);
    return d;
}
function ISOToLocaleDate(date){
    let createdate = new Date(date);
    var dd = (createdate.getDate() < 10 ? '0' : '') + createdate.getDate();
    var MM = ((createdate.getMonth() + 1) < 10 ? '0' : '') + (createdate.getMonth() + 1);
    let rdate = `${dd}/${MM}/${createdate.getFullYear()}`;
    console.log(rdate);
    return rdate;
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