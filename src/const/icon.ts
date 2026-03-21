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
import PlumpWebIcon from '#/assets/icons/common/plump-web.svg?react'
import CallOutlineIcon from '#/assets/icons/common/call-outline.svg?react'
import MailIcon from '#/assets/icons/common/mail.svg?react'
import MapMarkerOutlineIcon from '#/assets/icons/common/map-marker-outline.svg?react'
import MapOutlineIcon from '#/assets/icons/common/map-outline.svg?react'
import ClockOutlineIcon from '#/assets/icons/common/clock-outline.svg?react'
import ArrowDownIcon from '#/assets/icons/common/arrow-down.svg?react'
import ArrowUpIcon from '#/assets/icons/common/arrow-up.svg?react'
import FilterIcon from '#/assets/icons/common/filter.svg?react'
import EyeOutlineIcon from '#/assets/icons/common/eye-outline.svg?react'
import HospitalIcon from '#/assets/icons/common/hospital.svg?react'
import CloseIcon from '#/assets/icons/common/close.svg?react'
import WorkHistoryOutlineIcon from '#/assets/icons/common/work-history-outline.svg?react'
import MoneyIcon from '#/assets/icons/common/money.svg?react'
import GraduateCapIcon from '#/assets/icons/common/graduate-cap.svg?react'
import SealCheckIcon from '#/assets/icons/common/seal-check.svg?react'
import LicenseIcon from '#/assets/icons/common/license.svg?react'
import ArrowRightIcon from '#/assets/icons/common/arrow_right.svg?react'
import type { SVGProps, FC } from 'react'
//upload_camera
import UploadCameraIcon from '#/assets/icons/profile/upload-camera.svg?react'
//calender
import CalendarProfileIcon from '#/assets/icons/profile/calendar.svg?react'
//common - dropdown
import DropdownIcon from '#/assets/icons/common/dropdown.svg?react'
//profile-search
import ProfileSearchIcon from '#/assets/icons/profile/search.svg?react'
// family
import FamilyIcon from '#/assets/icons/profile/family.svg?react'
//express
import ExpressIcon from '#/assets/icons/profile/express.svg?react'
//medical-profile-search
import MedicalProfileSearchIcon from '#/assets/icons/profile/medical-profile-search.svg?react'
//add-profile
import AddProfileIcon from '#/assets/icons/profile/add-profile.svg?react'
import ChatAiIcon from '#/assets/icons/common/chat-ai.svg?react'
import CheckCircleOutlineIcon from '#/assets/icons/common/check-circle-outline.svg?react'
import MedicalWebServiceSolidIcon from '#/assets/icons/common/medical-web-service-solid.svg?react'
import UserDoctorSolidIcon from '#/assets/icons/common/user-doctor-solid.svg?react'
import HistoryFillIcon from '#/assets/icons/common/history-fill.svg?react'
import Arrow45DegIcon from '#/assets/icons/common/arrow-45deg.svg?react'
import EmptySearchIcon from '#/assets/icons/common/empty-search-icon.svg?react'
import AddRecordIcon from '#/assets/icons/appointment/add-record.svg?react'
import LocationBlueIcon from '#/assets/icons/appointment/location-blue.svg?react'
import MapBlueIcon from '#/assets/icons/appointment/map-blue.svg?react'
import RecordIcon from '#/assets/icons/appointment/record.svg?react'

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
  plump_web: PlumpWebIcon,
  call_outline: CallOutlineIcon,
  mail: MailIcon,
  map_marker_outline: MapMarkerOutlineIcon,
  map_outline: MapOutlineIcon,
  clock_outline: ClockOutlineIcon,
  arrow_down: ArrowDownIcon,
  arrow_up: ArrowUpIcon,
  filter: FilterIcon,
  eye_outline: EyeOutlineIcon,
  hospital: HospitalIcon,
  close: CloseIcon,
  work_history_outline: WorkHistoryOutlineIcon,
  money: MoneyIcon,
  graduate_cap: GraduateCapIcon,
  seal_check: SealCheckIcon,
  license: LicenseIcon,
  arrow_right: ArrowRightIcon,
  upload_camera: UploadCameraIcon,
  calendar_profile: CalendarProfileIcon,
  dropdown: DropdownIcon,
  profile_search: ProfileSearchIcon,
  family: FamilyIcon,
  express: ExpressIcon,
  medical_profile_search: MedicalProfileSearchIcon,
  add_profile: AddProfileIcon,
  chat_ai: ChatAiIcon,
  check_circle_outline: CheckCircleOutlineIcon,
  medical_web_service_solid: MedicalWebServiceSolidIcon,
  user_doctor_solid: UserDoctorSolidIcon,
  history_fill: HistoryFillIcon,
  arrow_45deg: Arrow45DegIcon,
  empty_search: EmptySearchIcon,
  add_record: AddRecordIcon,
  location_blue: LocationBlueIcon,
  map_blue: MapBlueIcon,
  record: RecordIcon,
} satisfies Record<string, IconComponent>

export default ICONS_TEMPLATE
