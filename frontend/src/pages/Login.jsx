// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Save to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user?.role);
      localStorage.setItem('username', res.data.username || res.data.user?.username || 'User');

      // Call parent handler if needed
      if (onLogin) onLogin(res.data.token, res.data.user?.role, res.data.user?.username);

      // Navigate based on role
      navigate(res.data.user?.role === 'admin' ? '/admin' : '/user');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-indigo-100">Login to start your quiz challenge</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent peer transition-all"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="absolute left-5 top-4 text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-indigo-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm"
              >
                Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent peer transition-all"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute left-5 top-4 text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-indigo-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base bg-white px-1 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm"
              >
                Password
              </label>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 text-gray-500 hover:text-indigo-600 transition"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register link */}
          <p className="mt-8 text-center text-gray-600">
            No account?{' '}
            <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;