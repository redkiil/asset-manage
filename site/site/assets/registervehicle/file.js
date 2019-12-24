var btn = document.querySelector("#btnsend");
var form = document.querySelector("#registerVehicle");

btn.addEventListener('click', (e) => {
    e.preventDefault();
    let myobj = {};

    Array.from(form.elements).forEach(data =>{
        let fieldname = data.name;
        let fieldvalue = data.value;
        myobj = { [fieldname]: fieldvalue, ...myobj };
    });

    axios.post(`${API_URL}/vehicles`, myobj).then(r =>{
        console.log("OK", r);
    }).catch(e=>{
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
    });
});