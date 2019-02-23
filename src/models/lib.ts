export interface DataColumnHeaders {
  'code': string,
  'name': string,
  'yesInPercent': string,
  'yesAbsolute': string,
  'noAbsolute': string,
  'participationInPercent': string
}

export interface Titles {
  [key: string]: string
}

export interface SpecialCasesMap {
  [key: number]: SpecialCase
}

interface SpecialCase {
  number: number,
  name: string
}
