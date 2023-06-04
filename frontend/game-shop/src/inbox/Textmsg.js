import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import './TextMsg.css'
import MsgDetail from "./MsgDetail";


function MessageTable({ msgs, handleMsgClick, handleDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>נושא</th>
          <th>תוכן</th>
          <th>מייל</th>
          <th>סטטוס</th>
          <th>תאריך שליחה</th>
          <th>פעולות</th>
        </tr>
      </thead>
      <tbody>
        {msgs.map((msg) => (
          <tr key={msg.id}>
            <td onClick={() => handleMsgClick(msg)}>{msg.subject}</td>
            <td onClick={() => handleMsgClick(msg)}>{msg.body}</td>
            <td onClick={() => handleMsgClick(msg)}>{msg.email}</td>
            <td onClick={() => handleMsgClick(msg)}>{msg.status}</td>
            <td onClick={() => handleMsgClick(msg)}>{new Date(msg.sent_time).toLocaleString()}</td>
            <td>
              <button className="delete-button" onClick={() => handleDelete(msg.id)}>מחק</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Textmsg() {
  const [msgs, setMsgs] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [filter, setFilter] = useState("הכל"); 
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
    הושלם: (msgs) => msgs.filter((msg) => msg.status === "completed"),
    בתהליך: (msgs) => msgs.filter((msg) => msg.status === "in_progress"),
    הכל: (msgs) => msgs,
  };

  const handleMsgClick = (msg) => {
    setSelectedMsg(msg);
  };

  const handleCloseModal = () => {
    setSelectedMsg(null); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}inbox/${id}`);
      fetchMsgs(); 
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const markAsCompleted = async (msg) => {
    try {
      await axios.patch(`${url}inbox/${msg.id}`, { status: "completed" });
      setSelectedMsg({ ...selectedMsg, status: "completed" });
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
        handleDelete={handleDelete}
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