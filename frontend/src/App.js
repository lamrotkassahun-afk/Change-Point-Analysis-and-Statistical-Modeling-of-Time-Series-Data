import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, Label 
} from 'recharts';

function App() {
  const [data, setData] = useState([]);
  
  // Requirement: Quantify impact of change points
  const changePoints = [
    { date: '01-Jun-87', label: 'Initial Shift', impact: 'Market Stabilization', price: '$18.65' },
    { date: '14-Jan-10', label: 'Post-Recession', impact: 'Rapid Recovery', price: '$77.00' },
    { date: '19-Feb-16', label: 'Supply Glut', impact: 'Significant Drop', price: '$34.00' },
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/prices')
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Birhan Energies: Brent Oil Price Dashboard</h1>
        <p>Visualizing price trends and quantified statistical change points.</p>
        
        {/* Main Chart Container */}
        <div style={{ width: '100%', height: 500, background: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="Date" minTickGap={50} tick={{fill: '#666'}} />
              <YAxis tick={{fill: '#666'}} label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft', fill: '#666' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
              <Line type="monotone" dataKey="Price" stroke="#2563eb" dot={false} strokeWidth={2} animationDuration={1500} />
              
              {changePoints.map((cp, index) => (
                <ReferenceLine key={index} x={cp.date} stroke="#ef4444" strokeDasharray="5 5">
                  <Label value={cp.label} position="top" fill="#ef4444" fontSize={12} fontWeight="bold" />
                </ReferenceLine>
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Change Point Summary Table */}
        <div style={{ background: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginTop: 0 }}>Statistical Change Point Summary</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Event/Label</th>
                <th style={{ padding: '12px' }}>Price at Change</th>
                <th style={{ padding: '12px' }}>Impact Description</th>
              </tr>
            </thead>
            <tbody>
              {changePoints.map((cp, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{cp.date}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#ef4444' }}>{cp.label}</td>
                  <td style={{ padding: '12px' }}>{cp.price}</td>
                  <td style={{ padding: '12px' }}>{cp.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;