window.onload = function(){
    let img = document.querySelector('.avatar-img');
    img.setAttribute('src', `http://localhost:3000/users/badge/${user_id}`);
};