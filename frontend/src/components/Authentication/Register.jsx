import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

// ✅ Validation Schema
const RegisterSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Please enter a valid email address (e.g. user@example.com)"
    )
    .required("Email is required (e.g. user@example.com)"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

const Register = () => {
  // ✅ এখানে রাখো navigate
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await API.post("/auth/register", values);
      toast.success(res.data.message || "Registration successful! Please verify your email.");
      resetForm();

      // ✅ Redirect after 3 seconds
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="">
      <div className="">
        <h2 className="text-xl text-center text-primary mb-6">Create Account</h2>

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
                <Field type="email" name="email" placeholder="Email Address" className="w-full border p-2 rounded" />
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
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
