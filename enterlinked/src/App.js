import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import './App.css';

import ScheduleCreator from './components/CreateSchedule';
import SchedulePage from './pages/SchedulePage';
import BooleanScheduler from './pages/BooleanScheduler';


// import MyCalendar from './components/Calendar'; // save for react-big-cal implementation



// API call for cs361 A4
/*const data_call = async () => {
  console.log(apiUrl+'/cs361/a4/');
  try {
      const res = await fetch(apiUrl+'/cs361/a4/', {
        method: "POST",
        body: JSON.stringify({ message: "This is a message from CS361" }), // stringify serializes JSON data to ensure recieving API gets string-format
        headers: {
          'Content-Type': 'application/json' 
        },
      }
    );
      if (!res.ok) {
          throw new Error('Error - res not ok!');
      }
      const res_data = await res.json();
      return res_data
  } catch (err) {
      console.error('Error fetching Data!', err);
  }
};*/

function App() {
  // set cal data to null until api call is done
  //const [cal_data, setCalData] = useState(null);
  
  // useEffect hook - calls on state change/each render

  // save below for api call to fetch calendar data
  /*useEffect(() => {
    const fetchData = async () => {
      const data = await data_call();
      setCalData(data);
    };
    fetchData();
  }, []); // add a "refresh" hook into [] to change every x minutes. this will allow repeat api calls to update cal_data
*/
  const apiUrl = process.env.REACT_APP_API_URL;

  // state and global variables - passed as props down to CreateScheduler component to maintain schedules across pages
  const default_date = new Date().toISOString().slice(0,16);
  const [eventList, setEvents] = useState([]);
  const [deletedEvents, setDeletedEvents] = useState([]);
  const [eventIndex, setEventIndex] = useState(0);

  const schedulerProps = {default_date, eventList, setEvents, deletedEvents, setDeletedEvents, eventIndex, setEventIndex,};

  return (
    <BrowserRouter className='h-screen'>
    <div className='h-full flex flex-col items-center bg-blue-100'>
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