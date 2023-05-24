import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logout from "./components/Logout";

function MyNavbar() {
  const token = localStorage.getItem("token");
  const SuperUser = JSON.parse(localStorage.getItem("isSuperUser"));
  const isSuperUser = SuperUser ?? false;
  
  return (
    <Navbar bg="dark" variant="dark" className="MyNav">
      <NavLink to="/" activeclassname="active">
        ארקייד{" "}
      </NavLink>

      <NavLink to="/GameList" activeclassname="active">
        משחקים
      </NavLink>

      <NavLink to="/About" activeclassname="active">
        אודות
      </NavLink>

      <NavLink to="/ContactUs" activeclassname="active">
        צור קשר
      </NavLink>

      {token ? (
        <NavDropdown
          title={localStorage.getItem("username")}
          menuVariant="dark"
          style={{ direction: "ltr", marginRight: "auto" }}
        >
          <NavDropdown.Item style={{ direction: "rtl", textAlign: "center" }}>
            <NavLink to="/profile">פרופיל </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item style={{ direction: "rtl", textAlign: "center" }}>
            <NavLink to="/mygames"> המשחקים שלי</NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item style={{ direction: "rtl", textAlign: "center" }}>
            <NavLink to="/AddGameMenu"> הוסף משחק</NavLink>
          </NavDropdown.Item>

          {isSuperUser ? (
            <div>
              <NavDropdown.Item
                style={{ direction: "rtl", textAlign: "center" }}
              >
                <NavLink to="/UserList"> משתמשים</NavLink>
              </NavDropdown.Item>
            
              <NavDropdown.Item
                style={{ direction: "rtl", textAlign: "center" }}
              >
                <NavLink to="/Inbox"> תיבת פניות</NavLink>
              </NavDropdown.Item>
            </div>
          ) : (
            ""
          )}

          <NavDropdown.Item style={{ direction: "rtl", textAlign: "center" }}>
            <Logout />
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <>
          <NavLink to="/Signup" className="Log">
            הירשם
          </NavLink>
          <NavLink to="/Login">התחבר</NavLink>
        </>
      )}
    </Navbar>
  );
}

export default MyNavbar;
