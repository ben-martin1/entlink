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