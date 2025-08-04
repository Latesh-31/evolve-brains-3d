import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { QuickStartSection } from "@/components/QuickStartSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <QuickStartSection />
    </Layout>
  );
};

export default Index;