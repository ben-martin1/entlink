import { useState } from "react";
import DateLine from "./DateLine";

const ScheduleCreator = () => {
    // initialize two blank-array states for live events and deleted events
    const [eventList, setEvents] = useState([]);
    const [deletedEvents, setDeletedEvents] = useState([]);

    const changeEvent = (e, i) => {
        for (const ev in eventList) {
            if(ev.index === i){
                setEvents();
                ev.date = e.target.value;
                break;
            }
        }
    };

    const deleteEvent = (e) => {
        console.log("DELETED");
    };

    const addEvent = () => {
        const new_date = new Date();
        setEvents(eventList => [...eventList, {index:eventList.length, date:new_date }]);
        console.log(eventList);
    };
    return(
        <div className="w-full">
            {eventList.length === 0 ? <div onClick={addEvent} className="bg-green-500 rounded-lg p-3 hover:cursor-pointer">+</div>:<></>}
            {eventList.map(event => (
                <div key={event.index} className="w-full flex items-center justify-evenly">
                    <div onClick={deleteEvent} className="bg-red-500 rounded-lg p-3 hover:cursor-pointer">x</div>
                    <form>
                        <input type="date" onChange={(e) => changeEvent(e, event.index)} className="w-full bg-black rounded-lg p-4 text-white"></input>
                    </form>
                    <div onClick={addEvent} className="bg-green-500 rounded-lg p-3 hover:cursor-pointer">+</div>
                </div>
            ))}
        </div>
    );
};

export default ScheduleCreator;