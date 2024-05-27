import React, { useState, useEffect } from 'react';
import './App.css';
import StatisticsComponent from './StatisticsComponent';

function App() {
  const [view, setView] = useState('map');  // Start with 'map' or 'statistika'
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/descriptions')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      {view === 'map' && (
        <>
          <button className="switch-button" onClick={() => setView('statistika')}>Switch to Statistika</button>
          <iframe 
            src="https://gis.ic.iem.gov.lv/giswebcais/" 
            title="GIS Map" 
            width="100%" 
            height="90vh"  // Adjusted for better coverage
            style={{ border: 0 }}
          ></iframe>
        </>
      )}
      {view === 'statistika' && (
        <>
          <button className="switch-button" onClick={() => setView('map')}>Back to Map</button>
          <StatisticsComponent data={data} />
        </>
      )}
    </div>
  );
}

export default App;