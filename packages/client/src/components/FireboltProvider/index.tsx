import FireboltContext from "../../context"
import useFireboltProvider from "./hook"

import { IFireboltProvider } from "../../types"

const FireboltProvider = (props: IFireboltProvider) => {
  const values = useFireboltProvider(props)

  return <FireboltContext.Provider value={values} {...props} />
}

export default FireboltProvider
