
console.log("BAS", user_id);
let img = document.querySelector('.avatar-img');
img.setAttribute('src', `http://localhost:3000/users/badge/${user_id}`);