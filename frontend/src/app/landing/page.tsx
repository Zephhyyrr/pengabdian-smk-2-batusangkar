import Image from "next/image";
import HeroSection from "../../components/landing/HeroSection";
import TefaSlider from "../../components/landing/TefaSlider";
import TefaPrograms from "../../components/landing/TefaPrograms";
import ProfileSekolah from "../../components/landing/Profilesekolah";
import InfoSekolah from "../../components/landing/Infosekolah";
import Jurusans from "../../components/landing/Jurusan";
import Mitras from "../../components/landing/Mitra";
import Footer from "../../components/landing/Footer";

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
