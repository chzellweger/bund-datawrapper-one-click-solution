export interface SourceData {
  "abstimmtag": string,
  "timestamp": string,
  kantone: Kanton[]
}

export interface Kanton {
  "geoLevenummer": number,
  "geoLevelname": string,
  nochKeineInformationen: boolean,
  vorlagen: Vorlage[]
}

export interface Vorlage {
  vorlagenId: number,
  vorlagenTitel: Array<VorlagenTitel>,
  vorlageBeendet: boolean,
  vorlageAngenommen: boolean,
  vorlagenArtId: number,
  hauptvorlagenId: number | null,
  resultat: Resultat,
  bezirke: Bezirk[],
  gemeinden: Gemeinde[]
}

export interface Bezirk {
  geoLevelnummer: string,
  geoLevelname: string,
  resultat: Resultat
}

export interface Gemeinde {
  geoLevelnummer: string,
  geoLevelname: string,
  geoLevelParentnummer: string,
  resultat: Resultat
}

export interface VorlagenTitel {
  langKey: string,
  text: string
}

export interface Resultat {
  gebietAusgezaehlt: boolean,
  jaStimmenInProzent: number,
  jaStimmenAbsolut: number,
  neinStimmenAbsolut:	number,
  stimmbeteiligungInProzent:	number,
  eingelegteStimmzettel:	number,
  anzahlStimmberechtigte:	number,
  gueltigeStimmen:	number
}
