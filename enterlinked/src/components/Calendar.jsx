import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const apiUrl = process.env.REACT_APP_API_URL;

const events = [
    {
      title: 'Team Meeting',
      start: new Date(2024, 9, 12, 10, 0), // October 12, 2024, 10:00 AM
      end: new Date(2024, 9, 12, 11, 0),   // October 12, 2024, 11:00 AM
      allDay: false,
      resourceId: 1,
    },
    {
      title: 'Project Deadline',
      start: new Date(2024, 9, 15, 17, 0), // October 15, 2024, 5:00 PM
      end: new Date(2024, 9, 15, 17, 30),   // October 15, 2024, 5:30 PM
      allDay: false,
    },
    {
      title: 'Client Presentation',
      start: new Date(2024, 9, 20, 14, 0), // October 20, 2024, 2:00 PM
      end: new Date(2024, 9, 20, 15, 0),   // October 20, 2024, 3:00 PM
      allDay: false,
      desc: 'Presentation for the new project',
    },
  ];


  
const MyCalendar = (props) => {
    const DnDCalendar = withDragAndDrop(Calendar)
    return(
        <div className="">
            <DnDCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
              />
        </div>
    )
  }


export default MyCalendar;