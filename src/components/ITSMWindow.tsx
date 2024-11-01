import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ITSMTable } from './ITSMTable';
import { NewTicketPanel } from './NewTicketPanel';
import { EditTicketPanel } from './EditTicketPanel';
import { ExportConfirmation } from './ExportConfirmation';
import '../css/ITSMWindow.css';

export interface Ticket {
  ticket_number: string;
  prediction: string;
  functional_id: string;
  state: string;
  short_description: string;
  application: string;
  assignee: string;
  last_update_date: string;
  created_date: string;
}

export function ITSMWindow() {
  const [ticketType, setTicketType] = useState('Service Now Incident');
  const [ticketFilter, setTicketFilter] = useState('');
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [showEditTicket, setShowEditTicket] = useState(false);
  const [showExportConfirm, setShowExportConfirm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleExport = () => {
    setShowExportConfirm(true);
  };

  const handleNewTicket = () => {
    setShowNewTicket(true);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowEditTicket(true);
  };

  return (
    <div className="itsm-window">
      <div className="controls-container">
        <div className="controls-left">
          <span className="tickets-label">Tickets</span>
          <select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            className="ticket-type-select"
          >
            <option value="Service Now Incident">Service Now Incident</option>
          </select>
        </div>
        <div className="controls-right">
          <div className="search-container">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              value={ticketFilter}
              onChange={(e) => setTicketFilter(e.target.value)}
              placeholder="Search tickets..."
              className="search-input"
            />
          </div>
          <button onClick={handleExport} className="export-button">
            Export
          </button>
          <button onClick={handleNewTicket} className="new-ticket-button">
            +NEW TICKET
          </button>
        </div>
      </div>

      <ITSMTable
        filter={ticketFilter}
        onTicketClick={handleTicketClick}
      />

      {showNewTicket && (
        <NewTicketPanel
          onClose={() => setShowNewTicket(false)}
        />
      )}

      {showEditTicket && selectedTicket && (
        <EditTicketPanel
          ticket={selectedTicket}
          onClose={() => setShowEditTicket(false)}
        />
      )}

      {showExportConfirm && (
        <ExportConfirmation
          onClose={() => setShowExportConfirm(false)}
        />
      )}
    </div>
  );
}