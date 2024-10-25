import ScheduleCreator from "../components/CreateSchedule";

const BooleanScheduler = ( {default_date, eventList, setEvents, deletedEvents, setDeletedEvents, eventIndex, setEventIndex} ) => {   
    return(
        <>
        bool
        <ScheduleCreator 
                default_date={default_date}
                eventList={eventList} 
                setEvents={setEvents} 
                deletedEvents={deletedEvents} 
                setDeletedEvents={setDeletedEvents} 
                eventIndex={eventIndex} 
                setEventIndex={setEventIndex}/>
        </>
    );
};

export default BooleanScheduler;