import ScheduleCreator from "../components/CreateSchedule";
import { useState } from "react";
import conversionService from "../utilities/conversionService";

const SchedulePage = ( {...props} ) => {
    const temp_default_date = new Date().toISOString().slice(0,16);
    const [temp_eventList, temp_setEvents] = useState([]);
    const [temp_deletedEvents, temp_setDeletedEvents] = useState([]);
    const [temp_eventIndex, temp_setEventIndex] = useState(0);
    const [booleanActive, setBooleanActive] = useState(false);

    const [availDates, setAvailDates] = useState([])

    const [showSchedParse, setShowSchedParse] = useState(true);
    const booleanSchedule = () => {
        setBooleanActive((old_bool) => !old_bool);
        setShowSchedParse((old_parse) => !old_parse);
    };

    return (
        <div className="w-full">
            <span className="w-full text-center">Build a schedule below and you can copy/paste it as plaintext for easy sending. Use the <span onClick={booleanSchedule} className="p-2 bg-black text-white rounded">Enterlinked Boolean Scheduler</span> to quickly find available times for talent.</span>
            <div className="mt-6 flex flex-row justify-around">
                <ScheduleCreator {...props} showParse={showSchedParse}/>
                {booleanActive ? <ScheduleCreator
                        default_date={temp_default_date}
                        eventList={temp_eventList} 
                        setEvents={temp_setEvents} 
                        deletedEvents={temp_deletedEvents} 
                        setDeletedEvents={temp_setDeletedEvents} 
                        eventIndex={temp_eventIndex} 
                        setEventIndex={temp_setEventIndex}
                        showParse={false}/>:<></>}
            </div>
            <div>
                {temp_eventList.length > 0 && booleanActive?
                <span>
                    <div>Dates that work!</div>
                    {temp_eventList.map((t_ev) => (<p>{conversionService.getParsedSchedule(t_ev)}</p>))}
                </span>
                    :<></>}
            </div>
        </div>
    );
};

export default SchedulePage;