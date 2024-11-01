import { XMarkIcon } from '@heroicons/react/24/outline';
import '../css/TicketPanel.css';

interface NewTicketPanelProps {
  onClose: () => void;
}

export function NewTicketPanel({ onClose }: NewTicketPanelProps) {
  return (
    <div className="ticket-panel">
      <div className="panel-header">
        <button className="panel-close" onClick={onClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>
        
        <div className="panel-title-container">
          <h2 className="panel-title">Create</h2>
          <h2 className="panel-title">New Ticket</h2>
        </div>

        <div className="panel-divider" />
      </div>

      <div className="panel-content">
        <div className="panel-form">
          <div className="input-group">
            <label>Short Description</label>
            <input type="text" placeholder="Enter short description" />
          </div>

          <div className="input-group">
            <label>Application Name</label>
            <input type="text" placeholder="Enter application name" />
          </div>

          <div className="input-group">
            <label>Assigned To</label>
            <input type="text" placeholder="Enter assignee" />
          </div>

          <div className="input-group">
            <label>Assignment Group</label>
            <input type="text" placeholder="Enter assignment group" />
          </div>
        </div>
      </div>

      <div className="panel-footer">
        <button className="create-button" onClick={onClose}>
          CREATE
        </button>
      </div>
    </div>
  );
}