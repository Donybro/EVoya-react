export interface IParentType {
  id: number;
  text: string;
}
export interface IParent {
  last_name: string;
  first_name: string;
  father_name: string;
  pinfl: string;
  employment: string;
  parent_type: {
    label: string;
    value: number;
  };
  birth_date: Date;
}

export interface IListResponse<T> {
  data: T;
}
