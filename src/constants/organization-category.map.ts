import {
  IconAdjustments,
  IconBuildingCottage,
  IconBuildings,
  IconFreeRights
} from "@tabler/icons-react";

/**
 * "custom" | "enterprise" | "startup" | "free"
 */
const organizationCategoryMap = [
  {
    slug: "enterprise",
    name: "Enterprise",
    icon: IconBuildings
  },
  {
    slug: "startup",
    name: "Startup",
    icon: IconBuildingCottage
  },
  {
    slug: "free",
    name: "Free",
    icon: IconFreeRights
  },
  {
    slug: "custom",
    name: "Custom",
    icon: IconAdjustments
  }
];

export default organizationCategoryMap;
