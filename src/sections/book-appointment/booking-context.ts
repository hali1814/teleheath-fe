/**
 * Context từ URL — một trong ba luồng book-appointment.
 * Truyền vào BookingPage thay vì nhiều prop optional.
 */
export type BookingRouteContext =
  | { flow: 'HOSPITAL'; hospitalId: string }
  | { flow: 'DOCTOR'; doctorId: string }
  | { flow: 'PACKAGE'; packageId: string }
