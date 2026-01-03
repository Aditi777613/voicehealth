import { useState } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { saveReminders, getReminders } from '../services/storageService';

function ReminderSetup({ medicines }) {
  const [reminders, setReminders] = useState(
    medicines.map(med => ({
      name: med.name,
      enabled: false,
      times: []
    }))
  );
  const [saved, setSaved] = useState(false);

  const toggleReminder = (index) => {
    const updated = [...reminders];
    updated[index].enabled = !updated[index].enabled;
    setReminders(updated);
  };

  const addTime = (index) => {
    const updated = [...reminders];
    updated[index].times.push('09:00');
    setReminders(updated);
  };

  const updateTime = (medIndex, timeIndex, value) => {
    const updated = [...reminders];
    updated[medIndex].times[timeIndex] = value;
    setReminders(updated);
  };

  const removeTime = (medIndex, timeIndex) => {
    const updated = [...reminders];
    updated[medIndex].times.splice(timeIndex, 1);
    setReminders(updated);
  };

  const handleSave = () => {
    const activeReminders = reminders.filter(r => r.enabled && r.times.length > 0);
    saveReminders(activeReminders);
    setSaved(true);
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">
              Set up medication reminders
            </h4>
            <p className="text-sm text-blue-700">
              We'll notify you when it's time to take your medicines. Make sure to enable notifications.
            </p>
          </div>
        </div>
      </div>

      {reminders.map((reminder, medIndex) => (
        <div key={medIndex} className="border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">{reminder.name}</h4>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={reminder.enabled}
                onChange={() => toggleReminder(medIndex)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {reminder.enabled && (
            <div className="space-y-2">
              {reminder.times.map((time, timeIndex) => (
                <div key={timeIndex} className="flex items-center gap-2">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => updateTime(medIndex, timeIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    onClick={() => removeTime(medIndex, timeIndex)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addTime(medIndex)}
                className="text-primary font-medium text-sm hover:underline"
              >
                + Add another time
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSave}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {saved ? (
          <>
            <Check className="w-5 h-5" />
            Reminders Saved!
          </>
        ) : (
          <>
            <Bell className="w-5 h-5" />
            Save Reminders
          </>
        )}
      </button>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-green-800 font-medium">
            ✓ Reminders saved successfully! You'll get notifications at the scheduled times.
          </p>
        </div>
      )}
    </div>
  );
}

export default ReminderSetup;