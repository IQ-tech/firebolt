import STATE_FORMATS from "../constants/state-formats"

export default async function getAddress(cep, stateFormat) {
  const safeStateFormat = stateFormat || "br"
  const cleanCEP = cep.split("-").join("")
  const apiRoute = `https://viacep.com.br/ws/${cleanCEP}/json/`
  const data = await fetch(apiRoute).then((data) => data.json())
  const { logradouro, uf, bairro, localidade } = data
  const state = STATE_FORMATS?.[uf]?.[safeStateFormat]

  return { logradouro, uf: state, bairro, localidade }
}
