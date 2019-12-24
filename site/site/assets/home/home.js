

let img = document.querySelector('.avatar-img');
let subSectorsWorkers = document.querySelector('#subsector-workers');
let subsectorVehicles = document.querySelector('#subsector-vehicles');
img.setAttribute('src', `http://localhost:3000/users/badge/${user_id}`);
axios.get(`${API_URL}/users/${user_id}`).then(function(response){
    let link = `../../frente/${response.data.subsector._id}/users`;
    let link2 = `../../frente/${response.data.subsector._id}/vehicles`;
    subSectorsWorkers.setAttribute('href', link);
    subsectorVehicles.setAttribute('href', link2);

}).catch(e=>{
    console.log(e);
});