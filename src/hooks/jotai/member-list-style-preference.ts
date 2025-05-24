import { atomWithStorage } from "jotai/utils";

const memberListStylePreferenceAtom = atomWithStorage<"grid" | "list">(
  "member_list_style_preference",
  "list"
);

export default memberListStylePreferenceAtom;
