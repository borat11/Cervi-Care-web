import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};
const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <div className="bg-accent min-h-screen font-sans overflow-hidden">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative bg-gradient-to-br from-purple-100 to-pink-50 py-24 px-6 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center justify-center"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-primary mb-4 drop-shadow-lg"
            whileHover={{ scale: 1.03 }}
          >
            Welcome to <span className="text-purple-700">CerviCare</span>{" "}
            {user ? user.name : "💜"}
          </motion.h1>

          <motion.p
            className="text-gray-700 max-w-2xl text-lg md:text-xl mb-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.3}
          >
            Empowering women’s health through Explainable AI — helping detect
            cervical cancer early and accurately.
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition transform hover:scale-105" onClick={() => navigate('/diagnosis')}>
              Start Diagnosis
            </button>
            <button className="border-2 border-primary text-primary px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition transform hover:scale-105" onClick={() => navigate('/awareness')}>
              Learn More
            </button>
          </motion.div>

          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/7067/7067183.png"
            alt="Cervical Care"
            className="w-60 md:w-80 mt-10"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ===================== SLIDER QUOTES ===================== */}
      <motion.section
        className="max-w-4xl mx-auto mt-16 mb-16 px-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
      >
        <Slider {...sliderSettings}>
          {[
            "Cervical cancer is preventable and treatable if detected early.",
            "Regular screening can reduce the risk of cervical cancer by up to 80%.",
            "Empowering women through awareness, diagnosis, and care.",
          ].map((quote, idx) => (
            <div key={idx} className="p-8 bg-white rounded-2xl shadow-lg">
              <p className="text-lg text-gray-700 italic text-center">
                “{quote}”
              </p>
            </div>
          ))}
        </Slider>
      </motion.section>

      {/* ===================== INFO SECTION ===================== */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="max-w-5xl mx-auto px-6 text-center mb-20"
      >
        <h2 className="text-3xl font-bold text-primary mb-4">
          About Cervical Cancer
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Cervical cancer occurs in the cells of the cervix — the lower part of
          the uterus that connects to the vagina. It’s primarily caused by
          persistent infection with certain types of human papillomavirus (HPV).
          Early stages often show no symptoms, but timely screening, vaccination,
          and AI-based detection can save lives.
        </p>
      </motion.section>

      {/* ===================== FEATURE CARDS ===================== */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 pb-20"
      >
        {[
          {
            title: "Symptom-based Diagnosis",
            desc: "Predicts cervical cancer risk using patient-reported symptoms through advanced machine learning analysis.",
            img: "https://cdn-icons-png.flaticon.com/512/4089/4089609.png",
          },
          {
            title: "Image-based Diagnosis",
            desc: "Utilizes AI and CNN models to analyze Pap smear images for accurate cellular-level cancer detection.",
            img: "https://cdn-icons-png.flaticon.com/512/2936/2936635.png",
          },
          {
            title: "Hybrid Diagnosis",
            desc: "Combines both symptom data and image analysis for a comprehensive and explainable AI-driven diagnosis.",
            img: "https://cdn-icons-png.flaticon.com/512/6153/6153519.png",
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
            }}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center transition"
          >
            <img src={card.img} alt={card.title} className="w-20 mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2 text-center">
              {card.title}
            </h3>
            <p className="text-gray-600 text-center">{card.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* ===================== WHY CERVICARE ===================== */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="bg-purple-50 py-20 px-6 text-center"
      >
        <h2 className="text-3xl font-bold text-primary mb-6">
          Why Choose CerviCare?
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "https://cdn-icons-png.flaticon.com/512/921/921347.png",
              title: "Explainable AI",
              desc: "Every diagnosis is transparent, interpretable, and trusted by medical professionals.",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/1484/1484841.png",
              title: "Hybrid Intelligence",
              desc: "Combines both symptom and image data for a complete diagnostic approach.",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/3203/3203071.png",
              title: "Privacy First",
              desc: "All data is securely processed with no personal information exposed.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <img src={item.icon} alt={item.title} className="w-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===================== AWARENESS + MISSION ===================== */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="bg-gradient-to-r from-purple-200 via-pink-100 to-purple-200 py-16 text-center"
      >
        <h2 className="text-3xl font-bold text-primary mb-3">
          Awareness is the first step to prevention
        </h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-10">
          Let’s join hands to create awareness, encourage screening, and
          empower women worldwide. Together, we can eliminate cervical cancer.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-primary mb-4">Our Mission</h3>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            At CerviCare, our mission is to democratize women’s healthcare by
            providing accessible, accurate, and explainable AI tools for early
            detection of cervical cancer — empowering women to take charge of
            their health globally.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
