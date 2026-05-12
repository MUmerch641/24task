import {
  Sprout,
  PaintRoller,
  Sparkles,
  Truck,
  Wrench,
  Scissors,
  LayoutGrid,
  Droplet,
  Package,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  short: string;
  long: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "gardening",
    name: "Gardening",
    short: "Lawns mowed, hedges trimmed, gardens tidied.",
    long: "Lawn mowing, hedge trimming, weeding, planting and seasonal clear-ups. Regular visits or one-off blitz.",
    icon: Sprout,
  },
  {
    slug: "painting",
    name: "Painting",
    short: "Interior and exterior painting, neat and tidy.",
    long: "Walls, ceilings, woodwork, doors and exterior facades. Quality paints, dust sheets down, no mess left behind.",
    icon: PaintRoller,
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    short: "Deep cleans, end-of-tenancy, regular visits.",
    long: "Domestic, end-of-tenancy and after-builders cleans. Kitchens, bathrooms, ovens and carpets included on request.",
    icon: Sparkles,
  },
  {
    slug: "house-removals",
    name: "House Removals",
    short: "Full house moves, carefully and on time.",
    long: "Whole-home moves with packing, loading, transport and unloading. Furniture wrapped and protected.",
    icon: Truck,
  },
  {
    slug: "handyman-jobs",
    name: "Handyman Jobs",
    short: "Odd jobs, repairs and small fixes around the home.",
    long: "Flat-pack assembly, shelving, picture hanging, door repairs, leaky taps, sealants — anything on your snag list.",
    icon: Wrench,
  },
  {
    slug: "carpet-removal",
    name: "Carpet Removal",
    short: "Old carpets pulled up and taken away.",
    long: "Lift and dispose of old carpets, underlay, gripper rods and staples. Floors left clean and ready.",
    icon: Scissors,
  },
  {
    slug: "carpet-fitting",
    name: "Carpet Fitting",
    short: "Precise fitting for any room or stairs.",
    long: "Carpet, underlay and gripper installation. Stairs, landings, hallways and full rooms — neat seams, tight finish.",
    icon: LayoutGrid,
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    short: "Leaks, taps, toilets and small installs.",
    long: "Tap and toilet replacements, leak fixes, blocked sinks, washing machine hookups and small bathroom jobs.",
    icon: Droplet,
  },
  {
    slug: "man-with-van",
    name: "Man with Van",
    short: "Single items or small loads, anywhere local.",
    long: "Furniture pickups, marketplace collections, small moves and tip runs. Helpful, on time, fairly priced.",
    icon: Package,
  },
  {
    slug: "electrical",
    name: "Electrical",
    short: "Sockets, lights and small electrical jobs.",
    long: "Socket and light fitting swaps, fuse-board fixes, extractor fans, smart-home installs and small rewires by qualified sparks.",
    icon: Zap,
  },
];
