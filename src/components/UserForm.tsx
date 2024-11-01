import { useState } from 'react';
import { useThemeStore } from '../store/themeStore';
import { User } from './UserWindow';
import '../css/UserForm.css';

interface UserFormProps {
  initialData?: User | null;
  onSubmit: (data: User) => void;
  onCancel: () => void;
}

const defaultUser: User = {
  username: '',
  password: '',
  role: 'user',
  eid: '',
  email: '',
  phone: '',
  comment: '',
  isactive: '1'
};

export function UserForm({ initialData, onSubmit, onCancel }: UserFormProps) {
  const { isDark } = useThemeStore();
  const [formData, setFormData] = useState<User>(initialData || defaultUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Username and password are required');
      return;
    }
    onSubmit(formData);
  };

  const handleClear = () => {
    setFormData(defaultUser);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-grid">
        <div className="form-group">
          <label>Username *</label>
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label>EID</label>
          <input
            type="text"
            value={formData.eid}
            onChange={(e) => setFormData({ ...formData, eid: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Comment</label>
          <input
            type="text"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={formData.isactive}
            onChange={(e) => setFormData({ ...formData, isactive: e.target.value })}
          >
            <option value="1">Active</option>
            <option value="0">Block</option>
          </select>
        </div>
      </div>

      <div className="form-buttons">
        <button type="button" onClick={handleClear} className="clear-button">
          Clear
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
}