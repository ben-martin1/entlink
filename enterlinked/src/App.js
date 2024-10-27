import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import './App.css';

import SchedulePage from './pages/SchedulePage';
import BooleanScheduler from './pages/BooleanScheduler';


// import MyCalendar from './components/Calendar'; // save for react-big-cal implementation

function App() {

  const apiUrl = process.env.REACT_APP_API_URL;

  // state and global variables - passed as props down to CreateScheduler component to maintain schedules across pages
  const default_date = new Date().toISOString().slice(0,16);
  const [eventList, setEvents] = useState([]);
  const [deletedEvents, setDeletedEvents] = useState([]);
  const [eventIndex, setEventIndex] = useState(0);

  //useEffect(() => { console.log('setEvent was called with value:', eventList);}, [eventList]);

  const schedulerProps = {default_date, eventList, setEvents, deletedEvents, setDeletedEvents, eventIndex, setEventIndex,};

  // MUST DO build homepage
  // MUST DO figure out state issue accross renders
  // MUST DO fix default date not filling in input fields on creation/restoration
  return (
    <BrowserRouter className='h-screen'>
    <div className='h-screen flex flex-col items-center bg-blue-100'>
      <h1 className='p-4 text-7xl'><a href="/">ENTERLINKED</a></h1>
      <main className="w-full" >
        <Routes className="w-full" >
          <Route path='/' element={<a href='/schedule'>schedule</a>}/>
          <Route path="/schedule" element={<SchedulePage {...schedulerProps}/>}/>
          <Route path="/compare" element={<BooleanScheduler {...schedulerProps}/>}/>
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
  /*todo - make cal_data props for MyCalendar. (also maybe rename mycalendar)
    todo - fix height issue with monthly calendar (has to do with a missing px-defined height)
    todo - make dummy cal data
    todo - add drag and drop to move (look into DnD cal event listeners)
    todo - add dnd to create (again - event listeners)
    todo - find an ORM and deploy a database to AWS
    todo - create a state to recall fetchData every x time
  */