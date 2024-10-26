import ScheduleCreator from "../components/CreateSchedule";
import { useState } from "react";

const BooleanScheduler = ( {...props} ) => {
    // state for temp schedulecreator
    const temp_default_date = new Date().toISOString().slice(0,16);
    const [temp_eventList, temp_setEvents] = useState([]);
    const [temp_deletedEvents, temp_setDeletedEvents] = useState([]);
    const [temp_eventIndex, temp_setEventIndex] = useState(0);

    return(
        <div className="w-full bg-blue-50">
        <a href="/schedule">Schedule</a>
            <div className="w-full flex justify-around">
                <div>
                    <div>Your schedule:</div>
                    <ScheduleCreator {...props} showParse={false}/>
                </div>
                <div className="">
                    <div>Enter dates other party is available:</div>
                    <ScheduleCreator
                        default_date={temp_default_date}
                        eventList={temp_eventList} 
                        setEvents={temp_setEvents} 
                        deletedEvents={temp_deletedEvents} 
                        setDeletedEvents={temp_setDeletedEvents} 
                        eventIndex={temp_eventIndex} 
                        setEventIndex={temp_setEventIndex}
                        showParse={false}/>
                </div>
            </div>
        </div>
    );
};

export default BooleanScheduler;