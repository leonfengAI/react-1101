import '../css/ExportConfirmation.css';

interface ExportConfirmationProps {
  onClose: () => void;
}

export function ExportConfirmation({ onClose }: ExportConfirmationProps) {
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="export-popup">
        <p className="export-message">CSV file has been downloaded successfully!</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
}