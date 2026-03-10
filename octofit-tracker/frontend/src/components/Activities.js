import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespace}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities endpoint:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched activities:', data);
        setActivities(data.results || data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
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
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.id}</td>
              <td>{activity.user}</td>
              <td>{activity.type}</td>
              <td>{activity.duration}</td>
              <td>{activity.distance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Activities;