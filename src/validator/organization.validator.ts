import { organizationMemberSchema } from "@/server/database/schema/organization-member.schema";
import { organizationSchema } from "@/server/database/schema/organization.schema";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod/v4";

export const organizationInsetValidator = createInsertSchema(
  organizationSchema
).omit({ id: true, createdAt: true, updatedAt: true });

export type TOrganizationInsetValidator = z.infer<
  typeof organizationInsetValidator
>;

export const organizationMemberAddingValidator = createInsertSchema(
  organizationMemberSchema
).omit({ id: true, updatedOn: true, joinedOn: true });

export type TOrganizationMemberAddingValidator = z.infer<
  typeof organizationMemberAddingValidator
>;
