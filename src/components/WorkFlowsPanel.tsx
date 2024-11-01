import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import '../css/WorkFlowsPanel.css';

interface WorkFlow {
  id: string;
  name: string;
  description: string;
  status: string;
  lastRun: string;
  nextRun: string;
}

const mockWorkflows: WorkFlow[] = Array.from({ length: 10 }, (_, i) => ({
  id: `WF${i + 1}`,
  name: `Workflow ${i + 1}`,
  description: `Description for Workflow ${i + 1}`,
  status: i % 2 === 0 ? 'Active' : 'Inactive',
  lastRun: '2024-01-01 12:00:00',
  nextRun: '2024-01-02 12:00:00'
}));

export function WorkFlowsPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [workflows] = useState<WorkFlow[]>(mockWorkflows);

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="workflows-panel">
      <div className="header">
        <div className="logo">
          <h1>Workflows</h1>
        </div>
        <div className="actions">
          <button className="action-button">IMPORT</button>
          <button className="action-button">EXPORT</button>
          <button className="action-button action-button--primary">+NEW WORKFLOW</button>
        </div>
      </div>

      <div className="search-bar">
        <MagnifyingGlassIcon className="search-icon" />
        <input
          type="text"
          placeholder="Search workflows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="workflows-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Last Run</th>
              <th>Next Run</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkflows.map((workflow) => (
              <tr key={workflow.id}>
                <td>{workflow.id}</td>
                <td>{workflow.name}</td>
                <td>{workflow.description}</td>
                <td>
                  <span className={`status-badge ${workflow.status.toLowerCase()}`}>
                    {workflow.status}
                  </span>
                </td>
                <td>{workflow.lastRun}</td>
                <td>{workflow.nextRun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}