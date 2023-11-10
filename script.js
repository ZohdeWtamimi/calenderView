console.log('hello world')

var isMousedown = false;
var parentId = '';
var selectedTimeSlots = {}; // New variable to store selected time slots
var selectedTimeAllWeek = {}; // New variable to store selected time slots

const days = document.querySelectorAll('.day-container');
const hours = document.querySelectorAll('.day-container div:not(.hour):not(.head)');
const daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
days.forEach((day) => {
    day.addEventListener('mousedown', (e) => {
        e.preventDefault();
        parentId = getParentId(e.target.parentNode.classList.value);
        e.target.className = setClass(parentId);
        isMousedown = true;
        getSelectedHours()
    });

    day.addEventListener('mouseup', (e) => { 
        isMousedown = false;
    });
});

hours.forEach((hour) => {
    hour.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        const isSameDay = parentId == getParentId(e.target.parentNode.classList.value);
        if (isMousedown && isSameDay) {
            e.target.className = setClass(parentId);
            const timeSlot = e.target.innerText;
            getSelectedHours()
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


function getSelectedHours() {
    daysArray.forEach(day => {
        let eles = document.querySelectorAll(`.${day}-selected`);
        if (eles.length > 0) {
            let from = eles[0].getAttribute('data-time');
            let to = eles[eles.length - 1].getAttribute('data-time');
            selectedTimeAllWeek[day] = addOneHourToToTime({ from: from, to: to });
        }
    });
    console.log(selectedTimeAllWeek);
}



function addOneHourToToTime(timeObject) {
    // Extract hours
    let fromHours = parseInt(timeObject.from);
    let toHours = parseInt(timeObject.to);
    let duration = (toHours + 1) - fromHours;

    // fromHours = parseInt(fromHours) >= 10 ? fromHours : '0' + fromHours
    let to = parseInt(fromHours) + duration

    if (to == 12) {
        to = '12:00 PM';
    } else if (to == 24) {
        to = '12:00 AM';
    } else if (to > 12) {
        to = (to - 12) + ':00 PM';
    } else {
        to = to + ':00 AM';
    }    

    if (fromHours == 12) {
        fromHours = '12:00 PM';
    } else if (fromHours > 12) {
        fromHours = (fromHours - 12) + ':00 PM';
    } else {
        fromHours = fromHours + ':00 AM';
    }    

    console.log(`from ${fromHours } to ${ to } duration ${duration}` )

    return {from: fromHours, to}

}
