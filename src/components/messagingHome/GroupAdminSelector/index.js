import React, { useState } from 'react';

const GroupAdminSelector = ({ options, onSelectAdmin }) => {
  const [selectedAdmins, setSelectedAdmins] = useState([]);

  const handleToggleAdmin = (admin) => {
    const isSelected = selectedAdmins.some((selectedAdmin) => selectedAdmin.value === admin.value);

    if (isSelected) {
      // If already selected, remove from the list
      const updatedAdmins = selectedAdmins.filter((selectedAdmin) => selectedAdmin.value !== admin.value);
      setSelectedAdmins(updatedAdmins);
    } else {
      // If not selected, add to the list
      const updatedAdmins = [...selectedAdmins, admin];
      setSelectedAdmins(updatedAdmins);
    }
  };

  return (
    <div>
      <h3>Group Admins</h3>
      <ul>
        {options.map((admin) => (
          <li key={admin.value}>
            <label>
              <input
                type="checkbox"
                checked={selectedAdmins.some((selectedAdmin) => selectedAdmin.value === admin.value)}
                onChange={() => handleToggleAdmin(admin)}
              />
              {admin.label}
            </label>
          </li>
        ))}
      </ul>
      <div>
        Selected Admins:
        {selectedAdmins.map((admin) => (
          <span key={admin.value}>{admin.label}, </span>
        ))}
      </div>
      <button onClick={() => onSelectAdmin(selectedAdmins)}>Save</button>
    </div>
  );
};

export default GroupAdminSelector;
