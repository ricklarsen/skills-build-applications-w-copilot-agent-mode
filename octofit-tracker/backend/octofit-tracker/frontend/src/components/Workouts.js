import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', data);
        setWorkouts(data.results || data);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Workouts</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((w) => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>{w.name}</td>
              <td>{w.description}</td>
              <td>{w.duration}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Workouts;
