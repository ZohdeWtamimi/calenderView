console.log('hello world')

var isMousedown = false;
var parentId = '';
var selectedTimeSlots = {}; // New variable to store selected time slots

const days = document.querySelectorAll('.day-container');
const hours = document.querySelectorAll('.day-container div:not(.hour):not(.head)');
const daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
days.forEach((day) => {
    day.addEventListener('mousedown', (e) => {
        e.preventDefault();
        parentId = getParentId(e.target.parentNode.classList.value);
        e.target.className = setClass(parentId);
        isMousedown = true;
    });

    day.addEventListener('mouseup', (e) => { 
        isMousedown = false;
        displaySelectedTimeSlots(parentId); // Call the function to display selected time slots
    });
});

hours.forEach((hour) => {
    hour.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        const isSameDay = parentId == getParentId(e.target.parentNode.classList.value);
        if (isMousedown && isSameDay) {
            e.target.className = setClass(parentId);
            const timeSlot = e.target.innerText;
        }
    });

    hour.addEventListener('dblclick', (e) => {
        e.preventDefault();
        
        let eleClass =  setClass(parentId);
        e.target.classList.remove(eleClass);
    });
});

function getParentId(classes) {
    return classes.replace(' day-container', '');
}

function setClass(id) {
    return `${id}-selected`;
}

function displaySelectedTimeSlots(day) {
    console.log("Selected Time Slots:");
    
    ele = document.querySelector(`.${day}.day-container`);
    console.log(ele.children)

}
