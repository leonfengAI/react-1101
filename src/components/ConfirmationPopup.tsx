import { User } from './UserWindow';
import '../css/ConfirmationPopup.css';

interface ConfirmationPopupProps {
  data: User;
  isDelete: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationPopup({ data, isDelete, onConfirm, onCancel }: ConfirmationPopupProps) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="popup-title">
          {isDelete ? 'Confirm Delete' : 'Confirm Details'}
        </h2>
        <div className="popup-details">
          <div className="detail-row">
            <span className="detail-label">Username:</span>
            <span className="detail-value">{data.username}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Password:</span>
            <span className="detail-value">********</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Role:</span>
            <span className="detail-value">{data.role}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">EID:</span>
            <span className="detail-value">{data.eid}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{data.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{data.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Comment:</span>
            <span className="detail-value">{data.comment}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className="detail-value">
              {data.isactive === '1' ? 'Active' : 'Block'}
            </span>
          </div>
        </div>
        <div className="popup-buttons">
          <button onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className={isDelete ? 'delete-button' : 'confirm-button'}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}