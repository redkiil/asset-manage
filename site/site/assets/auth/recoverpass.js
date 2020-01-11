const button = document.getElementById('btn-submit');
const reg_input = document.getElementById('registration');
const msg = document.getElementById('msg');

button.addEventListener('click', (e) =>{
    e.preventDefault();
    let registration = reg_input.value;
    //TODO VALIDATION

    let data = { registration: registration };
    if(!validateData(data)) return false;
    axios.post(`${API_URL}/users/tokenrecovery`, data).then((r) => {
        console.log(r.data);
    }).catch((e) =>{
        console.error(e.response.data);
    })

})
let validateData = (values) =>{
    if(!values.registration){
        msg.innerHTML = "erro - matricula vazio";
        return false;
    }
    let regexp = /^[0-9]{4,5}$/;
    let okregistration = regexp.test(values.registration);
    if(!okregistration){
        msg.innerHTML = "erro - matricula invalida";
        return false;
    }
    return true;
}