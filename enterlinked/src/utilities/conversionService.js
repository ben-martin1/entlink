const changeEvent = (eventList, setEvents, e, i) => {
    const value = e.target.value;
    let new_duration;
    let new_start_date;

    // get both date and duration of event with passed index
    eventList.map((ev) => {
        if (ev.index === i){
            new_start_date = ev.start_date;
            new_duration = ev.duration;
        } 
    });

    if (e.target.name === "duration"){
        new_duration = Number(value);
    } else{
        new_start_date = new Date(value);
    }
    let new_end_date = new Date(new_start_date.getTime() + (60*60*1000*new_duration)) // new_duration hours worth of milliseconds

    // if duration changed, we don't need to sort 
    if (e.target.name === "duration"){
        setEvents(old_evs => 
            old_evs.map((ev) => ev.index === i? {...ev, start_date:new_start_date, end_date:new_end_date, duration:new_duration }  : ev)
        );
    } else{
        setEvents(old_evs => 
            old_evs.map((ev) => ev.index === i? {...ev, start_date:new_start_date, end_date:new_end_date, duration:new_duration }  : ev)
        );
    }
};

const getParsedSchedule = (event) => {
    /* Takes a single event object and returns it as string */
    // TODO - consider allowing function to recieve a list and return a list of strings
    if (event.start_date === undefined)
        {
            return;
        }
    return event.start_date.toDateString() === event.end_date.toDateString() ? `${event.start_date.toDateString()} ${event.start_date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} - ${event.end_date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : `${event.start_date.toDateString()} ${event.start_date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} - ${event.end_date.toDateString()} ${event.end_date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`; 
} 

// TODO - consider sorting the dates for faster comparison? should i sort them here or upon creation?
const getAvailableTimes = (open, unavail) => {
    debugger;
    open.forEach(open_date => {
        unavail.forEach(unavail_date => {
            // start same day - check if there is a time conflict
            if (open_date.start_date.toDateString() === unavail_date.start_date.toDateString()){
                const open_date_start = open_date.start_date.getTime(); 
                const open_date_end = open_date.end_date.getTime(); 
                const unavail_date_start = unavail_date.start_date.getTime(); 
                const unavail_date_end = unavail_date.end_date.getTime(); 

                if (unavail_date_start > open_date_end){ // case: conflict starts after open_date ends - continue
                    return; // doesn't actually "return" since this is a foreach loop - more like continue
                }
                if (unavail_date_end < open_date_start){ // case: conflict ends after open_date starts - continue
                    return;
                }
                if (unavail_date_end > open_date_start && unavail_date_start < open_date_start){ // case: conflict starts before open_date and ends after open_date starts
                    if (open_date_end > unavail_date_end){ // some of open_date is still avail
                        // TODO - create a new date equal to open date except make start time === unavail_date_end and return it. from createschedule, update the state
                    }
                }
                if (unavail_date_start > open_date_end){ // case: event starts during avail event
                    if (unavail_date_end < open_date_end){ // case: will need to split the event into 2 - for each available slot
                        // add updateEvent into conversionservice and call it here - update start time for open_date to be === unavail_date_end
                    }
                    else {
                        // TODO create new date equal to open date execpt END time === unavail_date_START. return it then update state in createSchedule
                   
                    }
                }
            }
        });
    });
    return open;
};

const conversionService = {getParsedSchedule, getAvailableTimes, changeEvent}

export default conversionService;