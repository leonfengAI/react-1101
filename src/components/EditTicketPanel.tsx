import { useState } from 'react';
import { XMarkIcon, EnvelopeIcon, ArrowPathIcon, BoltIcon } from '@heroicons/react/24/outline';
import { Ticket } from './ITSMWindow';
import '../css/EditTicketPanel.css';

interface EditTicketPanelProps {
  ticket: Ticket;
  onClose: () => void;
}

type TabType = 'AUTOMATION' | 'WORKFLOW';

export function EditTicketPanel({ ticket, onClose }: EditTicketPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('AUTOMATION');
  const [formData, setFormData] = useState({
    shortDescription: ticket.short_description,
    applicationName: ticket.application,
    assignedTo: ticket.assignee,
    assignmentGroup: '',
    automationPlatform: 'workflow manager',
    jobWorkflowName: 'Test Job'
  });

  return (
    <div className="edit-ticket-panel">
      <div className="panel-header">
        <button className="panel-close" onClick={onClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="panel-title-container">
          <h2 className="panel-title">Edit Ticket:</h2>
          <h2 className="panel-title">{ticket.ticket_number}</h2>
        </div>

        <div className="panel-divider" />
      </div>

      <div className="panel-content">
        <div className="panel-form">
          <div className="input-group">
            <label>Short Description</label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Application Name</label>
            <input
              type="text"
              value={formData.applicationName}
              onChange={(e) => setFormData({ ...formData, applicationName: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Assigned To</label>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Assignment Group</label>
            <input
              type="text"
              value={formData.assignmentGroup}
              onChange={(e) => setFormData({ ...formData, assignmentGroup: e.target.value })}
            />
          </div>
        </div>

        <div className="panel-divider" />
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'AUTOMATION' ? 'active' : ''}`}
            onClick={() => setActiveTab('AUTOMATION')}
          >
            AUTOMATION
          </button>
          <button
            className={`tab ${activeTab === 'WORKFLOW' ? 'active' : ''}`}
            onClick={() => setActiveTab('WORKFLOW')}
          >
            WORKFLOW
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'AUTOMATION' && (
            <div className="automation-content">
              <div className="select-group">
                <label>Automation Platform</label>
                <select
                  name="automation_select"
                  value={formData.automationPlatform}
                  onChange={(e) => setFormData({ ...formData, automationPlatform: e.target.value })}
                >
                  <option value="workflow manager">workflow manager</option>
                </select>
              </div>

              <div className="select-group">
                <label>Job/Workflow Name</label>
                <select
                  name="job_select"
                  value={formData.jobWorkflowName}
                  onChange={(e) => setFormData({ ...formData, jobWorkflowName: e.target.value })}
                >
                  <option value="Test Job">Test Job</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="panel-actions">
        <button className="action-button email">
          <EnvelopeIcon className="w-5 h-5" />
          <span>EMAIL</span>
        </button>
        <button className="action-button update">
          <ArrowPathIcon className="w-5 h-5" />
          <span>UPDATE</span>
        </button>
        <button className="action-button automate">
          <BoltIcon className="w-5 h-5" />
          <span>AUTOMATE</span>
        </button>
      </div>
    </div>
  );
}