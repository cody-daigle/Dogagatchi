/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Leader from './Leader.jsx';

function LeaderBoard() {
  const [leaders, setLeaders] = useState([]);
  const [board, setBoard] = useState('smartest');
  function getLeaders(type) {
    axios.get(`/leaderboard/${type}`)
      .then(({ data }) => {
        setLeaders(data); // sets leaders to data property from User query obj
      })
      .then(() => {
        if (type === 'smartest') {
          setBoard('smartest');
          console.log('smartest');
        } else if (type === 'richest') {
          console.log('richest');
          setBoard('richest');
        }
      })
      .catch((err) => console.error('getLeaders ERROR (client):', err));
  }

  // leader board defaults to smartest parents on rendering
  useEffect(() => {
    if (leaders.length === 0) { getLeaders('smartest'); }
  });

  return (
    <div>
      <h2>Leader Board</h2>
      <Button onClick={() => getLeaders('smartest')}>Smartest Parents</Button>
      <Button onClick={() => getLeaders('richest')}>Richest Parents</Button>
      <Table className="table">
        <thead className="leader-table">
          <tr>
            <th scope="col" className="header-name">Username</th>
            <th scope="col" className="header-name">
              {
            board === 'smartest'
              ? 'Correct Questions'
              : 'Tokens'
              }

            </th>
          </tr>
        </thead>

        {leaders.map((leaderObj) => (
          <Leader
            leader={leaderObj}
            key={leaderObj._id}
            view={board}
          />
        ))}

      </Table>
    </div>
  );
}

export default LeaderBoard;