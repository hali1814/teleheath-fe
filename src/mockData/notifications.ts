const now = Date.now()

export const notificationsMock = [
  // Unread
  {
    id: 'n1',
    type: 'completed',
    title: 'Appointment Completed',
    description:
      'Your appointment on 20/03/2026 at Vinmec International Hospital is complete. Thank you for using Telehealth.',
    time: new Date(now - 60 * 1000),
    isRead: false,
  },
  {
    id: 'n2',
    type: 'completed',
    title: 'Online Consultation Completed',
    description:
      'Your online consultation with Dr. Nguyen Van A has ended. Thank you for using Telehealth.',
    time: new Date(now - 10 * 60 * 1000),
    isRead: false,
  },
  {
    id: 'n3',
    type: 'cancelled',
    title: 'Appointment Cancelled',
    description:
      'Your appointment scheduled on 22/03/2026 at Tam Anh Hospital has been successfully cancelled.',
    time: new Date(now - 45 * 60 * 1000),
    isRead: false,
  },
  {
    id: 'n4',
    type: 'appointment',
    title: 'Booking Request Received',
    description:
      'Your appointment request has been received. Our customer care team will contact you within 30 minutes to confirm your booking.',
    time: new Date(now - 60 * 60 * 1000),
    isRead: false,
  },
  // Read
  {
    id: 'n5',
    type: 'reminder',
    title: 'Online Consultation Starts Soon',
    description:
      'Your online consultation with Dr. Tran Thi B will start in 15 minutes. Tap here to join the session.',
    time: new Date(now - 15 * 60 * 60 * 1000),
    isRead: true,
  },
  {
    id: 'n6',
    type: 'reminder',
    title: 'Hospital Appointment Reminder',
    description:
      'You have an appointment at 115 People’s Hospital on 25/03/2026 at 10:00 AM. Please arrive 15 minutes early.',
    time: new Date(now - 24 * 60 * 60 * 1000),
    isRead: true,
  },
  {
    id: 'n7',
    type: 'completed',
    title: 'Prescription Ready',
    description:
      'Your prescription from your last visit is ready. You can view and download it in Medical Records.',
    time: new Date(now - 2 * 24 * 60 * 60 * 1000),
    isRead: true,
  },
  {
    id: 'n8',
    type: 'completed',
    title: 'Lab Results Available',
    description:
      'Your lab results from 18/03/2026 are now available. Tap to review the summary in your health profile.',
    time: new Date(now - 3 * 24 * 60 * 60 * 1000),
    isRead: true,
  },
]
