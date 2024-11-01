import { useState } from 'react';
import { MenuBar } from './MenuBar';
import { WorkFlowsPanel } from './WorkFlowsPanel';
import { ActionsPanel } from './ActionsPanel';
import { JobTemplatePanel } from './JobTemplatePanel';
import { ScriptsPanel } from './ScriptsPanel';
import { SecretsPanel } from './SecretsPanel';
import { ExportsPanel } from './ExportsPanel';
import { ConfigurationPanel } from './ConfigurationPanel';
import '../css/WorkFlowContent.css';

type MenuOption = 'WorkFlows' | 'Actions' | 'JobTemplate' | 'Scripts' | 'Secrets Manager' | 'Exports' | 'Configuration';

export function WorkFlowContent() {
  const [selectedMenu, setSelectedMenu] = useState<MenuOption>('WorkFlows');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'WorkFlows':
        return <WorkFlowsPanel />;
      case 'Actions':
        return <ActionsPanel />;
      case 'JobTemplate':
        return <JobTemplatePanel />;
      case 'Scripts':
        return <ScriptsPanel />;
      case 'Secrets Manager':
        return <SecretsPanel />;
      case 'Exports':
        return <ExportsPanel />;
      case 'Configuration':
        return <ConfigurationPanel />;
      default:
        return <WorkFlowsPanel />;
    }
  };

  return (
    <div className="workflow-content">
      <div className="menu-section">
        <MenuBar selectedMenu={selectedMenu} onMenuSelect={setSelectedMenu} />
      </div>
      <div className="content-section">
        {renderContent()}
      </div>
    </div>
  );
}