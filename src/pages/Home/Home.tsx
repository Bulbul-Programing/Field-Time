import About from "./About";
import FAQComponent from "./FAQComponent";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import OurAchievement from "./OurAchievement";
import WhyChoseUs from "./WhyChoseUs";

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <About></About>
            <OurAchievement></OurAchievement>
            <HowItWorks></HowItWorks>
            <WhyChoseUs></WhyChoseUs>
            <FAQComponent></FAQComponent>
        </div>
    );
};

export default Home;