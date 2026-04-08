import type { ApiHospital } from '#/dto/hospitalDto'
import type { Hospital } from '#/entities/hospitalEntity'
import type { AppLanguage } from '#/i18n'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { formatWorkingHours } from '#/utils/working-hours.util'

export const mapApiHospital = (
  api: ApiHospital,
  language: AppLanguage = 'en',
): Hospital => ({
  hospitalId: api.hospitalId,
  thumbnailUrl: api.thumbnailUrl,
  logoUrl: api.logoUrl,
  name: api.name,
  website: api.website,
  gallery: api.gallery,
  about: api.about,
  country: getLocalizedTextByLang(
    api.country.nameVi,
    null,
    api.country.nameEn,
    language,
  ),
  address: api.detailedAddress,
  specialties: api.specialties,
  emergency24h: api.emergency24h,
  branches:
    api?.branches?.length > 0
      ? api.branches.map((branch) => ({
          id: branch.branchId,
          name: branch.name,
          phone: branch.contactNumber1,
          email: branch.workEmail,
          address: branch.detailedAddress,
          googleMaps: branch.googleMapsEmbed,
          operatingHours: formatWorkingHours(branch.workingHours, language),
        }))
      : [],
})
