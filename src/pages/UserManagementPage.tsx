import { TopMenuBar } from '../components/TopMenuBar';
import { UserWindow } from '../components/UserWindow';
import { AVATARS } from '../constants';
import '../css/UserManagementPage.css';

export function UserManagementPage() {
  const username = localStorage.getItem('username');

  return (
    <div className="user-management-page">
      <div className="top-section">
        <TopMenuBar userAvatar={AVATARS.user} username={username} />
      </div>
      <div className="bottom-section">
        <UserWindow />
      </div>
    </div>
  );
}