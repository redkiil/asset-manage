if(SECID){
    let ulWorkers = document.querySelector("#list-workers");
    let namedto = document.querySelector("#displayname");
    axios.get(`${API}/sectors/subsector/${SECID}`).then(r=>{
        namedto.innerHTML = `${r.data.name} - ${r.data.sectorid.name}`;
    }).catch(e=>{
        alert(e);
    })
    axios.get(`${API}/users/subsector/${SECID}`).then(data => {
        data.data.forEach(elem => {
            let lis = document.createElement('li');
            let img = document.createElement('img');
            let txt = document.createElement('span');
            let cog = document.createElement('i');
            let link = document.createElement('a');
            link.setAttribute('href', `../../user/edit/${elem.registration}`);
            link.appendChild(cog);
            cog.setAttribute('class', 'fas fa-cog gear');
            img.setAttribute('src', `${API}/users/badge/${elem.registration}`);
            img.setAttribute('class', 'user-avatar');
            let job = elem.job ? elem.job.jobname : 'N/A';
            let vehicle = elem.fleetid && elem.vehicle ? `${elem.fleetid} ${elem.vehicle.model}` : 'N/A';
            txt.innerHTML = `<p>Matricula: ${elem.registration}</p> <p>${elem.name} </p> <p>${job} </p><p>Frota: ${vehicle}</p>`;
            lis.appendChild(link);
            lis.appendChild(img);
            lis.appendChild(txt);
            ulWorkers.appendChild(lis);

        });
    }).catch(e=>{

    })
}