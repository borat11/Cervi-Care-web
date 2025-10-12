import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

const Modal = ({ isOpen, onClose, title, children, image, lottie }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* === BACKDROP === */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* === MODAL BOX === */}
          <motion.div
            className="fixed z-[110] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                       bg-white rounded-3xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-2xl font-semibold text-primary">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-primary text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] overflow-y-auto text-center px-2 pb-2 text-gray-700">
              {/* Optional Lottie animation */}
              {lottie && (
                <Player
                  autoplay
                  loop
                  src={lottie}
                  style={{
                    height: "180px",
                    width: "180px",
                    margin: "0 auto 1rem",
                  }}
                />
              )}

              {/* Optional Image */}
              {image && (
                <img
                  src={image}
                  alt={title}
                  className="mx-auto mb-4 rounded-xl shadow-md w-60"
                />
              )}

              {/* Children content */}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
