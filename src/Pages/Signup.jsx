import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import AuthShell, { inputCls } from "../components/AuthShell";

export default function Signup() {
  const navigate = useNavigate();
  const [f, setF] = useState({ firstName: "", lastName: "", phone: "", email: "", password: "", confirmPassword: "", agree: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setF({ ...f, [name]: type === "checkbox" ? checked : value });
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (f.password !== f.confirmPassword) return setError("Passwords do not match");
    if (!f.agree) return setError("Please agree to the Terms & Conditions");
    setLoading(true);
    try {
      const res = await authAPI.register({ first_name: f.firstName, last_name: f.lastName, email: f.email, password: f.password, phone: f.phone });
      if (res.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      } else setError(res.message || "Registration failed");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your reading journey in under a minute"
      footer={<>Already have an account? <Link to="/login" className="font-semibold text-green-700 hover:underline">Sign in</Link></>}
    >
      {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input name="firstName" value={f.firstName} onChange={onChange} placeholder="First name" required disabled={loading} className={inputCls} />
          <input name="lastName" value={f.lastName} onChange={onChange} placeholder="Last name" required disabled={loading} className={inputCls} />
        </div>
        <input type="tel" name="phone" value={f.phone} onChange={onChange} placeholder="Phone number" required disabled={loading} className={inputCls} />
        <input type="email" name="email" value={f.email} onChange={onChange} placeholder="Email address" required disabled={loading} className={inputCls} />
        <input type="password" name="password" value={f.password} onChange={onChange} placeholder="Password" required disabled={loading} className={inputCls} />
        <input type="password" name="confirmPassword" value={f.confirmPassword} onChange={onChange} placeholder="Confirm password" required disabled={loading} className={inputCls} />
        <label className="flex items-start gap-3 text-sm text-stone-600">
          <input type="checkbox" name="agree" checked={f.agree} onChange={onChange} className="mt-0.5 h-4 w-4 accent-green-700" />
          <span>I agree to the <a href="#" className="font-medium text-green-700">Terms & Conditions</a> and <a href="#" className="font-medium text-green-700">Privacy Policy</a></span>
        </label>
        <button disabled={loading} className="w-full rounded-xl bg-green-700 py-3.5 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 disabled:opacity-60">
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}