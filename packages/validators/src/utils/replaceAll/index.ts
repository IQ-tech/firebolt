export default function replaceAll(baseString: string, s1: string, s2: string) {
  let s = baseString
  while (s.indexOf(s1) > -1) {
    s = s.replace(s1, s2)
  }
  return s
}
