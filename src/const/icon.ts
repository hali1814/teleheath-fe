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
} satisfies Record<string, IconComponent>

export default ICONS_TEMPLATE
