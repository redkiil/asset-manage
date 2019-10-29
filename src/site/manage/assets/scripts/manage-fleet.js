const operators = document.querySelectorAll('.operators');
const frotas = document.querySelectorAll('.frotas');

operators.forEach(function(elem){
    elem.addEventListener('dragstart', dragStart);
    elem.addEventListener('dragend', dragEnd);
});
frotas.forEach(function(elem){
    elem.addEventListener('dragover', dragOver);
    elem.addEventListener('dragleave', dragLeave);
    elem.addEventListener('dragenter', dragEnter);
    elem.addEventListener('drop', dragDrop);
});
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
    console.log("DRAG OVER",e)
}
function dragLeave(e){
    console.log("DRAG LEAVE",e)
    this.className = "frotas";
}
function dragEnter(e){
    e.preventDefault();
    this.className += " hover";
    console.log("DRAG ENTER",e)
}
function dragDrop(e){
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    this.className = "frotas";
    this.appendChild(document.getElementById(id));
    console.log("DRAG DROP",e, id);
}