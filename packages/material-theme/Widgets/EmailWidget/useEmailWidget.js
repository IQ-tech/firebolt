import { useEffect, useState } from "react";
import { handleEmailAutoSuggestion } from "@iq-firebolt/client-core";

export default function useEmailField({
  formPayload,
  slug,
  modifyPayloadKeys,
}) {
  const [autoSuggestionOptions, setAutoSuggestionOptions] = useState([]);

  useEffect(autoSuggestDomains, [formPayload?.[slug]]);

  function autoSuggestDomains() {
    const email = formPayload?.[slug];
    if (!email) {
      setAutoSuggestionOptions([]);
    } else {
      const [idValue, domainValue] = email.split("@");

      const filteredOptions = handleEmailAutoSuggestion({
        value: idValue,
        domainValue,
      });

      setAutoSuggestionOptions(filteredOptions);
    }
  }

  function handleSelectSuggestion(value) {
    modifyPayloadKeys({ [slug]: value });
  }

  return { autoSuggestionOptions, handleSelectSuggestion };
}
