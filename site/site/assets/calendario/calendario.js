var toleft = document.querySelector('.to-left');
var toright = document.querySelector('.to-right');
var dateDom = document.querySelector('.date');
var calendar = document.querySelector("#calendar-table tbody");
var date = new Date();
var lastmonth;
let fakeUsers = [{
        'name': 'Augusto Neto',
        'dayoff': Date.now(),
    },{
        'name': 'Augusto ',
        'dayoff': Date.now(),
    },{
        'name': 'Pedro Serafim',
        'dayoff': Date.now() + (1000 * 86400),
    },{
        'name': 'Joao Pedro',
        'dayoff': Date.now() + (1000 * 86400 * 3),
    },{
        'name': 'Pedrao Neto',
        'dayoff': Date.now(),
    }
]
setTimeout(() => {
    dateDom.innerHTML = formatDate(date);
    fakeUsers.forEach(data=>{
        console.log(new Date(data.dayoff).toISOString());

    })
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
    let week = [[" ", -1], [" ", -1], [" ",-1], [" ", -1], [" ", -1], [" ", -1], [" ",-1]];
    let rows = "";
    days.forEach(function(e,idx){
        let getFruit = fakeUsers.filter(user => new Date(user.dayoff).getDate() == e.getDate());
        var string = getFruit.map(i => `<em>${i.name}</em>`).join(' ');
        console.log("THFRUITLEN", string);
        //console.log("TJESTRIG", string);
        //week[e.getDay()] += string;
        if(getFruit.length){
            week[e.getDay()][0] = `<p class='txt-date'>${e.getDate()}</p><span class='txt-users-drsr'><p>DSR:</p>${string}</span>`;
            week[e.getDay()][1] = e.getDate();
        }else{
            week[e.getDay()][0] = `<p class='txt-date'>${e.getDate()}</p>`;
            week[e.getDay()][1] = e.getDate();
        }
        if(e.getDay() == 6 || ((days.length-1) === idx)){
            //TODO: refact this to createElement
            rows += `<tr><td data-id=${week[0][1]}>${week[0][0]}</td><td data-id=${week[1][1]}>${week[1][0]}</td><td data-id=${week[2][1]}>${week[2][0]}</td><td data-id=${week[3][1]}>${week[3][0]}</td><td data-id=${week[4][1]}>${week[4][0]}</td><td data-id=${week[5][1]}>${week[5][0]}</td><td data-id=${week[6][1]}>${week[6][0]}</td></tr>`;;
            week = [[" ", -1], [" ", -1], [" ",-1], [" ", -1], [" ", -1], [" ", -1], [" ",-1]];
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