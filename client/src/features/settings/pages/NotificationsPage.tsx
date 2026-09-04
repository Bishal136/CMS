import React, { useState } from 'react';
import { NotificationGroup } from '../components/account/NotificationGroup';
import { NotificationItem } from '../components/account/NotificationItem';

export const NotificationsPage: React.FC = () => {
  const [emailDigest, setEmailDigest] = useState(true);
  const [failedAlert, setFailedAlert] = useState(true);

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 mb-4">Notifications</h2>
      <NotificationGroup title="Email Notifications">
        <NotificationItem
          title="Weekly Summary Digest"
          desc="Get a summary of your weekly engagement every Monday."
          checked={emailDigest}
          onChange={setEmailDigest}
        />
        <NotificationItem
          title="Post Failure Alerts"
          desc="Receive immediate notification if a scheduled post fails."
          checked={failedAlert}
          onChange={setFailedAlert}
        />
      </NotificationGroup>
    </div>
  );
};
