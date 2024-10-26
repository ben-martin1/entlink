import ScheduleCreator from "../components/CreateSchedule";

const SchedulePage = ( {...props} ) => {
    return (
        <div>
            <span>Build a schedule below and you can copy/paste it as plaintext for easy sending. Use the <a href="/compare">Enterlinked Boolean Scheduler</a> to quickly find available times for talent.</span>
            <ScheduleCreator {...props}/>
        </div>
    );
};

export default SchedulePage;