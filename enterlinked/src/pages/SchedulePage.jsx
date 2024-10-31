import ScheduleCreator from "../components/CreateSchedule";
import { useState, useEffect } from "react";
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

    // calls function when eventList or booleanActive changes
    useEffect(() => { buildAvailableTimes(); }, [props.eventList, booleanActive]);

    const buildAvailableTimes = () => {
        if (!booleanActive){
            return; // function called when turning off booleanActive
        }
        const goodDates = conversionService.getAvailableTimes(temp_eventList, props.eventList);
        setAvailDates([props.eventList]); //change later to goodDates upon proper implementation
    };

    return (
        <div className="w-full">
            <span className="w-full text-center">Build a schedule below and you can copy/paste it as plaintext for easy sending. Use the <span onClick={booleanSchedule} className="p-2 bg-black text-white rounded hover:cursor-pointer">Enterlinked Boolean Scheduler</span> to quickly find available times for talent.</span>
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
                    {
                        <div className="bg-red-900 text-white">{availDates.map(availDate => (
                            <p key={availDate.index}>{conversionService.getParsedSchedule(availDate)}</p>))}
                        </div>
                        }
                </span>
                    :<></>}
            </div>
        </div>
    );
};

export default SchedulePage;