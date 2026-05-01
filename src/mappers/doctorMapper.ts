import type { ApiDoctor, Education } from '#/dto/doctorDto'
import type { Doctor } from '#/entities/doctorEntity'

const getEducations = (educations: Education[]): string[] => {
  return educations?.length > 0
    ? educations?.map((education) =>
        Object.values({
          certification: education.certification,
          medicalSchool: education.medicalSchool,
          graduationYear: education.graduationYear,
        }).join(', '),
      )
    : []
}

export const mapApiDoctor = (api: ApiDoctor): Doctor => ({
  doctorId: api.doctorId,
  avatarUrl: api.avatarUrl,
  name: api.name,
  specialties:
    api?.specialties?.length > 0
      ? api?.specialties?.map((specialty) => specialty.name)
      : [],
  countryName: api?.country ? api.country.name : '',
  experienceYears: api.experienceYears,
  consultationFee: api.consultationFee,
  bio: api.bio,
  educations: getEducations(api.educations),
  branches:
    api?.branches?.length > 0
      ? api?.branches?.map((branch) => ({
          id: branch.branchId,
          name: branch.name,
          address: branch.detailedAddress,
        }))
      : [],
})
