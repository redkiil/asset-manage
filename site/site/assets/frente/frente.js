console.log(API);
fetchUsers().then(r=>{
    populateTables(r);
});
async function fetchUsers(){
    return axios.get(`${API}/users`, { withCredentials: true } ).then(function(response){
        return response.data;
    }).catch(e=>{
        return e;
    });
};
function populateTables(objects){
    objects.forEach(function(e){
        //TODO: convert this to createElement
        let sectorName = e.sector ? e.sector.name : "N/A";
        let subSectorName = e.subsector ? e.subsector.name : "N/A";
        let rows = `<tr><td>${e.name}</td><td>${sectorName}</td><td>${subSectorName}</td><td>${e.registration}</td></tr>`;
        let tableid = document.getElementById("usrs");
        tableid.insertAdjacentHTML('beforeend', rows)
    });
};