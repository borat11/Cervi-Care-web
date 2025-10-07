import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

const VerifyEmail = () => {
  const { token } = useParams();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await API.get(`auth/verify/${token}`);
        toast.success(res.data.message);
      } catch (err) {
        toast.error(err.response?.data?.message || "Verification failed");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold text-primary">Verifying your email...</h2>
    </div>
  );
};

export default VerifyEmail;
