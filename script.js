const allHours = $('.day-container div:not(.hour):not(.head)');
var isMousedown = false;
var parentId = '';
var selectedTimeAllWeek = {};

$('.day-container').on('mousedown', (e) => {
    e.preventDefault();
    parentId = getParentId($(e.target).parent().attr('class'));
    $(e.target).addClass(setClass(parentId));
    isMousedown = true;
    const timeFrom = $(e.target).data('time');

});

$('.day-container').on('mouseup', (e) => {
    selectedHoursDay(parentId)
    // $('#clickModal').click();
    isMousedown = false;
});

// ONLY ADD CLASS SELECTED TO ELEMENT IF THE MOUSEDOWN IS TRUE AND IT IS THE SAME DAY
allHours.on('mouseenter', (e) => {
    e.preventDefault();
    const isSameDay = parentId == getParentId($(e.target).parent().attr('class'));
    if (isMousedown && isSameDay ) {
        $(e.target).addClass(setClass(parentId));
    }
});

// REMOVE HOUR FROM SELECTED HOURS
allHours.on('dblclick', (e) => {
    e.preventDefault();
    let eleClass = setClass(parentId);
    $(e.target).removeClass(eleClass);
    selectedHoursDay(parentId)
});

function getParentId(classes) {
    return classes.replace(' day-container', '');
}

function setClass(id) {
    return `${id}-selected`;
}


// UPDATE SELECTED HOURS FOR SECPSFIC HOURS: USEAGE => [MOUSEUP, DBLCLICK]
function selectedHoursDay(day) {
    let selectedDay = $('.' + day + '-selected');
    selectedTimeAllWeek[parentId] = [];

    let fromTime = 0;

    selectedDay.each(function(index, element) {
        const time = parseInt($(element).data('time'));

        if (index === 0) {
            fromTime = time;
        } else {
            const prevTime = parseInt(selectedDay.eq(index - 1).data('time'));
            if (time !== prevTime + 1) {
                // If the current time is not consecutive to the previous, consider it as a new period
                selectedTimeAllWeek[parentId].push({ from: fromTime, to: prevTime + 1 });
                fromTime = time;
            }
        }

        if (index === selectedDay.length - 1) {
            // For the last element, consider it as the end of the period
            selectedTimeAllWeek[parentId].push({ from: fromTime, to: time + 1 });
        }

        console.log(time, 'index: ' + index);
    });

    console.log(selectedTimeAllWeek);
}

