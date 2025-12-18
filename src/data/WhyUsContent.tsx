import {FileLock, HeartHandshake, ShieldCheck } from "lucide-react";
import type { whyUsPoints } from "../types/WhyUs";

export const WhyUsContent: whyUsPoints[] = [
  {
    icon: ShieldCheck,
    title: "Genuine Verified Owners",
    description:
      "We verify owners so that you don't get scammed. Official IDs are checked and you know exactly who you are renting from.",
  },
  {
    icon: HeartHandshake,
    title: "No Broker Involved",
    description:
      "You are not paying anything extra for all those middlemen. We connect you directly with the owner.",
  },
  {
    icon: FileLock,
    title: "Rental Agreement",
    description:
      "We help you with all the required paperwork so that you can focus on moving into your new place.",
  },
];
