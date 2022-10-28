export type CustomerModel = {
  id: string
  name: string
  email: string
  address?: CustomerModelAddress
}

export type CustomerModelAddress = {
  city: string
  country: string
  line1: string
  line2?: string
  postal_code: string
  state: string
}
