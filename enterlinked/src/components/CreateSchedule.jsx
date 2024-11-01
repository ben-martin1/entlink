import eventService from "../utilities/eventService";
import conversionService from "../utilities/conversionService";

// event = {index, start_date, end_date, duration}

const ScheduleCreator = ({default_date, eventList, setEvents, deletedEvents, setDeletedEvents, eventIndex, setEventIndex, showParse=true}) => {

    const changeEvent = (e, i) => {
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
        
        setEvents(old_evs => 
            old_evs.map((ev) => ev.index === i? {...ev, start_date:new_start_date, end_date:new_end_date, duration:new_duration }  : ev)
        );
    };
    const deleteEvent = (event) => {
        // add event to deleted events
        const old_ev = event;
        setDeletedEvents(deletedEventList => [...deletedEventList, old_ev]);

        // delete event
        setEvents(old_evs => old_evs.filter((ev) => ev.index !==event.index));
    };

    const addEvent = () => {
        const new_event = eventService.createEvent();
        setEvents(eventList => [...eventList, {index:eventIndex+1, ...new_event}]);
        setEventIndex(prevIndex => prevIndex+1);
    };

    const restoreEvents = () => {
        setEvents(old_evs => [...old_evs, ...deletedEvents]);
        setDeletedEvents([]);
    };
    
    return(
        <div className="w-full flex flex-col items-center">
            {eventList.map(event => (
                <div key={event.index} className="py-3 flex items-center justify-evenly">
                    <button onClick={() => deleteEvent(event)} className="bg-red-500 rounded-lg p-3 hover:cursor-pointer">x</button>
                    <form>
                        <input type="datetime-local" defaultValue={default_date} onInput={(e) => changeEvent(e, event.index)} className="bg-black rounded-lg p-4 text-white"></input>
                        <input type="number" defaultValue={event ? event.duration : 4} min={0} max={12} required name="duration" onInput={(e) => changeEvent(e, event.index)} className="bg-black rounded-lg p-4 text-white"></input>
                    </form>
                </div>
            ))}
            <div className="w-full flex items-center justify-around">
                <button onClick={addEvent}g className="w-16 text-center bg-green-500 rounded-lg p-3 hover:cursor-pointer">+</button>
                {deletedEvents.length > 0 ? <div onClick={restoreEvents} className="text-center bg-blue-500 rounded-lg p-3 hover:cursor-pointer"> Restore deleted events.</div>:<></>}
            </div>
            {showParse ? 
                <div id="parsedSchedule" className="py-12 flex flex-col items-center">
                    { eventList.length >0 ? <h1 className="text-center">Schedule</h1> : <></>}
                    {eventList.map(event => (
                    <p key={event.index}> {conversionService.getParsedSchedule(event)}</p>
                    ))}
                </div> 
            : <></>}
            
        </div>
    );
};

export default ScheduleCreator;