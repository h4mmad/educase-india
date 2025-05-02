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