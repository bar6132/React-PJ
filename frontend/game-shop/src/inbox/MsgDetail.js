import React from "react";
import "./MsgDetail.css";

function MsgDetail({ selectedMsg, onClose, onMarkAsCompleted }) {
  return (
    <div className="MsgDetailOverlay">
      <div className="MsgDetailModal">
        <h2>{selectedMsg.subject}</h2>
        <p>{selectedMsg.body}</p>
        <p>From: {selectedMsg.email}</p>
        <p>Sent at: {new Date(selectedMsg.sent_time).toLocaleString()}</p>
        <button onClick={onClose}>Close</button>
        {selectedMsg.status === "in_progress" && (
          <button onClick={() => onMarkAsCompleted(selectedMsg)}>
            Mark as completed
          </button>
        )}
      </div>
    </div>
  );
}

export default MsgDetail;