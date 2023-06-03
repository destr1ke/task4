import React from "react";
import TableRow from "./TableRow";
export default function UsersTable({
  users,
  selected,
  selectAll,
  checkboxHandler,
}) {
  return (
    <table className="table ">
      <thead>
        <tr className="table-primary ">
          <th scope="col">
            <input type="checkbox" onClick={selectAll} />
          </th>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Registration time</th>
          <th scope="col">Last Login</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {users.length ? (
          users.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              selected={selected}
              checkboxHandler={checkboxHandler}
            />
          ))
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
}
