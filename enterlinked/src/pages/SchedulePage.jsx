import ScheduleCreator from "../components/CreateSchedule";
import { useState, useEffect } from "react";
import conversionService from "../utilities/conversionService";

const SchedulePage = ( {...props} ) => {
    const avail_default_date = new Date().toISOString().slice(0,16);
    const [avail_eventList, avail_setEvents] = useState([]);
    const [avail_deletedEvents, avail_setDeletedEvents] = useState([]);
    const [avail_eventIndex, avail_setEventIndex] = useState(0);
    const [booleanActive, setBooleanActive] = useState(false);

    const [availDates, setAvailDates] = useState([])

    const [showSchedParse, setShowSchedParse] = useState(true);
    const booleanSchedule = () => {
        setBooleanActive((old_bool) => !old_bool);
        setShowSchedParse((old_parse) => !old_parse);
    };

    // calls function when eventList, avail_eventList or booleanActive changes
    useEffect(() => { buildAvailableTimes(); }, [props.eventList, avail_eventList, booleanActive]);

    const buildAvailableTimes = () => {
        if (!booleanActive){
            return; // function called when turning off booleanActive
        }
        const goodDates = conversionService.getAvailableTimes(avail_eventList, props.eventList);
        setAvailDates(goodDates); //change later to goodDates upon proper implementation
    };

    return (
        <div className="w-full">
            <span className="w-full text-center">Build a schedule below and you can copy/paste it as plaintext for easy sending. Use the <span onClick={booleanSchedule} className="p-2 bg-black text-white rounded hover:cursor-pointer">Enterlinked Boolean Scheduler</span> to quickly find available times for talent.</span>
            <div className="mt-6 flex flex-row justify-around">
                <ScheduleCreator {...props} showParse={showSchedParse}/>
                {booleanActive ? <ScheduleCreator
                        default_date={avail_default_date}
                        eventList={avail_eventList} 
                        setEvents={avail_setEvents} 
                        deletedEvents={avail_deletedEvents} 
                        setDeletedEvents={avail_setDeletedEvents} 
                        eventIndex={avail_eventIndex} 
                        setEventIndex={avail_setEventIndex}
                        showParse={false}/>:<></>}
            </div>
            <div className="flex flex-col items-center">
                {avail_eventList.length > 0 && booleanActive?
                <div>
                    <div>Dates that work!</div>
                    {
                        <div className="bg-black text-white rounded-lg">{availDates.map(availDate => (
                            <p className="p-3" key={availDate.index}>{conversionService.getParsedSchedule(availDate)}</p>))}
                        </div>
                    }
                </div>
                    :<div>No compatable dates.</div>}
            </div>
        </div>
    );
};

export default SchedulePage;