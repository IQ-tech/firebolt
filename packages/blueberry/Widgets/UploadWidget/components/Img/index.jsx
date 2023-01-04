import React, { useEffect, useState } from 'react'

import isClient from 'utils/isClient'

const Img = ({ src, ...props }) => {
  const [rootPath, setRootPath] = useState('/')
  const [shouldRenderImg, SetShouldRenderImg] = useState(false)

  useEffect(() => {
    SetShouldRenderImg(true)
    const isLocal = isClient() && window.location.hostname === 'localhost'
    if (!isLocal) {
      setRootPath('/produto/')
    }
  }, [])

  return shouldRenderImg ? <img style={{pointerEvents: "none"}} src={`${rootPath}${src}`} {...props} /> : null
}

export default Img
