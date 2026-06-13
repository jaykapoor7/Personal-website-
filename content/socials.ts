import type { Social } from "./types";

// External presence. Links marked "available" are verified handles from the
// resume; anything not yet public stays "coming_soon" rather than guessed.
export const socials: Social[] = [
  {
    label: "Email",
    handle: "jak581@pitt.edu",
    url: "mailto:jak581@pitt.edu",
    type: "email",
    status: "available",
  },
  {
    label: "LinkedIn",
    handle: "in/jay-kapoor7",
    url: "https://www.linkedin.com/in/jay-kapoor7",
    type: "linkedin",
    status: "available",
  },
  {
    label: "X",
    handle: "@jaybuildsvx",
    url: "https://x.com/jaybuildsvx",
    type: "x",
    status: "available",
  },
];
