export interface Response {
  data: IVulnerability[],
  meta: Meta
}

export interface Meta {
  count: number,

  limit: number,

  offset: number,
}


export interface IVulnerability {
  attributes:VulnerabilityInfo,
  id:string,
  type:string,
}

export interface VulnerabilityInfo {
  vul_code: string,
  vul_name: string,
  vul_desc: string,
  vul_datv: string,
  vul_critu: string,
  vul_vmer: string,
  vul_expl: string,
  vul_infou: string,
  vul_link: string,
  vul_note: string,
  vul_datp: string,
  vul_insdate: string,
  vul_incident: string,
  vul_upddate: string,
  vul_state: string,
  vul_en: string,
}

