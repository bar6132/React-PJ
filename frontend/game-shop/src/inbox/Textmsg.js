import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import "./TextMsg.css";

function Modal({ message, onClose, onMarkAsCompleted }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{message.subject}</h2>
        <p>{message.body}</p>
        {message.status !== "completed" ? (
          <button
            onClick={() => {
              onMarkAsCompleted(message);
              onClose();
            }}
          >
            Mark as Completed
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Textmsg() {
  const [msgs, setMsgs] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [filter, setFilter] = useState("all");

  const { url } = useContext(AppContext);

  useEffect(() => {
    fetchMsgs();
  }, []);

  const fetchMsgs = async () => {
    try {
      const response = await axios.get(`${url}inbox/`);
      setMsgs(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const filterMsgs = (msgs, filter) => {
    switch (filter) {
      case "completed":
        return msgs.filter((msg) => msg.status === "completed");
      case "in_progress":
        return msgs.filter((msg) => msg.status === "in_progress");
      default:
        return msgs;
    }
  };

  const handleMsgClick = (msg) => {
    setSelectedMsg(msg);
    console.log(msg);
  };

  const handleCloseModal = () => {
    setSelectedMsg(null);
  };

  const markAsCompleted = async (msg) => {
    try {
      
      await axios.patch(`${url}inbox/${msg.id}`, { status: "completed" });

      
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
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("in_progress")}>In Progress</button>
      </div>
      
      
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
          {filterMsgs(msgs, filter).map((msg) => (
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

      {selectedMsg && (
        <Modal
          message={selectedMsg}
          onClose={handleCloseModal}
          onMarkAsCompleted={markAsCompleted}
          selectedMsg={selectedMsg}
        />
      )}
    </div>
  );
}

export default Textmsg;