import { z } from "zod";

// Using zod for runtime validation checks, 
// Every API request should contain the fields,
// if not an error of 400 bad request is generated.
// .strict() ensures no additional keys are sent.

export const addSchoolSchema = z.object({
    name:     z.string().min(1,   "name is required"),
    address:  z.string().min(1,   "address is required"),
    latitude: z.number().refine(v => v >= -90 && v <= 90,   "latitude must be between -90 and 90"),
    longitude:z.number().refine(v => v >= -180 && v <= 180, "longitude must be between -180 and 180"),
  })
  .strict();
  
export type AddSchoolPayload = z.infer<typeof addSchoolSchema>;
(req: Request, res: Response) => {
  

}
export const listSchoolsQuerySchema = z
  .object({
    latitude:  z.coerce
      .number({ invalid_type_error: 'latitude must be a number' })
      .min(-90,  'latitude must be ≥ -90')
      .max( 90,  'latitude must be ≤  90'),
    longitude: z.coerce
      .number({ invalid_type_error: 'longitude must be a number' })
      .min(-180, 'longitude must be ≥ -180')
      .max( 180, 'longitude must be ≤  180'),
  })
  .strict();

export type ListSchoolsQuery = z.infer<typeof listSchoolsQuerySchema>;

export interface SchoolWithDistance {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
}
