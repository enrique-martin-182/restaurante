import { Hero } from "@/components/sections/Hero";
import { Menu } from "@/components/sections/Menu";
import { Reservation } from "@/components/sections/Reservation";
import { Gallery } from "@/components/sections/Gallery";
import { Hours } from "@/components/sections/Hours";

export default function Home() {
  return (
    <>
      <Hero />
      <Menu />
      <Reservation />
      <Gallery />
      <Hours />
    </>
  );
}
