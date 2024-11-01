import { useThemeStore } from '../store/themeStore';
import { User } from './UserWindow';
import '../css/UserTable.css';

interface UserTableProps {
  searchUsername: string;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const mockUsers: User[] = Array.from({ length: 10 }, (_, i) => ({
  username: `user${i + 1}`,
  password: '********',
  role: i % 2 === 0 ? 'user' : 'admin',
  eid: `E${1000 + i}`,
  email: `user${i + 1}@example.com`,
  phone: `+1234567${i}890`,
  comment: `Test user ${i + 1}`,
  isactive: i % 3 === 0 ? '0' : '1'
}));

export function UserTable({ searchUsername, onEdit, onDelete }: UserTableProps) {
  const { isDark } = useThemeStore();

  const filteredUsers = searchUsername
    ? mockUsers.filter(user => user.username.includes(searchUsername))
    : mockUsers;

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>EID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>{user.eid}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.comment}</td>
              <td>{user.isactive === '1' ? 'Active' : 'Block'}</td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onEdit(user)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}