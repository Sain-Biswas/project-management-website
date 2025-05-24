import { z } from "zod/v4";

export const organizationInsetValidator = z.object({
  name: z
    .string()
    .min(1, { error: "Organization name is needed for creation." }),
  description: z
    .string()
    .min(1, { error: "Please provide a short organization description." }),
  category: z.enum(["custom", "enterprise", "startup", "free"], {
    error: "Category type is needed for pricing and limits."
  }),
  image: z.optional(z.nullable(z.string()))
});

export type TOrganizationInsetValidator = z.infer<
  typeof organizationInsetValidator
>;

export const organizationMemberAddingValidator = z.object({
  organizationId: z.uuidv4({ error: "Entered value is not a version 4 UUID" }),
  userEmail: z.email({
    error: "A valid email is needed for sending invitation"
  }),
  role: z.enum(["owner", "admin", "member", "removed"], {
    error: "Member can't be invited without a proper role."
  })
});

export type TOrganizationMemberAddingValidator = z.infer<
  typeof organizationMemberAddingValidator
>;
