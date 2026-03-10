import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : '/api/activities/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', data);
        setActivities(data.results || data);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Activities</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.user}</td>
              <td>{a.type}</td>
              <td>{a.duration}</td>
              <td>{a.distance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Activities;
