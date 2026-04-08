import type { ApiDoctor, Education } from '#/dto/doctorDto'
import type { Doctor } from '#/entities/doctorEntity'
import type { AppLanguage } from '#/i18n'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'

const getEducations = (educations: Education[]): string[] => {
  return educations?.length > 0
    ? educations.map((education) =>
        Object.values({
          certification: education.certification,
          medicalSchool: education.medicalSchool,
          graduationYear: education.graduationYear,
        }).join(', '),
      )
    : []
}

export const mapApiDoctor = (
  api: ApiDoctor,
  language: AppLanguage = 'en',
): Doctor => ({
  doctorId: api.doctorId,
  avatarUrl: api.avatarUrl,
  name: api.name,
  specialties:
    api?.specialties?.length > 0
      ? api.specialties.map((specialty) => specialty.name)
      : [],
  countryName: getLocalizedTextByLang(
    api.country.nameVi,
    null,
    api.country.nameEn,
    language,
  ),
  experienceYears: api.experienceYears,
  consultationFee: api.consultationFee,
  bio: api.bio,
  educations: getEducations(api.educations),
  branches:
    api?.branches?.length > 0
      ? api.branches.map((branch) => ({
          id: branch.branchId,
          name: branch.name,
          address: branch.detailedAddress,
        }))
      : [],
})
