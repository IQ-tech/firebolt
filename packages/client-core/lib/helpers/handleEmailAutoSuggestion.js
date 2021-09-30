import levenshtein from "fast-levenshtein"
import autoSuggestedDomains from "../constants/email-suggested-domains"

export default function handleEmailAutoSuggestion({ value, domainValue }) {
  if (value && domainValue !== undefined && domainValue === "")
    return autoSuggestedDomains.reduce(
      (acc, domain) => acc.concat(`${value}@${domain}`),
      []
    )
  if (!domainValue || autoSuggestedDomains.includes(domainValue)) return []

  return autoSuggestedDomains.reduce((acc, domain) => {
    const distanceString = levenshtein.get(domain, domainValue)
    const isSimilar = distanceString <= 5 || domain.includes(domainValue)

    if (isSimilar || domainValue === "") return acc.concat(`${value}@${domain}`)

    return acc
  }, [])
}
