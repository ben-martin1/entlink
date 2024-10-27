const getParsedSchedule = (event) => {
    // if event starts and ends on same date, don't include in the end_date
    return event.start_date.toDateString() === event.end_date.toDateString() ? `${event.start_date.toDateString()} ${event.start_date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} - ${event.end_date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : `${event.start_date.toDateString()} ${event.start_date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} - ${event.end_date.toDateString()} ${event.end_date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`; 
} 

// TODO - consider sorting the dates for faster comparison? should i sort them here or upon creation?
const getAvailableTimes = (open, unavail) => {
    ret = []; 
    open.forEach(open_date => {
        unavail.forEach(unavail_date => {
            // start same day - check if there is a time conflict
            if (open_date.start_date.toDateString() === unavail_date.start_date.toDateString()){
                const open_date_start = open_date.start_date.getTime(); 
                const open_date_end = open_date.end_date.getTime(); 
                const unavail_date_start = unavail_date.start_date.getTime(); 
                const unavail_date_end = unavail.end_date.getTime(); 

                if (unavail_date_start > open_date_end){ // case: conflict starts after open_date ends - continue
                    return; // doesn't actually "return" since this is a foreach loop - more like continue
                }
                if (unavail_date_end < open_date_start){ // case: conflict ends after open_date starts - continue
                    return;
                }
                if (unavail_date_end > open_date_start && unavail_date_start < open_date_start){ // case: conflict starts before open_date and ends after open_date starts
                    if (open_date_end > unavail_date_end){ // some of open_date is still avail
                        // TODO add updateEvent into conversionservice and call it here - update start time for open_date to be === unavail_date_end
                    }
                }
                if (unavail_date_start > open_date_end){ // case: event starts during avail event
                    if (unavail_date_end < open_date_end){ // case: will need to split the event into 2 - for each available slot
                        // add updateEvent into conversionservice and call it here - update start time for open_date to be === unavail_date_end
                    }
                    else {
                        // TODO add updateEvent into conversionservice and call it here - update END time for open_date to be === unavail_date_START
                   
                    }
                }
            }
        });
    });
};

const conversionService = {getParsedSchedule, getAvailableTimes}

export default conversionService;