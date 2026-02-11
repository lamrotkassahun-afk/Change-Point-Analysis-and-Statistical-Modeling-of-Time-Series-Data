import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

function App() {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Requirement 1.a & 1.c: Fetch data from Flask API
    axios.get('http://localhost:5000/api/prices').then(res => setPrices(res.data));
    axios.get('http://localhost:5000/api/events').then(res => setEvents(res.data));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h2>Birhan Energies: Brent Oil Analysis Dashboard</h2>
      
      {/* Requirement 2.b: Interactive Visualizations */}
      <div style={{ width: '100%', height: 400, backgroundColor: 'white', padding: '10px' }}>
        <ResponsiveContainer>
          <LineChart data={prices}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="Price" stroke="#8884d8" dot={false} />
            
            {/* Requirement 2.c.ii: Event Highlight Functionality */}
            {events.map((ev, i) => (
              <ReferenceLine 
                key={i} 
                x={ev.Date} 
                stroke="red" 
                label={{ value: ev.Event, position: 'top', fill: 'red', fontSize: 10 }} 
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Requirement 2.c.iii: Drill-down Capability / Summary Table */}
      <div style={{ marginTop: '30px' }}>
        <h3>Key Event Impact Indicators</h3>
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th>Date</th>
              <th>Event</th>
              <th>Impact Category</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, i) => (
              <tr key={i}>
                <td>{ev.Date}</td>
                <td>{ev.Event}</td>
                <td>{ev.Impact || 'Significant Change Point'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;