import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespace}-8000.app.github.dev/api/leaderboards/`;

  useEffect(() => {
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched leaderboard:', data);
        setLeaderboard(data.results || data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.user}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Leaderboard;