import { TopMenuBar } from '../components/TopMenuBar';
import { ITSMWindow } from '../components/ITSMWindow';
import { AVATARS } from '../constants';
import '../css/ITSMManagementPage.css';

export function ITSMManagementPage() {
  const username = localStorage.getItem('username');

  return (
    <div className="itsm-management-page">
      <div className="top-section">
        <TopMenuBar userAvatar={AVATARS.user} username={username} />
      </div>
      <div className="bottom-section">
        <ITSMWindow />
      </div>
    </div>
  );
}