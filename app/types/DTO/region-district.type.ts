export interface IRegion {
  id: string;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  soato?: string;
  mvd_profilactic_region_id?: number;
}
export interface IDistrict {
  id: string;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  soato?: string;
  mvd_profilactic_district_id?: number;
  region_id?: string;
}
