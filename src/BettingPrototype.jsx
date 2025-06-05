import React, { useState } from 'react';

const sportsEvents = [
  { id: 1, match: 'Team A vs Team B', odds: { A: 2.0, B: 1.8 } },
  { id: 2, match: 'Team C vs Team D', odds: { C: 1.5, D: 2.5 } },
];

export default function BettingPrototype() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [amount, setAmount] = useState('');
  const [potentialWin, setPotentialWin] = useState(null);

  const handleBet = () => {
    if (!selectedEvent || !selectedTeam || !amount) return;
    const odds = selectedEvent.odds[selectedTeam];
    setPotentialWin((parseFloat(amount) * odds).toFixed(2));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Sports Betting Prototype</h1>

      <select onChange={(e) => setSelectedEvent(sportsEvents.find(event => event.id === parseInt(e.target.value)))}>
        <option value="">Select Match</option>
        {sportsEvents.map(event => (
          <option key={event.id} value={event.id}>{event.match}</option>
        ))}
      </select>

      {selectedEvent && (
        <select onChange={(e) => setSelectedTeam(e.target.value)}>
          <option value="">Select Team</option>
          {Object.keys(selectedEvent.odds).map(team => (
            <option key={team} value={team}>{team} (odds: {selectedEvent.odds[team]})</option>
          ))}
        </select>
      )}

      <input
        type="number"
        placeholder="Enter amount to bet"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleBet}>Place Bet</button>

      {potentialWin && (
        <div>
          <strong>Potential Win:</strong> ${potentialWin}
        </div>
      )}
    </div>
  );
}
