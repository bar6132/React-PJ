import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import './TextMsg.css'
import MsgDetail from "./MsgDetail";

// function MsgDetail({ selectedMsg, onClose, onMarkAsCompleted }) {
//   console.log("selectedMsg:", selectedMsg);
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>
//           &times;
//         </span>
//         <h2>{selectedMsg.subject}</h2>
//         <p>{selectedMsg.body}</p>
//         {selectedMsg.status !== "completed" ? (
//           <button
//             onClick={() => {
//               onMarkAsCompleted(selectedMsg);
//               onClose();
//             }}
//           >
//             Mark as Completed
//           </button>
//         ) : null}
//       </div>
//     </div>
//   );
// }

function MessageTable({ msgs, handleMsgClick }) {
  return (
    <table>
      <thead>
        <tr>
          <th>נושא</th>
          <th>תוכן</th>
          <th>מייל</th>
          <th>סטטוס</th>
          <th>תאריך שליחה</th>
        </tr>
      </thead>
      <tbody>
        {msgs.map((msg) => (
          <tr key={msg.id} onClick={() => handleMsgClick(msg)}>
            <td>{msg.subject}</td>
            <td>{msg.body}</td>
            <td>{msg.email}</td>
            <td>{msg.status}</td>
            <td>{new Date(msg.sent_time).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Textmsg() {
  const [msgs, setMsgs] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null); // Set initial value as null
  const [filter, setFilter] = useState("all");
  const { url } = useContext(AppContext);

  const fetchMsgs = useCallback(async () => {
    try {
      const response = await axios.get(`${url}inbox/`);
      setMsgs(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [url]);

  useEffect(() => {
    fetchMsgs();
  }, [fetchMsgs]);

  const filterMap = {
    completed: (msgs) => msgs.filter((msg) => msg.status === "completed"),
    in_progress: (msgs) => msgs.filter((msg) => msg.status === "in_progress"),
    all: (msgs) => msgs,
  };

  const handleMsgClick = (msg) => {
    setSelectedMsg(msg);
  };

  const handleCloseModal = () => {
    setSelectedMsg(null); // Set selectedMsg as null
  };

  const markAsCompleted = async (msg) => {
    try {
      await axios.patch(`${url}inbox/${msg.id}`, { status: "completed" });

      // Update the status of the selected message
      setSelectedMsg({ ...selectedMsg, status: "completed" });

      // Update the status of the corresponding message in the msgs array
      const updatedMsgs = msgs.map((m) =>
        m.id === msg.id ? { ...m, status: "completed" } : m
      );
      setMsgs(updatedMsgs);
    } catch (error) {
      console.error("Error marking message as completed:", error);
    }
  };

  return (
    <div className="TT">
      <h1>הודעות</h1>
      <div className="TT">
        {Object.keys(filterMap).map((key) => (
          <button key={key} onClick={() => setFilter(key)}>
            {key}
          </button>
        ))}
      </div>
      <MessageTable
        msgs={filterMap[filter](msgs)}
        handleMsgClick={handleMsgClick}
      />

      {selectedMsg && (
        <MsgDetail
          onClose={handleCloseModal}
          onMarkAsCompleted={markAsCompleted}
          selectedMsg={selectedMsg}
        />
      )}
    </div>
  );
}

export default Textmsg;