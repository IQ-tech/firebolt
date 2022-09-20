import faker from "faker"
faker.setLocale("pt_BR")

import { IStepForm } from "@iq-firebolt/entities"

type IMockStepSlugs = "personalData" | "address" | "documents"
interface IPayloadOptions {
  validValues?: boolean
  stepSlug: IMockStepSlugs
}

export const payloadFactory = ({
  validValues = true,
  stepSlug,
}: IPayloadOptions): IStepForm => {
  switch (stepSlug) {
    case "personalData":
      return personalDataStep(validValues)
    case "documents":
      return documentsStep(validValues)
    case "address":
      return addressStep(validValues)
  }
}

const personalDataStep = (validValues: boolean): IStepForm => {
  const name = validValues
    ? `${faker.name.findName()} ${faker.name.lastName()}`
    : "invalidName"
  const email = validValues ? faker.internet.email() : "@email.com"
  return {
    "fields": {
      "full_name": name,
      "email": email,
    },
  }
}

const documentsStep = (validValue: boolean): IStepForm => {
  const document = validValue ? "asdf123456" : ".-"
  return {
    "fields": {
      "brazil_id_number": document,
    },
  }
}

const addressStep = (validValues: boolean): IStepForm => {
  const fields = validValues
    ? {
        "zipcode": "04551-902",
        "street_address": "Rua Fidêncio Ramos",
        "street_number": "308",
        "additional_info": "Torre A - 5º Andar",
        "neighborhood": "Vila Olímpia",
        "city": "São Paulo",
        "state": "SP",
      }
    : {
        "zipcode": "13224-a30",
        "street_address": "Rua",
        "street_number": "308",
        "additional_info": "",
        "neighborhood": "bairro das batatas",
        "city": "5-s",
        "state": "SP",
      }
  return { fields }
}
