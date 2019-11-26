window.onload = function(){
    var toleft = document.querySelector('.to-left');
    var toright = document.querySelector('.to-right');
    var dateDom = document.querySelector('.date');
    var calendar = document.querySelector("#calendar-table tbody");
    var date = new Date();
    var lastmonth;
    setTimeout(() => {
        dateDom.innerHTML = formatDate(date);
    }, 100);
    toleft.addEventListener('click', function(){
        date.setDate(date.getDate() - 1);
        dateDom.innerHTML = formatDate(date);
    });
    toright.addEventListener('click', function(){
        date.setDate(date.getDate() + 1);
        dateDom.innerHTML = formatDate(date);
    });
    function formatDate(date){
        month = (date.getMonth() + 1).toString();
        let year = date.getFullYear();
        let day = date.getDate().toString();
        day = day.replace(/^(\d)$/, "0$1");
        month = month.replace(/^(\d)$/, "0$1");
        if(lastmonth != month){
            generateCalendar(month, year);
            lastmonth = month;
        }
        changeDayClass(day);
        return `${day}/${month}/${year}`;
    }
    function changeDayClass(day){
        day = parseInt(day);
        let dayDOM = document.querySelector(`td[data-id='${day}']`);
        let previuosdayDOM = document.querySelector(`td[data-id='${day-1}']`);
        let nextdayDOM = document.querySelector(`td[data-id='${day+1}']`);
        if(previuosdayDOM)previuosdayDOM.className = "";
        if(nextdayDOM)nextdayDOM.className = "";
        if(dayDOM)dayDOM.className += "daySelected";
    }
    function generateCalendar(month, year){
        calendar.innerHTML = " ";
        let days = getDaysInMonth(month, year);
        let week = [" ", " ", " ", " ", " ", " ", " "];
        let rows = "";
        days.forEach(function(e,idx){
            week[e.getDay()] = e.getDate();
            if(e.getDay() == 6 || ((days.length-1) === idx)){
                //TODO: refact this to createElement
                rows += `<tr><td data-id=${week[0]}>${week[0]}</td><td data-id=${week[1]}>${week[1]}</td><td data-id=${week[2]}>${week[2]}</td><td data-id=${week[3]}>${week[3]}</td><td data-id=${week[4]}>${week[4]}</td><td data-id=${week[5]}>${week[5]}</td><td data-id=${week[6]}>${week[6]}</td></tr>`;;
                week = [" ", " ", " ", " ", " ", " ", " "];
            }
            if((days.length-1) === idx){
                calendar.insertAdjacentHTML('beforeend', rows);
            }
        });
    }
    function getDaysInMonth(month, year) {
        month = month - 1;
        let date = new Date(Date.UTC(year, month, 1));
        let days = [];
        while (date.getUTCMonth() === month) {
            date.setUTCDate(date.getUTCDate() + 1);
           days.push(new Date(date));
        }
        return days;
   }
}