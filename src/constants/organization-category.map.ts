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
    title: "enterprise",
    name: "Enterprise",
    icon: IconBuildings
  },
  {
    title: "startup",
    name: "Startup",
    icon: IconBuildingCottage
  },
  {
    title: "free",
    name: "Free",
    icon: IconFreeRights
  },
  {
    title: "custom",
    name: "Custom",
    icon: IconAdjustments
  }
];

export default organizationCategoryMap;
