import React from "react";

export default function TableRow({ user, selected, checkboxHandler }) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selected.some((selectedUser) => selectedUser.id === user.id)}
          onChange={() => checkboxHandler(user)}
        />
      </td>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{new Date(user.signup_date).toLocaleString()}</td>
      <td>{new Date(user.signin_date).toLocaleString()}</td>
      <td>{user.status}</td>
    </tr>
  );
}
