export interface School{
 id: string;
 name: string;
 address: string;
 latitude: number;
 longitude: number;
}

export type AddSchoolPayload = Omit<School, 'id'>;
export interface ListSchoolsQuery {
 latitude: number;
 longitude: number;
}

export interface SchoolWithDistance extends School{
 distance: number
}
