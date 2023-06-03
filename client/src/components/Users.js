import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import { useLocation, useNavigate } from "react-router-dom";

import UsersTable from "./UsersTable";

export default function UserTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useState(location.state?.auth || false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!location.state) navigate("/signin");
    fetchUsers();
    return () => {
      setAuth(false);
    };
  }, [location.state, navigate]);

  const fetchUsers = () => {
    fetch("/api/user")
      .then((data) => data.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const checkboxHandler = (user) => {
    const isSelected = selected.some(
      (selectedUser) => selectedUser.id === user.id
    );
    if (!isSelected) {
      setSelected((selected) => [...selected, user]);
    } else {
      const selectedUsers = selected.filter((item) => item.id !== user.id);
      setSelected(selectedUsers);
    }
  };

  const selectAll = () => {
    setSelected(users.length === selected.length ? [] : users);
  };

  const userAction = (url, method) => {
    if (!selected.length) return;
    fetch(url, {
      method,
      body: JSON.stringify(selected),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => fetchUsers());
  };

  const deleteUser = () => {
    const selectedUsers = selected.filter(
      (item) => item.email === location.state.email
    );
    if (selectedUsers.length) {
      navigate("/signin");
    }
    userAction("/api/user/delete", "DELETE");
  };

  const blockUser = () => {
    const selectedUsers = selected.filter(
      (item) => item.email === location.state.email
    );
    if (selectedUsers.length) {
      navigate("/signin");
    }
    userAction("/api/user/block", "PUT");
  };

  const unblockUser = () => {
    userAction("/api/user/unblock", "PUT");
  };

  return (
    auth && (
      <div className="w-75  mx-auto pt-5">
        <Toolbar
          deleteUser={deleteUser}
          blockUser={blockUser}
          unblockUser={unblockUser}
        />
        <UsersTable
          users={users}
          selected={selected}
          selectAll={selectAll}
          checkboxHandler={checkboxHandler}
        />
      </div>
    )
  );
}
