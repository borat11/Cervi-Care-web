import { motion } from "framer-motion";

const FloatingBackgroundLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* === Floating Background Illustration === */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/7067/7067183.png"
        alt="Cervical Care"
        className="absolute bottom-0 right-0 w-64 md:w-80 opacity-20 pointer-events-none select-none"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      {/* === Floating Shape 1 === */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 bg-pink-200 rounded-full opacity-30 blur-2xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      {/* === Floating Shape 2 === */}
      <motion.div
        className="absolute bottom-20 left-1/3 w-32 h-32 bg-purple-200 rounded-full opacity-25 blur-2xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      {/* === Page Content === */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default FloatingBackgroundLayout;
