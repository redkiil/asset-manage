 const button = document.querySelector('.btn-submit');
 const pass1field = document.querySelector('#password1');
 const pass2field = document.querySelector('#password2');
 axios.get(`${API_URL}/users/validatetoken/${token}`).then(r=>{
    console.log(r.data);
 }).catch(e=>{
    console.log(e.data);
 });
 button.addEventListener('click', (e) =>{
   e.preventDefault();
   let pass1 = pass1field.value;
   let pass2 = pass2field.value;

   if(!pass1)
      return console.error("campos vazios");
   if(pass1 != pass2)
      return console.error("as 2 senhas nao sao iguais");

   let pass = { new_pass: pass1 }; 
   axios.put(`${API_URL}/users/changepassword/${token}`, pass).then(r=>{
      console.log(r.data.message);
   }).catch(e=>{
      console.log(e.response.data.message);
   })
 });