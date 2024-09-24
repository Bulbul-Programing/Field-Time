import About from "./About";
import FAQComponent from "./FAQComponent";
import HeroSection from "./HeroSection";
import OurAchievement from "./OurAchievement";
import WhyChoseUs from "./WhyChoseUs";

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <About></About>
            <OurAchievement></OurAchievement>
            <WhyChoseUs></WhyChoseUs>
            <FAQComponent></FAQComponent>
        </div>
    );
};

export default Home;