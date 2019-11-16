window.onload = function(){
    let toleft = document.querySelector('.to-left');
    let toright = document.querySelector('.to-right');
    let date = document.querySelector('.date');
    let datea = new Date();
    date.innerHTML = formatDate(datea);

    toleft.addEventListener('click', function(){
        datea.setDate(datea.getDate() - 1);
        date.innerHTML = formatDate(datea);
    });
    toright.addEventListener('click', function(){
        datea.setDate(datea.getDate() + 1);
        date.innerHTML = formatDate(datea);
    });
    function formatDate(date){
        let month = (date.getMonth() + 1).toString();
        let year = date.getFullYear();
        let day = date.getDate().toString();
        day = day.replace(/^(\d)$/, "0$1");
        month = month.replace(/^(\d)$/, "0$1");
        return `${day}/${month}/${year}`;
    }
}