import { p as Sprout, l as PaintRoller, o as Sparkles, D as Droplet, Z as Zap, W as Wrench, S as Scissors, L as LayoutGrid, r as Truck, P as Package } from "../_libs/lucide-react.mjs";
const gardeningImg = "/assets/service-gardening-CQ2r-Uta.jpg";
const paintingImg = "/assets/service-painting-DidMbTl0.jpg";
const cleaningImg = "/assets/service-cleaning-C1fGlKkp.jpg";
const removalsImg = "/assets/service-removals-BQWtpIme.jpg";
const handymanImg = "/assets/service-handyman-D3EnpID5.jpg";
const carpetRemovalImg = "/assets/service-carpet-removal-DUay0_6d.jpg";
const carpetFittingImg = "/assets/service-carpet-fitting-Bbof4S7q.jpg";
const plumbingImg = "/assets/service-plumbing-DTqvueUP.jpg";
const manWithVanImg = "/assets/service-man-with-van-DwRhszrf.jpg";
const electricalImg = "/assets/service-electrical-DzHsyhb7.jpg";
const services = [
  {
    slug: "gardening",
    name: "Gardening",
    short: "Lawns mowed, hedges trimmed, gardens tidied.",
    long: "Lawn mowing, hedge trimming, weeding, planting and seasonal clear-ups. Regular visits or one-off blitz.",
    icon: Sprout,
    image: gardeningImg
  },
  {
    slug: "painting",
    name: "Painting",
    short: "Interior and exterior painting, neat and tidy.",
    long: "Walls, ceilings, woodwork, doors and exterior facades. Quality paints, dust sheets down, no mess left behind.",
    icon: PaintRoller,
    image: paintingImg
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    short: "Deep cleans, end-of-tenancy, regular visits.",
    long: "Domestic, end-of-tenancy and after-builders cleans. Kitchens, bathrooms, ovens and carpets included on request.",
    icon: Sparkles,
    image: cleaningImg
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    short: "Leaks, taps, toilets and small installs.",
    long: "Tap and toilet replacements, leak fixes, blocked sinks, washing machine hookups and small bathroom jobs.",
    icon: Droplet,
    image: plumbingImg
  },
  {
    slug: "electrical",
    name: "Electrical",
    short: "Sockets, lights and small electrical jobs.",
    long: "Socket and light fitting swaps, fuse-board fixes, extractor fans, smart-home installs and small rewires by qualified sparks.",
    icon: Zap,
    image: electricalImg
  },
  {
    slug: "handyman-jobs",
    name: "Handyman Jobs",
    short: "Odd jobs, repairs and small fixes around the home.",
    long: "Flat-pack assembly, shelving, picture hanging, door repairs, leaky taps, sealants — anything on your snag list.",
    icon: Wrench,
    image: handymanImg
  },
  {
    slug: "carpet-removal",
    name: "Carpet Removal",
    short: "Old carpets pulled up and taken away.",
    long: "Lift and dispose of old carpets, underlay, gripper rods and staples. Floors left clean and ready.",
    icon: Scissors,
    image: carpetRemovalImg
  },
  {
    slug: "carpet-fitting",
    name: "Carpet Fitting",
    short: "Precise fitting for any room or stairs.",
    long: "Carpet, underlay and gripper installation. Stairs, landings, hallways and full rooms — neat seams, tight finish.",
    icon: LayoutGrid,
    image: carpetFittingImg
  },
  {
    slug: "house-removals",
    name: "House Removals",
    short: "Full house moves, carefully and on time.",
    long: "Whole-home moves with packing, loading, transport and unloading. Furniture wrapped and protected.",
    icon: Truck,
    image: removalsImg
  },
  {
    slug: "man-with-van",
    name: "Man with Van",
    short: "Single items or small loads, anywhere local.",
    long: "Furniture pickups, marketplace collections, small moves and tip runs. Helpful, on time, fairly priced.",
    icon: Package,
    image: manWithVanImg
  }
];
export {
  services as s
};
