var form = document.getElementById("loginform");
    var btn = document.getElementById("btn-submit");
    let msg = document.getElementById("msg");
    btn.addEventListener('click', function(e){
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        let data = {
            registration: form.elements.registration.value,
            password: form.elements.password.value
        };
        if(!validateData(data)) return false;
        btn.classList.add("active");
        btn.disabled = true;
       axios.post('http://localhost:3000/auth', data, { withCredentials: true }).then(function(response){
            msg.innerHTML = response.data.message;
            btn.classList.add("success");
            setTimeout(function(){ window.location.href = "http://localhost:3001", 3000});
        }).catch(e=>{
            btn.classList.add("error");
            msg.innerHTML = e.response.data.message;
            setTimeout(function(){
                btn.classList.remove("error");
                btn.classList.remove("active");
                btn.disabled = false;
            }, 2000);
        });
    });
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
        if(!values.password){
            msg.innerHTML = "erro - senha vazia";
            return false;
        }
        return true;
    }