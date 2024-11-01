import { useState } from 'react';
import { useThemeStore } from '../store/themeStore';
import '../css/UserWindow.css';
import { UserForm } from './UserForm';
import { UserTable } from './UserTable';
import { ConfirmationPopup } from './ConfirmationPopup';

export interface User {
  username: string;
  password: string;
  role: string;
  eid: string;
  email: string;
  phone: string;
  comment: string;
  isactive: string;
}

export function UserWindow() {
  const { isDark } = useThemeStore();
  const [searchUsername, setSearchUsername] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<User | null>(null);
  const [isDelete, setIsDelete] = useState(false);

  const handleSearch = () => {
    setShowForm(false);
  };

  const handleAddUser = () => {
    setEditUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = (user: User) => {
    setConfirmationData(user);
    setIsDelete(true);
    setShowConfirmation(true);
  };

  const handleFormSubmit = (userData: User) => {
    setConfirmationData(userData);
    setIsDelete(false);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowForm(false);
    handleSearch();
  };

  return (
    <div className={`user-window ${isDark ? 'user-window--dark' : 'user-window--light'}`}>
      <div className="search-container">
        <div className="search-group">
          <input
            type="text"
            placeholder="Username"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            className={`search-input ${isDark ? 'search-input--dark' : 'search-input--light'}`}
          />
          <button
            onClick={handleSearch}
            className="search-button"
          >
            Search
          </button>
        </div>
        <div className="button-container">
          <button
            onClick={handleAddUser}
            className="add-user-button"
          >
            Add User
          </button>
        </div>
      </div>

      {showForm ? (
        <UserForm
          initialData={editUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <UserTable
          searchUsername={searchUsername}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}

      {showConfirmation && confirmationData && (
        <ConfirmationPopup
          data={confirmationData}
          isDelete={isDelete}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}
