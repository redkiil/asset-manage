const btn = document.querySelector('#btnsend');
const btndel = document.querySelector('#btndel');
const selectSectorField = document.querySelector('#selectSector');
const selectSubSectorField = document.querySelector('#selectSubSector');
const fleetField = document.querySelector('#fleetid');
const modelField = document.querySelector('#model');
const form = document.querySelector('#registerVehicle');
btndel.disabled = true;

var members = [];
axios.get(`${API_URL}/sectors`).then(function(response){
    console.log(response.data);
    for(var i = 0; i < response.data.length; ++i){
        var opt = document.createElement('option');
        opt.setAttribute('id', response.data[i]._id);
        opt.text = response.data[i].name;
        opt.value = response.data[i]._id;
        selectSectorField.appendChild(opt);
        members.push(response.data[i].members);
    }
}).catch(e=>{
    
});
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let myobj = {};

    Array.from(form.elements).forEach(data =>{
        let fieldname = data.name;
        let fieldvalue = data.value;
        myobj = { [fieldname]: fieldvalue, ...myobj };
    });
    if(VEH_TOEDIT){
        axios.put(`${API_URL}/vehicles/${VEH_TOEDIT}`, myobj).then(r=>{
            console.log('OK', r);
        }).catch(e=>{
            console.error(e.response);
        })
    }else{
        axios.post(`${API_URL}/vehicles`, myobj).then(r =>{
            console.log('OK', r);
        }).catch(e=>{
            console.error(e.response);
        });
    }
});
btndel.addEventListener('click', (e) => {
    e.preventDefault();
    if(VEH_TOEDIT){
        axios.delete(`${API_URL}/vehicles/${VEH_TOEDIT}`).then(r=>{
            console.log(r);
        }).catch(e=>{
            console.error(e.response);
        })
    }else{
        alert("nenhum veiculo em modo de edição");
    }
})
selectSectorField.addEventListener('change', function(e){
    e.preventDefault();
    console.log(e, members,selectSector.selectedIndex);
    var idx = selectSector.selectedIndex;
    selectSubSectorField.innerHTML = '<option>Choose a subsector</option>';
    for(var i = 0; i < members[idx-1].length; ++i){
            var opt = document.createElement('option');
            
            opt.text = members[idx-1][i].name;
            opt.value = members[idx-1][i]._id;
            selectSubSectorField.appendChild(opt);

        }
});
window.onload = function(){
    if(VEH_TOEDIT){
        axios.get(`${API_URL}/vehicles/${VEH_TOEDIT}`).then(function(response){
            console.log('THE', response.data)
            let sectorIndex = document.querySelector(`#selectSector option[value='${response.data.sector}']`);
            selectSectorField.selectedIndex = sectorIndex.index;
            selectSectorField.dispatchEvent(new Event('change'));
            let subsectorIndex = document.querySelector(`#selectSubSector option[value='${response.data.subsector}']`);
            selectSubSectorField.selectedIndex = subsectorIndex.index;
            fleetField.value = response.data.fleetid;
            modelField.value = response.data.model;
            btn.disabled = false;
            btndel.disabled = false;

        }).catch(e=>{
            console.error(e.response);
        });
    }
  }