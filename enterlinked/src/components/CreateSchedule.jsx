import { useState } from "react";
import DateLine from "./DateLine";

const ScheduleCreator = () => {
    // initialize two blank-array states for live events and deleted events
    const [eventList, setEvents] = useState([ {index:0, date: new Date(), duration:4} ]);
    const [deletedEvents, setDeletedEvents] = useState([]);

    const default_date = new Date().toISOString().slice(0,16);

    const changeEvent = (e, i) => {
        const value = e.target.value;
        let new_date = new Date(value);
        let new_duration = eventList[i].duration;

        if (e.target.name === "duration"){
            new_date = eventList[i].date;
            new_duration = Number(value);
        }
        setEvents(old_evs => 
            old_evs.map((ev) => ev.index === i? {...ev, date:new_date, duration:new_duration }  : ev)
        );
    };

    const deleteEvent = (i) => {
        // add event to deleted events
        const old_ev = eventList[i];
        setDeletedEvents(deletedEventList => [...deletedEventList, old_ev]);
        console.log(deletedEvents);

        // delete event
        setEvents(old_evs => old_evs.filter((ev) => ev.index !==i));
    };

    const addEvent = () => {
        const new_date = new Date();
        setEvents(eventList => [...eventList, {index:eventList.length, date:new_date, duration:4 }]);
        console.log(eventList);
    };

    return(
        <div className="w-full flex flex-col items-center">
            {eventList.map(event => (
                <div key={event.index} className="w-full py-3 flex items-center justify-evenly">
                    <div onClick={() => deleteEvent(event.index)} className="bg-red-500 rounded-lg p-3 hover:cursor-pointer">x</div>
                    <form>
                        <input type="datetime-local" defaultValue={default_date} onInput={(e) => changeEvent(e, event.index)} className="bg-black rounded-lg p-4 text-white"></input>
                        <input type="number" defaultValue={4} min={0} name="duration" onInput={(e) => changeEvent(e, event.index)} className="bg-black rounded-lg p-4 text-white"></input>
                    </form>
                </div>
            ))}
            <div onClick={addEvent} className="w-16 text-center bg-green-500 rounded-lg p-3 hover:cursor-pointer">+</div>
        </div>
    );
};

export default ScheduleCreator;