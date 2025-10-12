import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import Modal from "../common/Modal";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const Awareness = () => {
  const [selectedFact, setSelectedFact] = useState(null);

  const facts = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/3063/3063193.png",
      title: "💉 HPV Causes 99% of Cases",
      text: "Almost all cervical cancer cases are linked to HPV.",
      details: `HPV (Human Papillomavirus) is a group of viruses that infect the reproductive tract. 
Persistent infection with high-risk HPV types can cause cell changes that lead to cervical cancer.`,
      image: "https://cdn-icons-png.flaticon.com/512/1474/1474447.png",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
      title: "🩺 Early Detection Saves Lives",
      text: "Pap tests detect precancerous changes early.",
      details: `Regular screening identifies abnormal cells before they turn into cancer. 
Women should start screening from age 21 and continue every 3–5 years.`,
      lottie: "https://assets3.lottiefiles.com/packages/lf20_yc6j0j8h.json",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/4206/4206440.png",
      title: "👩 Women Aged 30–50 Most at Risk",
      text: "Awareness and vaccination are vital for women in this group.",
      details: `Cervical cancer most commonly affects women in their 30s to 50s. 
Prevention includes HPV vaccination, regular screening, and maintaining a healthy lifestyle.`,
      image: "https://cdn-icons-png.flaticon.com/512/3944/3944517.png",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-white min-h-screen font-sans overflow-hidden">

      {/* ===================== HERO ===================== */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-8 py-24 md:py-32 relative overflow-hidden">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left max-w-xl z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6">
            Cervical Cancer Awareness 🎗️
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Cervical cancer is one of the most preventable cancers. Awareness,
            vaccination, and early screening can save millions of lives every
            year. Learn how you can protect yourself and others.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("facts")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-primary text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 transition"
          >
            Learn More
          </button>
        </motion.div>

        {/* Lottie animation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          <Player
            autoplay
            loop
            src="https://assets2.lottiefiles.com/packages/lf20_4kx2q32n.json"
            style={{ height: "260px", width: "260px" }}
          />
        </motion.div>
      </section>

      {/* ===================== FACTS ===================== */}
      <section id="facts" className="max-w-6xl mx-auto text-center py-20 px-6">
        <h2 className="text-3xl font-bold text-primary mb-10">
          Quick Facts About Cervical Cancer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facts.map((fact, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setSelectedFact(fact)}
              className="bg-white/80 backdrop-blur-md border border-purple-100 shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition"
            >
              <img
                src={fact.icon}
                alt={fact.title}
                className="w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {fact.title}
              </h3>
              <p className="text-gray-600">{fact.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== PREVENTION ===================== */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="bg-gradient-to-r from-purple-100 via-pink-100 to-white py-20 px-6"
      >
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          How to Prevent Cervical Cancer
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: "https://cdn-icons-png.flaticon.com/512/4064/4064430.png",
              title: "Get Vaccinated",
              desc: "The HPV vaccine can prevent infection from high-risk virus strains.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
              title: "Regular Screening",
              desc: "Pap smear or HPV tests every 3–5 years help catch early changes.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/3103/3103475.png",
              title: "Healthy Lifestyle",
              desc: "Avoid smoking and maintain a balanced diet to reduce risk.",
            },
          ].map((tip, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              }}
              className="bg-white rounded-2xl p-8 text-center border border-purple-100"
            >
              <img src={tip.img} alt={tip.title} className="w-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-700">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===================== SCREENING TIMELINE ===================== */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="max-w-6xl mx-auto py-20 px-6 text-center"
      >
        <h2 className="text-3xl font-bold text-primary mb-8">
          Recommended Screening Schedule
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
          {[
            {
              age: "21–29",
              rec: "Pap test every 3 years",
              color: "bg-pink-50",
            },
            {
              age: "30–65",
              rec: "Pap + HPV co-test every 5 years",
              color: "bg-purple-50",
            },
            {
              age: "65+",
              rec: "Screening may stop if previous results were normal",
              color: "bg-pink-100",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`${step.color} rounded-2xl p-8 shadow-md w-64`}
            >
              <h3 className="text-2xl font-semibold text-primary">{step.age}</h3>
              <p className="text-gray-700 mt-3">{step.rec}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===================== CTA ===================== */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="bg-gradient-to-r from-purple-500 to-pink-400 text-white text-center py-24"
      >
        <h2 className="text-4xl font-bold mb-4">
          Take the First Step Toward Prevention 💜
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-8">
          Schedule your screening or explore our AI-powered diagnosis tools to
          understand your risk and stay informed.
        </p>
        <button
          onClick={() => (window.location.href = "/diagnosis")}
          className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Start Diagnosis
        </button>
      </motion.section>

      {/* ===================== MODAL ===================== */}
      <Modal
        isOpen={!!selectedFact}
        onClose={() => setSelectedFact(null)}
        title={selectedFact?.title}
        image={selectedFact?.image}
        lottie={selectedFact?.lottie}
      >
        <p className="text-gray-700 text-lg leading-relaxed">
          {selectedFact?.details}
        </p>
      </Modal>
    </div>
  );
};

export default Awareness;
