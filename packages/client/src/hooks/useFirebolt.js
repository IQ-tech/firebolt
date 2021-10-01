import { useContext } from "react"
import FireboltContext from "../context"

export function useFirebolt() {
  const contextData = useContext(FireboltContext)
  return contextData
}

export default useFirebolt
