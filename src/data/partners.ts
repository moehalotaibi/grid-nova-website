import pwc from "@/assets/partners/pwc.svg";
import sieyuan from "@/assets/partners/sieyuan.svg";
import type { Partner } from "./site";

/** Partner marquee logos — 26–46 px tall, rendered monochrome (handoff › 18 & 21). Alt = partner name. */
export const partners: Partner[] = [
  { id: "saudi-energy", name: "Saudi Energy", src: "/images/partner-saudi-energy.webp", srcSet: "/images/partner-saudi-energy.webp 1x, /images/partner-saudi-energy@2x.webp 2x", width: 51, height: 44 },
  { id: "pwc", name: "PwC", src: pwc, width: 60, height: 46 },
  { id: "sieyuan", name: "Sieyuan Electric", src: sieyuan, width: 95, height: 26 },
  { id: "spark", name: "SPARK — King Salman Energy Park", src: "/images/partner-spark.webp", srcSet: "/images/partner-spark.webp 1x, /images/partner-spark@2x.webp 2x", width: 72, height: 40 },
];
