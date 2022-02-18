// CODE EXPLAINED channel

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const noUnchecked = document.getElementById('noUnchecked');

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
    updateChecked(LIST);
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//function get number of unchecked
function updateChecked(myList){
  const unCheckedArray = myList.filter((item)=>{
    return item.done == false && item.trash == false;
  });
  noUnchecked.innerHTML = unCheckedArray.length;
  /* console.log(unCheckedArray); */
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            updateChecked(LIST);
            
            id++;
        }
        input.value = "";
    }
});


// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
    updateChecked(LIST);
});





































/* const input = document.getElementById('input');
const plus = document.querySelector('.fa-plus-circle');
const itemDOM = document.getElementById('list');

let myItems = '';
let id = 0; */




/* function addItem (){ */
  /* console.log('Button clicked'); */
  /* let inputValue = input.value;
  id += 1; */
  /* console.log(id); */
  /* if (inputValue !== ''){
    myItems += `<li class="item">
                <i class="fa fa-circle-thin co" job="complete" id="${id}"></i>
                <p class="text">${inputValue}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
            </li>`;
    itemDOM.innerHTML = myItems;
  }
  input.value = '';
} */

/* plus.addEventListener('click', ()=>{
  let inputValue = plus.value;
  addItem(inputValue);
}); */

/* ---- setting up add todo buttons---- */
/* plus.addEventListener("click", addItem);
input.addEventListener("keypress", (e)=> {
  if (e.keyCode === 13) {
    addItem();
  }
}) */