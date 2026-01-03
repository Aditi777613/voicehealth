const STORAGE_KEYS = {
  PRESCRIPTIONS: 'voicehealth_prescriptions',
  REMINDERS: 'voicehealth_reminders',
  SETTINGS: 'voicehealth_settings'
};

export function savePrescription(prescription) {
  try {
    const prescriptions = getPrescriptions();
    prescriptions.push({
      ...prescription,
      id: Date.now(),
      date: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(prescriptions));
    return true;
  } catch (error) {
    console.error('Error saving prescription:', error);
    return false;
  }
}

export function getPrescriptions() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting prescriptions:', error);
    return [];
  }
}

export function saveReminders(reminders) {
  try {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
    scheduleNotifications(reminders);
    return true;
  } catch (error) {
    console.error('Error saving reminders:', error);
    return false;
  }
}

export function getReminders() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting reminders:', error);
    return [];
  }
}

function scheduleNotifications(reminders) {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return;
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
    return;
  }

  // Clear existing scheduled notifications (in a real app, use a service worker)
  reminders.forEach(reminder => {
    reminder.times.forEach(time => {
      const [hours, minutes] = time.split(':');
      const now = new Date();
      const scheduledTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(hours),
        parseInt(minutes),
        0
      );

      // If time has passed today, schedule for tomorrow
      if (scheduledTime < now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      const timeUntilNotification = scheduledTime.getTime() - now.getTime();

      setTimeout(() => {
        new Notification('VoiceHealth Reminder', {
          body: `Time to take ${reminder.name}`,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: `reminder-${reminder.name}-${time}`
        });
      }, timeUntilNotification);
    });
  });
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
}

export function getSettings() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : { language: 'en', voiceEnabled: true };
  } catch (error) {
    console.error('Error getting settings:', error);
    return { language: 'en', voiceEnabled: true };
  }
}