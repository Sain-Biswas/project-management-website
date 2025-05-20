import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * An tailwind css utility that merges classnames together and resolve conflicting classes.
 *
 * @param {ClassValue[]} inputs Array of string that contain classes to be applied. Higher index means higher preference.
 * @returns {string} Final className to be applied.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
