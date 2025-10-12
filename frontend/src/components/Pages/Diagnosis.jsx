import React from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Image, ActivitySquare } from "lucide-react";

const Diagnosis = () => {
  const navigate = useNavigate();

  const diagnosisOptions = [
    {
      title: "Symptom-based Diagnosis",
      description:
        "Analyze symptoms provided by patients to predict cervical cancer risk using advanced AI models.",
      icon: <Brain className="text-primary w-10 h-10" />,
      path: "/diagnosis/symptom",
    },
    {
      title: "Image-based Diagnosis",
      description:
        "Upload Pap smear images to perform AI-driven cellular-level cancer detection using CNN & QCNN.",
      icon: <Image className="text-primary w-10 h-10" />,
      path: "/diagnosis/image",
    },
    {
      title: "Hybrid Diagnosis",
      description:
        "Combine symptom data and Pap smear images for a comprehensive explainable AI-based analysis.",
      icon: <ActivitySquare className="text-primary w-10 h-10" />,
      path: "/diagnosis/hybrid",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16 px-6 ">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto mb-16 mt-10 md:mt-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            AI-Powered Cervical Cancer Diagnosis
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Choose your preferred method of diagnosis. Our Explainable AI
            technology ensures transparency and accuracy for every woman’s health.
          </p>
        </div>
       
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {diagnosisOptions.map((opt, index) => (
          <div
            key={index}
            onClick={() => navigate(opt.path)}
            className="bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer"
          >
            <div className="flex justify-center mb-4">{opt.icon}</div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              {opt.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {opt.description}
            </p>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
              Start Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diagnosis;
