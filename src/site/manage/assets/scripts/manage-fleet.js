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
        funcao: 'Transbordo'
    }, {
        name: 'Rafael',
        registration: 8735,
        funcao: 'Transbordo'
    }, {
        name: 'Vicente',
        registration: 7765,
        funcao: 'Transbordo'
    }, {
        name: 'Maria',
        registration: 6565,
        funcao: 'Colhedor'
    }, {
        name: 'Joao Victor',
        registration: 5452,
        funcao: 'Transbordo'
    }, {
        name: 'Edvan',
        registration: 3654,
        funcao: 'Colhedor'
    }
];
const tractorsContainer = document.querySelector('.fleet-tractors');
const harvesterContainer = document.querySelector('.fleet-harvesters');
const operatorsContainer = document.querySelector('#op-container');
operatorsContainer.addEventListener('dragover', dragOver);
operatorsContainer.addEventListener('dragleave', dragLeave);
operatorsContainer.addEventListener('dragenter', dragEnter);
operatorsContainer.addEventListener('drop', dragDrop);

window.onload = function(){
    populateFleet(tractors);
    this.populateOperators(operators);
}
/*function attachEvents(){
    const operators = document.querySelectorAll('.operators');
    const frotas = document.querySelectorAll('.frotas,#op-container');
    const tractorsContainer = document.querySelector('.fleet-tractors');
    const harvesterContainer = document.querySelector('.fleet-harvesters');
};
operators.forEach(function(elem){
    elem.addEventListener('dragstart', dragStart);
    elem.addEventListener('dragend', dragEnd);
});
frotas.forEach(function(elem){
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
    if(this.children.length >1  && !(this.id == "op-container")){
        this.className = "frotas frotas-error";
        return false;
    }
}
function dragLeave(e){
    e.preventDefault();
    console.log(this.id);
    if(this.children.length >1  && !(this.id == "op-container")){
        this.className = "frotas";
        return false;
    }
    if(!(this.id == "op-container")){
        this.className = "frotas";
    }
}
function dragEnter(e){
    e.preventDefault();
    if(this.children.length >1  && !(this.id == "op-container")){
        this.className = "frotas frotas-error";
        return false;
    }
    if(!(this.id == "op-container")){
        this.className += " hover";
    }
}
function dragDrop(e){
    e.preventDefault();
    console.log(this.children.length);
    if(this.children.length >1  && !(this.id == "op-container")){
        this.className = "frotas";
        return false;
    }
    if(!(this.id == "op-container")){
        this.className = "frotas";
    }
    const id = e.dataTransfer.getData("text/plain");
   
    this.appendChild(document.getElementById(id));
    console.log("DRAG DROP",e, id);
}
function populateFleet(data){
    console.log("CU",data);
    data.forEach(function(elem){
        //tractorsContainer.innerHTML +=  `<div class="frotas" id="${elem.fleetid}"><span>${elem.fleetid}</span></div>`;
        let mydiv = document.createElement('div');
        mydiv.setAttribute('id', elem.fleetid);
        mydiv.setAttribute('class', 'frotas');
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
        //tractorsContainer.innerHTML +=  `<div class="frotas" id="${elem.fleetid}"><span>${elem.fleetid}</span></div>`;
        let mydiv = document.createElement('div');
        mydiv.setAttribute('id', elem.registration);
        mydiv.setAttribute('class', 'operators');
        mydiv.setAttribute('draggable', true);
        mydiv.innerHTML = `<span>${elem.name}#${elem.registration}</span>`;
        mydiv.addEventListener('dragstart', dragStart);
        mydiv.addEventListener('dragend', dragEnd);

        //let op-description = <div class="op-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada tristique dapibus</div>
        let opDescription = document.createElement('div');
        opDescription.setAttribute('class', 'op-description');
        opDescription.innerHTML = `<span>Função:${elem.funcao} Status:Ativo</span>`
        
        operatorsContainer.appendChild(mydiv);
        mydiv.appendChild(opDescription);
    });
}