export async function fetchEmail() {
  const { Email: email = '' } = await fetch(
    '/no-cache/profileSystem/getProfile'
  ).then(res => res.json())
  return email
}

export function getSiteType() {
  return /iPad/.test(navigator.userAgent)
    ? 't'
    : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile/.test(navigator.userAgent)
    ? 'm'
    : 'd'
}
