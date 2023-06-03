import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock, faTrash } from "@fortawesome/free-solid-svg-icons";
export default function Toolbar({ deleteUser, blockUser, unblockUser }) {
  return (
    <div className="toolbar btn-group my-2" role="group">
      <FontAwesomeIcon
        icon={faLock}
        size="lg"
        className="btn btn-dark"
        onClick={blockUser}
      />
      <FontAwesomeIcon
        icon={faUnlock}
        size="lg"
        className="btn btn-success"
        onClick={unblockUser}
      />
      <FontAwesomeIcon
        icon={faTrash}
        size="lg"
        className="btn btn-danger"
        onClick={deleteUser}
      />
    </div>
  );
}
