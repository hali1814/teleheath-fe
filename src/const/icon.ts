import HomeTestIcon from '#/assets/icons/home/test.svg?react'
import CallDoctorIcon from '#/assets/icons/common/call-doctor.svg?react'
import MedicalServicesIcon from '#/assets/icons/common/medical_services.svg?react'
import MapMarkerIcon from '#/assets/icons/common/map-marker.svg?react'
import LogoPremiumServiceIcon from '#/assets/icons/common/logo-premium-service.svg?react'
import CheckIcon from '#/assets/icons/common/check.svg?react'
import SearchIcon from '#/assets/icons/common/search-icon.svg?react'
import BookAppointmentIcon from '#/assets/icons/common/book-appointment.svg?react'
import HomeIcon from '#/assets/icons/bottom-navigation/home.svg?react'
import AppointmentIcon from '#/assets/icons/bottom-navigation/appointment.svg?react'
import HistoryIcon from '#/assets/icons/bottom-navigation/history.svg?react'
import ProfileIcon from '#/assets/icons/bottom-navigation/profile.svg?react'
import BookIcon from '#/assets/icons/bottom-navigation/book.svg?react'
import NotificationIcon from '#/assets/icons/common/notification.svg?react'
import ArrowLeftIcon from '#/assets/icons/common/arrow-left.svg?react'
import CircleHomeIcon from '#/assets/icons/common/circle-home.svg?react'
import CalendarIcon from '#/assets/icons/premium-service/calendar.svg?react'
import CarCheck from '#/assets/icons/premium-service/car-check.svg?react'
import SupporterIcon from '#/assets/icons/premium-service/supporter.svg?react'
import CameraIcon from '#/assets/icons/profile/camera.svg?react'
import LanguageIcon from '#/assets/icons/profile/language.svg?react'
import PencilIcon from '#/assets/icons/profile/pencil.svg?react'
import ClipboardIcon from '#/assets/icons/profile/clipboard.svg?react'
import type { SVGProps, FC } from 'react'

type IconComponent = FC<SVGProps<SVGSVGElement>>

const ICONS_TEMPLATE = {
  home_test: HomeTestIcon,
  call_doctor: CallDoctorIcon,
  medical_services: MedicalServicesIcon,
  map_marker: MapMarkerIcon,
  logo_premium_service: LogoPremiumServiceIcon,
  check: CheckIcon,
  search_icon: SearchIcon,
  book_appointment: BookAppointmentIcon,
  home: HomeIcon,
  appointment: AppointmentIcon,
  history: HistoryIcon,
  profile: ProfileIcon,
  book: BookIcon,
  notification: NotificationIcon,
  arrow_left: ArrowLeftIcon,
  circle_home: CircleHomeIcon,
  calendar: CalendarIcon,
  car_check: CarCheck,
  supporter: SupporterIcon,
  camera: CameraIcon,
  language: LanguageIcon,
  pencil: PencilIcon,
  clipboard: ClipboardIcon,
} satisfies Record<string, IconComponent>

export default ICONS_TEMPLATE
