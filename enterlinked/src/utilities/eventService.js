/* THIS FILE PROVIDES UTILITIES TO CREATE/MODIFY EVENTS AND DATES. DATE FUNCTIONS ARE HELPER FUNCTIONS FOR EVENT FUNCTIONS */
// THIS FILE DOES NOT HANDLE STATES IN ANY WAY

const defaultDate = new Date().toISOString().slice(0,16);

const getDuration = (event) => {
    /* returns duration of a specified event, in hours */
    return (event.start_date - event.end_date)(60*60*1000);
};

const createDate = (length = 0, start=null) => {
    /* creates a date. defaults to defaultDate unless start is specified. defaults to 4 hours long unless length is specified */
    const date = start ? new Date(start) : new Date(defaultDate);
    if (length !== 0){
        return new Date(date.getTime() + (60*60*1000*length)) // offset hours worth of milliseconds
    }
    return date;
};

const createEvent = () => {
    /* creates an event without an index */
    const new_start_date = createDate();
    const new_end_date = createDate(4); // currently default events to 4 hours long
    const event = {start_date:new_start_date, end_date: new_end_date, duration: 4};

    return event
};

const modifyDate = () => {


};

const modifyEvent = (event, newStartDate=null, newEndDate=null, duration=null) => {
    /* modifies the event. it is up to the individual component calling this to parse the request exactly */
    const new_start = newStartDate ? newStartDate : event.start_date;
    const new_duration = duration ? duration: 4;
    const new_end = newEndDate ? newEndDate : createDate(duration, newStartDate);

    return {start_date:new_start, end_date:new_end, duration: new_duration};
};

const eventService = {defaultDate, getDuration, createDate, createEvent, modifyDate, modifyEvent};

export default eventService;