window.onload = function(){
    let toleft = document.querySelector('.to-left');
    let toright = document.querySelector('.to-right');
    let date = document.querySelector('.date');
    let calendar = document.querySelector("#calendar-table tbody");
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
        generateCalendar(month, year);
        return `${day}/${month}/${year}`;
    }
    function generateCalendar(month, year){
        calendar.innerHTML = " ";
        let days = getDaysInMonth(month, year);
        let week = [" ", " ", " ", " ", " ", " ", " "];
        days.forEach(function(e,idx){
            week[e.getDay()] = e.getDate();
            if(e.getDay() == 6 || idx == days.length-1){
                let rows = `<tr><td>${week[0]}</td><td>${week[1]}</td><td>${week[2]}</td><td>${week[3]}</td><td>${week[4]}</td><td>${week[5]}</td><td>${week[6]}</td></tr>`;;
                calendar.insertAdjacentHTML('beforeend', rows);
                week = [" ", " ", " ", " ", " ", " ", " "];
            }
        });
    }
    function getDaysInMonth(month, year) {
        month = month - 1;
        var date = new Date(Date.UTC(year, month, 1));
        var days = [];
        while (date.getUTCMonth() === month) {
            date.setUTCDate(date.getUTCDate() + 1);
           days.push(new Date(date));
        }
        return days;
   }
}