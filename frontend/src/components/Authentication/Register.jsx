import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import registerAnim from "../../assets/registerAnimation";
import API from "../../api/api";

const RegisterSchema = Yup.object({
  name: Yup.string().min(3, "At least 3 characters").required("Name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password"),
});

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await API.post("/auth/register", values);
      toast.success(res.data.message || "Registration successful! Check your email.");
      resetForm();
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 items-center justify-center mt-14">
  {/* TOP (on mobile) / RIGHT (on desktop): Animation */}
  <div className=" md:w-1/2 flex justify-center items-center mb-2 md:mb-0 order-first md:order-last">
    <Lottie animationData={registerAnim} loop={true} className="w-3/4 h-auto" />
  </div>

  {/* FORM SECTION */}
  <div className="w-full md:w-1/2 px-8 mb-16 md:p-8">
   <h2 className="text-3xl text-center text-primary mb-6 font-bold">
          Registration
        </h2>
    <Formik
      initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="space-y-4">
          <div>
            <Field name="name" placeholder="Full Name" className="w-full border p-2 rounded" />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <Field name="email" placeholder="Email" className="w-full border p-2 rounded" />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <Field type="password" name="password" placeholder="Password" className="w-full border p-2 rounded" />
            <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
          </div>
          <div>
            <Field type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full border p-2 rounded" />
            <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
          >
            Register
          </button>

          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </Form>
      )}
    </Formik>
  </div>
</div>

  );
};

export default Register;
