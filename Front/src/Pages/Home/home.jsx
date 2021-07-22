import { motion } from "framer-motion";
import "../Home/home_style.css"


const Home = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
    <div className="homeLogo"></div>
    <div><h1 className="titles-home">IHEALTH</h1></div>
    <div className="home-align">
      <div className="container-home">
        <div className="item-home">
          <h4 className="home-description ">
          Ihealth was developed to make life easier for people 
          who need to control the levels of pressure, 
          glucose or temperature, with this app, 
          you can store these values ​​and send them directly 
          to your doctor, or your doctor can check your 
          levels using your unique id once you offer it.
          </h4>
        </div>
        <div className="item-name">
          <div className="crossTechLogo"></div>
        </div>
      </div>
    <div className="home-description">
    </div>
    </div>
      </motion.div>
    </div>
  );
};
export default Home;
