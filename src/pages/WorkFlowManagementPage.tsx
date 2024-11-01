import { TopMenuBar } from '../components/TopMenuBar';
import { WorkFlowContent } from '../components/WorkFlowContent';
import { AVATARS } from '../constants';
import '../css/WorkFlowManagementPage.css';

export function WorkFlowManagementPage() {
  const username = localStorage.getItem('username');

  return (
    <div className="workflow-management-page">
      <div className="top-section">
        <TopMenuBar userAvatar={AVATARS.user} username={username} />
      </div>
      <div className="bottom-section">
        <WorkFlowContent />
      </div>
    </div>
  );
}