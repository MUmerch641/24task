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

import gardeningImg from "@/assets/service-gardening.jpg";
import paintingImg from "@/assets/service-painting.jpg";
import cleaningImg from "@/assets/service-cleaning.jpg";
import removalsImg from "@/assets/service-removals.jpg";
import handymanImg from "@/assets/service-handyman.jpg";
import carpetRemovalImg from "@/assets/service-carpet-removal.jpg";
import carpetFittingImg from "@/assets/service-carpet-fitting.jpg";
import plumbingImg from "@/assets/service-plumbing.jpg";
import manWithVanImg from "@/assets/service-man-with-van.jpg";
import electricalImg from "@/assets/service-electrical.jpg";

export type Service = {
  slug: string;
  name: string;
  short: string;
  long: string;
  icon: LucideIcon;
  image: string;
};

export const services: Service[] = [
  {
    slug: "gardening",
    name: "Gardening",
    short: "Lawns mowed, hedges trimmed, gardens tidied.",
    long: "Lawn mowing, hedge trimming, weeding, planting and seasonal clear-ups. Regular visits or one-off blitz.",
    icon: Sprout,
    image: gardeningImg,
  },
  {
    slug: "painting",
    name: "Painting",
    short: "Interior and exterior painting, neat and tidy.",
    long: "Walls, ceilings, woodwork, doors and exterior facades. Quality paints, dust sheets down, no mess left behind.",
    icon: PaintRoller,
    image: paintingImg,
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    short: "Deep cleans, end-of-tenancy, regular visits.",
    long: "Domestic, end-of-tenancy and after-builders cleans. Kitchens, bathrooms, ovens and carpets included on request.",
    icon: Sparkles,
    image: cleaningImg,
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    short: "Leaks, taps, toilets and small installs.",
    long: "Tap and toilet replacements, leak fixes, blocked sinks, washing machine hookups and small bathroom jobs.",
    icon: Droplet,
    image: plumbingImg,
  },
  {
    slug: "electrical",
    name: "Electrical",
    short: "Sockets, lights and small electrical jobs.",
    long: "Socket and light fitting swaps, fuse-board fixes, extractor fans, smart-home installs and small rewires by qualified sparks.",
    icon: Zap,
    image: electricalImg,
  },
  {
    slug: "handyman-jobs",
    name: "Handyman Jobs",
    short: "Odd jobs, repairs and small fixes around the home.",
    long: "Flat-pack assembly, shelving, picture hanging, door repairs, leaky taps, sealants — anything on your snag list.",
    icon: Wrench,
    image: handymanImg,
  },
  {
    slug: "carpet-removal",
    name: "Carpet Removal",
    short: "Old carpets pulled up and taken away.",
    long: "Lift and dispose of old carpets, underlay, gripper rods and staples. Floors left clean and ready.",
    icon: Scissors,
    image: carpetRemovalImg,
  },
  {
    slug: "carpet-fitting",
    name: "Carpet Fitting",
    short: "Precise fitting for any room or stairs.",
    long: "Carpet, underlay and gripper installation. Stairs, landings, hallways and full rooms — neat seams, tight finish.",
    icon: LayoutGrid,
    image: carpetFittingImg,
  },
  {
    slug: "house-removals",
    name: "House Removals",
    short: "Full house moves, carefully and on time.",
    long: "Whole-home moves with packing, loading, transport and unloading. Furniture wrapped and protected.",
    icon: Truck,
    image: removalsImg,
  },
  {
    slug: "man-with-van",
    name: "Man with Van",
    short: "Single items or small loads, anywhere local.",
    long: "Furniture pickups, marketplace collections, small moves and tip runs. Helpful, on time, fairly priced.",
    icon: Package,
    image: manWithVanImg,
  },
];
