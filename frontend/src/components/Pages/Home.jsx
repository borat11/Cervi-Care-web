import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 bg-accent min-h-screen">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Welcome to CerviCare {user?user.name:"💜"}
      </h1>
      <p className="text-gray-700 max-w-lg mb-6">
        Empowering women’s health through Explainable AI — helping detect cervical
        cancer early and accurately.
      </p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/7067/7067183.png"
        alt="Cervical Care"
        className="w-64"
      />
    </div>
  );
};

export default Home;
