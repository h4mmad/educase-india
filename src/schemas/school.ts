import { z } from "zod";

export const addSchoolSchema = z.object({
    name:     z.string().min(1,   "name is required"),
    address:  z.string().min(1,   "address is required"),
    latitude: z.number().refine(v => v >= -90 && v <= 90,   "latitude must be between -90 and 90"),
    longitude:z.number().refine(v => v >= -180 && v <= 180, "longitude must be between -180 and 180"),
  });
  
  // This gives you a TS type you can reuse everywhere:
  export type AddSchoolPayload = z.infer<typeof addSchoolSchema>;