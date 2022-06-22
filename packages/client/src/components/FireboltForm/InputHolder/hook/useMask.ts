import { createTextMaskInputElement } from "text-mask-core"
import { useRef, useEffect, MutableRefObject } from "react"
import { parseMask } from "./helpers"

type RegexOrString = RegExp | string
type RegexGenerator = (...args: any[]) => RegexOrString[]

interface IUseMask {
  input: MutableRefObject<any>
  mask: RegexOrString[] | RegexGenerator | false
  value: string
  onChange(...args: any[]): void
}

export default function useMaskedInput({
  input,
  mask,
  onChange,
  value = "",
}: IUseMask) {
  const textMask = useRef<any>()

  function init() {
    if (!input.current) return

    textMask.current = createTextMaskInputElement({
      inputElement: input.current,
      mask: mask ? parseMask(mask) : mask,
    })

    textMask.current.update(value)
  }

  useEffect(init, [mask])

  return () => {
    if (textMask.current) {
      textMask.current.update()
    }

    if (typeof onChange === "function") {
      onChange(input.current.value)
    }
  }
}
