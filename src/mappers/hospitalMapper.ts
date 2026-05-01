import type { ApiHospital } from '#/dto/hospitalDto'
import type { Hospital } from '#/entities/hospitalEntity'
import { formatWorkingHours } from '#/utils/working-hours.util'
import i18n, { type AppLanguage } from '#/i18n'

export const mapApiHospital = (api: ApiHospital): Hospital => ({
  hospitalId: api.hospitalId,
  thumbnailUrl: api.thumbnailUrl,
  logoUrl: api.logoUrl,
  name: api.name,
  website: api.website,
  gallery: api.gallery,
  about: api.about,
  country: api.country.name,
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
          operatingHours: formatWorkingHours(
            branch.workingHours,
            i18n.language as AppLanguage,
          ),
          emergency24h: branch.emergency24h,
        }))
      : [],
})
