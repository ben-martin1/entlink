import ScheduleCreator from "../components/CreateSchedule";

const SchedulePage = ( {default_date, eventList, setEvents, deletedEvents, setDeletedEvents, eventIndex, setEventIndex} ) => {
    return (
        <div>
            <span>Build a schedule below and you can copy/paste it as plaintext for easy sending. Use the <a href="/compare">Enterlinked Boolean Scheduler</a> to quickly find available times for talent.</span>
            <ScheduleCreator 
                default_date={default_date}
                eventList={eventList} 
                setEvents={setEvents} 
                deletedEvents={deletedEvents} 
                setDeletedEvents={setDeletedEvents} 
                eventIndex={eventIndex} 
                setEventIndex={setEventIndex}/>
        </div>
    );
};

export default SchedulePage;