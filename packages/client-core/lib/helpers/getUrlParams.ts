import { IUrlParams } from "../types"

export default function getUrlParams(): IUrlParams {
  const query = location.search.substring(1)
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=")
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, " "))
            : ""
          return params
        }, {})
    : {}
}
