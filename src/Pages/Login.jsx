import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import AuthShell, { inputCls } from "../components/AuthShell";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(""); };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await authAPI.login(form.email, form.password);
      if (res.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      } else setError(res.message || "Login failed");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue to your account"
      footer={<>New here? <Link to="/signup" className="font-semibold text-green-700 hover:underline">Create an account</Link></>}
    >
      {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <form onSubmit={submit} className="space-y-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Email address</span>
          <input type="email" name="email" value={form.email} onChange={onChange} required disabled={loading} placeholder="you@email.com" className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Password</span>
          <input type="password" name="password" value={form.password} onChange={onChange} required disabled={loading} placeholder="••••••••" className={inputCls} />
        </label>
        <button disabled={loading} className="w-full rounded-xl bg-green-700 py-3.5 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}