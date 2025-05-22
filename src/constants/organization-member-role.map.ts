import {
  IconCircleMinus,
  IconShieldFilled,
  IconTower,
  IconUserFilled
} from "@tabler/icons-react";

const organizationMemberRoleMap = [
  {
    slug: "owner",
    name: "Owner",
    icon: IconTower
  },
  {
    slug: "admin",
    name: "Admin",
    icon: IconShieldFilled
  },
  {
    slug: "member",
    name: "Member",
    icon: IconUserFilled
  },
  {
    slug: "removed",
    name: "Removed",
    icon: IconCircleMinus
  }
];

export default organizationMemberRoleMap;

/**
 * "owner", "admin", "member", "removed"
 */
