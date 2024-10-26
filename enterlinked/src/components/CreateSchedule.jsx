import { useState } from "react";
import DateLine from "./DateLine";

const ScheduleCreator = ({default_date, eventList, setEvents, deletedEvents, setDeletedEvents, eventIndex, setEventIndex, showParse=true}) => {
    // initialize two blank-array states for live events and deleted events

    // const default_date = new Date().toISOString().slice(0,16);
    // const [eventList, setEvents] = useState(...existing_evs, [ {index:0, date: new Date(default_date), duration:4} ]);
    // const [deletedEvents, setDeletedEvents] = useState([]);
    // const [eventIndex, setEventIndex] = useState(0);
    const changeEvent = (e, i) => {
        const value = e.target.value;
        let new_duration;
        let new_date;

        // get both date and duration of event with passed index
        eventList.map((ev) => {
            if (ev.index === i){
                new_date = ev.date;
                new_duration = ev.duration;
            } 
        });

        if (e.target.name === "duration"){
            new_duration = Number(value);
        } else{
            new_date = new Date(value);
        }

        setEvents(old_evs => 
            old_evs.map((ev) => ev.index === i? {...ev, date:new_date, duration:new_duration }  : ev)
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
        const new_date = new Date(default_date);
        console.log(eventList.length);
        setEvents(eventList => [...eventList, {index:eventIndex+1, date:new_date, duration:4 }]);
        setEventIndex(prevIndex => prevIndex+1);
    };

    const getParsedSchedule = (event) => {
        const ev_date = event.date;
        const duration = event.duration;
        let hours = event.date.getHours()+Math.floor(event.duration);
        let minutes = event.date.getMinutes() + (event.duration%1)*60;
        let meridiem = "AM"

        if (minutes > 60){
            hours += 1;
            minutes -= 60;
        }

        if (hours > 12){
            hours -= 12;
            meridiem = "PM";
            if (hours>12){
                // alert("Error - end time extends past midnight.");
                return;
            }
        }
        minutes = Math.floor(minutes)<10 ? "0"+String(Math.floor(minutes)) : String(Math.floor(minutes));
        let end_time = `-${String(hours)}:${minutes}${meridiem} (${Math.floor(duration)} hours, ${Math.floor((duration%1)*60)} minutes)`;
        
        // this is disgusting - find a better way
        return` ${String(ev_date.getMonth()+1)}/${String(ev_date.getDate())}/${String(ev_date.getFullYear())} ${ev_date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}${end_time}`;
    } 

    const restoreEvents = () => {
        debugger;
        setEvents(old_evs => [...old_evs, ...deletedEvents]);
        setDeletedEvents([]);
    };
    
    return(
        <div className="w-full flex flex-col items-center">
            {eventList.map(event => (
                <div key={event.index} className="w-full py-3 flex items-center justify-evenly">
                    <button onClick={() => deleteEvent(event)} className="bg-red-500 rounded-lg p-3 hover:cursor-pointer">x</button>
                    <form>
                        <input type="datetime-local" defaultValue={(event && event.date) ? event.date : default_date} onInput={(e) => changeEvent(e, event.index)} className="bg-black rounded-lg p-4 text-white"></input>
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
                    <p key={event.index}> {getParsedSchedule(event)}</p>
                    ))}
                </div> 
            : <></>}
            
        </div>
    );
};

export default ScheduleCreator;