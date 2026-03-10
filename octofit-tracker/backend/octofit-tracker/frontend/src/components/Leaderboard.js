import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboards/`
    : '/api/leaderboards/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
        setLeaderboard(data.results || data);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Leaderboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.user}</td>
              <td>{l.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Leaderboard;
