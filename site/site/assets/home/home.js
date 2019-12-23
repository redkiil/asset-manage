
console.log("BAS", user_id);
let img = document.querySelector('.avatar-img');
let subSectorsWorkers = document.querySelector('#subsector-workers');
img.setAttribute('src', `http://localhost:3000/users/badge/${user_id}`);
axios.get(`${API_URL}/users/${user_id}`).then(function(response){
    let link = `../frente/${response.data.subsector._id}`;
    subSectorsWorkers.setAttribute('href', link);
}).catch(e=>{
    console.log(e);
});