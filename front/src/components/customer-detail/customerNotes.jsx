import React from "react";
import { FaStickyNote } from "react-icons/fa";

const CustomerNotes = ({ customer }) => {
  if (!customer.CusRemarks) {
    return null;
  }

  return (
    <div className="info-section">
      <h2>Notes</h2>

      <div className="notes-card">
        <div className="note-icon">
          <FaStickyNote />
        </div>
        <div className="note-content">{customer.CusRemarks}</div>
      </div>
    </div>
  );
};

export default CustomerNotes;
