import React, { useState } from 'react';

function NotificationBell() {
  // Step 1: Create state to manage the notification count and panel visibility
  const [notificationCount, setNotificationCount] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Step 3: Create a function to handle the notification bell icon click
  const handleBellClick = () => {
    // Step 4: Toggle the notification panel
    setIsPanelOpen(!isPanelOpen);

    // Step 5: Reset the notification count when the panel is opened
    if (isPanelOpen) {
      setNotificationCount(0);
    }
  };

  return (
    <div className="notification-bell">
      {/* Step 2: Display the notification bell icon */}
      <span className="bell-icon" onClick={handleBellClick}>
        🔔
      </span>

      {/* Step 6: Display the notification count */}
      {notificationCount > 0 && (
        <span className="notification-count">{notificationCount}</span>
      )}

      {/* Step 7: Display the notification panel when it's open */}
      {isPanelOpen && (
        <div className="notification-panel">
          {/* Add your notification items here */}
          <p>You have new notifications!</p>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
