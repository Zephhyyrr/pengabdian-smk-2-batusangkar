import Image from "next/image";
import HeroSection from "./components/HeroSection";
import TefaSlider from "./components/TefaSlider";
import TefaPrograms from "./components/TefaPrograms";
import ProfileSekolah from "./components/Profilesekolah";
import InfoSekolah from "./components/Infosekolah";
import Jurusans from "./components/Jurusan";
import Mitras from "./components/Mitra";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TefaPrograms />
      <TefaSlider />
      <ProfileSekolah />
      <InfoSekolah />
      <Jurusans />
      <Mitras />
      <Footer />
    </>
  );
}
