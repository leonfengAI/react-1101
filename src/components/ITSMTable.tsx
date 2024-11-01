import { useState } from 'react';
import { Ticket } from './ITSMWindow';
import '../css/ITSMTable.css';

interface ITSMTableProps {
  filter: string;
  onTicketClick: (ticket: Ticket) => void;
}

// Helper function to generate random date in October 2024
const getRandomOctoberDate = () => {
  const day = Math.floor(Math.random() * 31) + 1;
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const second = Math.floor(Math.random() * 60);
  return `2024-10-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
};

// Helper function to generate random prediction percentage
const getRandomPrediction = () => {
  return `${Math.floor(Math.random() * 41) + 60}%`; // Random between 60-100%
};

const mockTickets: Ticket[] = Array.from({ length: 10 }, (_, i) => {
  const createdDate = getRandomOctoberDate();
  const lastUpdateDate = getRandomOctoberDate();
  return {
    ticket_number: `INC${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
    prediction: getRandomPrediction(),
    functional_id: `INC${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
    state: ['New', 'In Progress', 'Resolved', 'Closed'][i % 4],
    short_description: `Issue description ${i + 1}`,
    application: `App ${i + 1}`,
    assignee: `User ${i + 1}`,
    last_update_date: lastUpdateDate,
    created_date: createdDate
  };
});

export function ITSMTable({ filter, onTicketClick }: ITSMTableProps) {
  const [selectedTickets, setSelectedTickets] = useState<Set<string>>(new Set());

  const filteredTickets = mockTickets.filter(ticket =>
    Object.values(ticket).some(value =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  const handleCheckboxChange = (ticketNumber: string, checked: boolean) => {
    const newSelected = new Set(selectedTickets);
    if (checked) {
      newSelected.add(ticketNumber);
    } else {
      newSelected.delete(ticketNumber);
    }
    setSelectedTickets(newSelected);
  };

  return (
    <div className="table-container">
      <table className="itsm-table">
        <thead>
          <tr>
            <th className="checkbox-cell">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTickets(new Set(filteredTickets.map(t => t.ticket_number)));
                  } else {
                    setSelectedTickets(new Set());
                  }
                }}
                checked={selectedTickets.size === filteredTickets.length}
              />
            </th>
            <th>Prediction</th>
            <th>Functional ID</th>
            <th>State</th>
            <th>Short Description</th>
            <th>Application</th>
            <th>Assignee</th>
            <th>Last Update Date</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr
              key={ticket.ticket_number}
              onClick={() => onTicketClick(ticket)}
              id={ticket.ticket_number}
            >
              <td className="checkbox-cell" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedTickets.has(ticket.ticket_number)}
                  onChange={(e) => handleCheckboxChange(ticket.ticket_number, e.target.checked)}
                />
              </td>
              <td>
                <span className="prediction-badge">
                  {ticket.prediction}
                </span>
              </td>
              <td>{ticket.functional_id}</td>
              <td>
                <span className={`state-badge ${ticket.state.toLowerCase().replace(' ', '-')}`}>
                  {ticket.state}
                </span>
              </td>
              <td>{ticket.short_description}</td>
              <td>{ticket.application}</td>
              <td>{ticket.assignee}</td>
              <td>{ticket.last_update_date}</td>
              <td>{ticket.created_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}