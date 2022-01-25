export default async function getCities(stateUfNumber) {
  const route = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateUfNumber}/municipios`
  const res = (await fetch(route).then((data) => data.json())) || []
  return res
}
