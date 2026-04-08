import type { ApiSpecialty } from '#/dto/specialtyDto'
import type { Specialty } from '#/entities/specialtyEntity'

export const mapApiSpecialty = (api: ApiSpecialty): Specialty => ({
  specialtyId: api.id,
  name: api.name,
  iconUrl: api.iconUrl,
})
