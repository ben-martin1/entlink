import eventService from "./eventService";

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

    const goodDates = [];
    open.forEach(open_date => {
        unavail.forEach(unavail_date => {
            console.log(`Checking ${open_date.start_date} against ${unavail_date.start_date}`);

            // start same day - check if there is a time conflict
            if (open_date.start_date.toDateString() === unavail_date.start_date.toDateString()){
                const open_date_start = open_date.start_date.getTime(); 
                const open_date_end = open_date.end_date.getTime(); 
                const unavail_date_start = unavail_date.start_date.getTime(); 
                const unavail_date_end = unavail_date.end_date.getTime(); 

                if (unavail_date_start > open_date_end){ // case: conflict starts after open_date ends - continue
                    console.log("Good date wide - conflict ends early");
                    goodDates.push(open_date);
                }
                if (unavail_date_end < open_date_start){ // case: conflict ends before open_date starts - continue
                    console.log("Good date wide - good date ends late");
                    goodDates.push(open_date);
                }
                if (unavail_date_end >= open_date_start && unavail_date_start <= open_date_start){ // case: conflict starts before open_date and ends after open_date starts
                    if (unavail_date_end < open_date_end){ // some of open_date is still avail
                        // TODO - create a new date equal to open date except make start time === unavail_date_end and return it. from createschedule, update the state
                        console.log("Good date cut short at beginning");
                        const new_good_date = {start_date:unavail_date.end_date, end_date:open_date.end_date};
                        goodDates.push(new_good_date);
                    }
                }
                if (unavail_date_start >= open_date_end){ // case: event starts during avail event
                    if (unavail_date_end < open_date_end){ // case: will need to split the event into 2 - for each available slot
                        const first_good_date = {start_date:open_date.start_date, end_date:unavail_date.end_date};
                        const second_good_date = {start_date:unavail_date.end_date, end_date:open_date.end_date};
                        console.log("Good date split");
                        goodDates.push(first_good_date);
                        goodDates.push(second_good_date);
                    }
                    else {
                        // TODO create new date equal to open date execpt END time === unavail_date_START. return it then update state in createSchedule
                        const new_good_date = {start_date:open_date.start_date, end_date:unavail_date.start_date};
                        goodDates.push(new_good_date);
                    }
                }
            }
            else{
                goodDates.push(open_date);
            }
        });
    });
    console.log("goodDates: ");
    console.log(goodDates);
    return open;
};

const conversionService = {getParsedSchedule, getAvailableTimes, changeEvent}

export default conversionService;