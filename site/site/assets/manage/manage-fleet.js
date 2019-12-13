const tractors = [
    {
        fleetid: 3122
    }, {
        fleetid: 3123
    }, {
        fleetid: 3124
    },{
        fleetid: 3135
    },{
        fleetid: 3145
    },{
        fleetid: 3147
    },{
        fleetid: 3159
    },{
        fleetid: 3160
    },{
        fleetid: 3161
    },

    //harvesters
    {
        fleetid: 3733
    }, {
        fleetid: 3735
    },{
        fleetid: 3739
    },{
        fleetid: 3741
    },{
        fleetid: 3743
    },
];
const operators = [
    {
        name: 'Augusto',
        registration: 8747,
        job: 'Transbordo'
    }, {
        name: 'Rafael',
        registration: 8735,
        job: 'Transbordo'
    }, {
        name: 'Vicente',
        registration: 7765,
        job: 'Transbordo'
    }, {
        name: 'Maria',
        registration: 6565,
        job: 'Colhedor'
    }, {
        name: 'Joao Victor',
        registration: 5452,
        job: 'Transbordo'
    }, {
        name: 'Edvan',
        registration: 3654,
        job: 'Colhedor'
    }
];
const tractorsContainer = document.querySelector('.fleet-tractors');
const harvesterContainer = document.querySelector('.fleet-harvesters ul');
const operatorsContainer = document.querySelector('#op-container');
const operatorsList = document.querySelector("#op-container ul");
operatorsContainer.addEventListener('dragover', dragOver);
operatorsContainer.addEventListener('dragleave', dragLeave);
operatorsContainer.addEventListener('dragenter', dragEnter);
operatorsContainer.addEventListener('drop', dragDrop);
/*function attachEvents(){
    const operators = document.querySelectorAll('.operators');
    const fleets = document.querySelectorAll('.fleets,#op-container');
    const tractorsContainer = document.querySelector('.fleet-tractors');
    const harvesterContainer = document.querySelector('.fleet-harvesters');
};
operators.forEach(function(elem){
    elem.addEventListener('dragstart', dragStart);
    elem.addEventListener('dragend', dragEnd);
});
fleets.forEach(function(elem){
    elem.addEventListener('dragover', dragOver);
    elem.addEventListener('dragleave', dragLeave);
    elem.addEventListener('dragenter', dragEnter);
    elem.addEventListener('drop', dragDrop);
});*/
//drag functions
function dragStart(e){
    console.log("DRAG START",e)
    e.dataTransfer.setData("text/plain", e.target.id);
}
function dragEnd(e){
    console.log("DRAG END",e)
}
//oaskdoksad
function dragOver(e){
    e.preventDefault();
    console.log(this.id);
    if(this.children.length >1  && !(this.id == "op-container")){
        this.className = "fleets fleets-error";
        return false;
    }
}
function dragLeave(e){
    e.preventDefault();
    console.log(this.id);
    if(this.children.length >1  && !(this.id == "op-container")){
        this.className = "fleets";
        return false;
    }
    if(!(this.id == "op-container")){
        this.className = "fleets";
    }
}
function dragEnter(e){
    e.preventDefault();
    if(this.children.length >1  && !(this.id == "op-container")){
        //this.className = "fleets fleets-error";
        return false;
    }
    if(!(this.id == "op-container")){
       this.className += " hover";
    }
}
function dragDrop(e){
    e.preventDefault();
    console.log(this.children.length);
    let nodetoappend = (this.id != "op-container") ? this : operatorsList;
    if(this.children.length >1  && !(this.id == "op-container")){
        this.className = "fleets";
        return false;
    }
    if(!(this.id == "op-container")){
        this.className = "fleets";
    }
    const id = e.dataTransfer.getData("text/plain");
   
    nodetoappend.appendChild(document.getElementById(id));
    console.log("DRAG DROP",e, id);
}
function populateFleet(data){
    console.log("CU",data);
    data.forEach(function(elem){
        //tractorsContainer.innerHTML +=  `<div class="fleets" id="${elem.fleetid}"><span>${elem.fleetid}</span></div>`;
        let mydiv = document.createElement('li');
        mydiv.setAttribute('id', elem.fleetid);
        mydiv.setAttribute('class', 'fleets');
        mydiv.innerHTML = `<span>${elem.fleetid}</span>`;
        mydiv.addEventListener('dragover', dragOver);
        mydiv.addEventListener('dragleave', dragLeave);
        mydiv.addEventListener('dragenter', dragEnter);
        mydiv.addEventListener('drop', dragDrop);
        let firstfleet = (elem.fleetid / 100) | 0;
        console.log(firstfleet);
        switch(firstfleet){
            case 30,31: tractorsContainer.appendChild(mydiv); break;
            case 37: harvesterContainer.appendChild(mydiv); break;
        }
    });
}
function populateOperators(data){
    data.forEach(function(elem){
        //tractorsContainer.innerHTML +=  `<div class="fleets" id="${elem.fleetid}"><span>${elem.fleetid}</span></div>`;
        let mydiv = document.createElement('li');
        mydiv.setAttribute('id', elem.registration);
        mydiv.setAttribute('class', 'operators');
        mydiv.setAttribute('draggable', true);
        mydiv.innerHTML = `<span>${elem.name}#${elem.registration}</span>`;
        mydiv.addEventListener('dragstart', dragStart);
        mydiv.addEventListener('dragend', dragEnd);

        //let op-description = <div class="op-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada tristique dapibus</div>
        let opDescription = document.createElement('div');
        opDescription.setAttribute('class', 'op-description');
        opDescription.innerHTML = `<span>Função:${elem.job} Status:Ativo</span>`
        
        operatorsList.appendChild(mydiv);
        mydiv.appendChild(opDescription);
    });
}

populateFleet(tractors);
this.populateOperators(operators);
