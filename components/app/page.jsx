import Hero from "@/components/home/Hero";
import HomeCategories from "@/components/home/HomeCategories";
import HomeFeaturedProducts from "@/components/home/HomeFeaturedProducts";
import HomeAbout from "@/components/home/HomeAbout";
import HomePartners from "@/components/home/HomePartners";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeFeaturedProducts />
      <HomeAbout />
      <HomeCategories />
    </>
  );
}
