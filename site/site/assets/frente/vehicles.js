if(SECID){
    const tractorList = document.getElementById('tractors');
    const harvesterList = document.getElementById('harvesters');
    const displayFrente = document.getElementById('displayname');
    var users = [];
    const populateItens = (r) => {
        let data = r.data;
        data.map(v => {
            let veh_type = v.fleetid / 100 | 0;
            let veh_model = v.model;
            let oper = users.find(data => data.fleetid === v.fleetid);
            oper = oper ? `Operador: ${oper.name.split(' ')[0]}#${oper.registration}` : ' ';
            let veh = document.createElement('li');
            let tag_a1 = document.createElement('a');
            let tag_a2 = document.createElement('a');
            tag_a1.setAttribute('class', 'fas fa-tractor trac');
            veh.appendChild(tag_a1);
            tag_a2.setAttribute('class','fas fa-cog gear');
            tag_a2.setAttribute('href', `../../vehicle/edit/${v.fleetid}`);
            veh.appendChild(tag_a2);
            veh.innerHTML += `<p>${v.fleetid} | ${v.model} </p><p>${oper}</p>`;
            appendItem(veh_type, veh);
        });
    }
    const appendItem = (vclass, item) => {
        switch(vclass){
            case 37: harvesterList.appendChild(item); break;
            case 30,31: tractorList.appendChild(item); break;
        }
    }
    const changeDisplay = (r) => {
        let str_dsp = `${r.data.sectorid.name} / ${r.data.name}`;
        displayFrente.innerText = str_dsp;
    }
    const vehicles = axios.get(`${API_URL}/vehicles/ssector/${SECID}`);
    const sectors = axios.get(`${API_URL}/sectors/subsector/${SECID}`);
    const operators = axios.get(`${API_URL}/users/subsector/${SECID}`);
    Promise.all([vehicles, sectors, operators]).then(r=>{
        users = r[2].data;
        populateItens(r[0]);
        changeDisplay(r[1]);
    }).catch(e=>{
        console.log(e.message);
    })
}