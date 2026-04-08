import type { ApiPackage } from '#/dto/packageDto'
import type { Package } from '#/entities/packageEntity'
import type { AppLanguage } from '#/i18n'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'

export const mapApiPackage = (
  api: ApiPackage,
  language: AppLanguage = 'en',
): Package => ({
  packageId: api.id,
  name: api.name,
  description: api.description,
  imageUrl: api.imageUrl,
  price: api.price,
  hospitalName: api.hospital.name,
  countryName:
    api?.countries?.length > 0
      ? getLocalizedTextByLang(
          api.countries[0].nameVi,
          null,
          api.countries[0].nameEn,
          language,
        )
      : '',
  branches:
    api?.hospital?.branches?.length > 0
      ? api.hospital.branches.map((branch) => ({
          id: branch.branchId,
          name: branch.name,
          address: branch.detailedAddress,
        }))
      : [],
  checkupTypes:
    api?.checkupTypes?.length > 0
      ? api.checkupTypes.map((checkupType) =>
          getLocalizedTextByLang(
            checkupType.nameVi,
            null,
            checkupType.nameEn,
            language,
          ),
        )
      : [],
})
