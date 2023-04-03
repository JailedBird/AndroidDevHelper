export function isEmptyString(str: string | undefined | null): boolean {
  return str == undefined || str.length === 0
}
