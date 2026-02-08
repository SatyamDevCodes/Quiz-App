// src/pages/AdminHome.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHome = ({ onLogout }) => {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
    category: 'Web Dev',
    difficulty: 'Easy',
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: 'success' }); // for toast

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/questions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setQuestions(res.data);
    } catch (err) {
      console.error('Failed to fetch questions:', err);
      showMessage('Failed to load questions', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: 'success' }), 4000);
  };

  const handleChange = (e, index) => {
    if (e.target.name === 'options') {
      const newOptions = [...form.options];
      newOptions[index] = e.target.value;
      setForm({ ...form, options: newOptions });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        question: form.question,
        options: form.options,
        answer: form.answer,
        category: form.category,
        difficulty: form.difficulty,
      };

      if (editId) {
        await axios.put(`http://localhost:5000/api/questions/${editId}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        showMessage('Question updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/questions', payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        showMessage('Question added successfully!');
      }

      setForm({
        question: '',
        options: ['', '', '', ''],
        answer: '',
        category: 'Web Dev',
        difficulty: 'Easy',
      });
      setEditId(null);
      fetchQuestions();
    } catch (err) {
      console.error('Error saving question:', err);
      showMessage(err.response?.data?.error || 'Failed to save question', 'error');
    }
  };

  const handleEdit = (q) => {
    setForm({
      question: q.question,
      options: [...q.options],
      answer: q.answer,
      category: q.category,
      difficulty: q.difficulty,
    });
    setEditId(q._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/questions/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      showMessage('Question deleted successfully!');
      fetchQuestions();
    } catch (err) {
      showMessage('Failed to delete question', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Logout
          </button>
        </div>

        {/* Toast Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg text-white text-center font-medium shadow-md ${
              message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {editId ? 'Edit Question' : 'Add New Question'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <input
                type="text"
                name="question"
                value={form.question}
                onChange={handleChange}
                placeholder="Enter question here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {form.options.map((opt, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Option {idx + 1}
                </label>
                <input
                  type="text"
                  name="options"
                  value={opt}
                  onChange={(e) => handleChange(e, idx)}
                  placeholder={`Option ${idx + 1}`}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
              <input
                type="text"
                name="answer"
                value={form.answer}
                onChange={handleChange}
                placeholder="Exact correct option"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Web Dev">Web Dev</option>
                  <option value="Math">Math</option>
                  <option value="GK">GK</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({
                      question: '',
                      options: ['', '', '', ''],
                      answer: '',
                      category: 'Web Dev',
                      difficulty: 'Easy',
                    });
                  }}
                  className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
              >
                {editId ? 'Update Question' : 'Add Question'}
              </button>
            </div>
          </form>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Questions List</h2>

          {loading ? (
            <p className="text-center text-gray-600">Loading questions...</p>
          ) : questions.length === 0 ? (
            <p className="text-center text-gray-500">No questions added yet.</p>
          ) : (
            <div className="space-y-6">
              {questions.map((q) => (
                <div
                  key={q._id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{q.question}</h3>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(q)}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(q._id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <strong>Options:</strong>
                      <ul className="list-disc pl-5 mt-1">
                        {q.options.map((opt, i) => (
                          <li key={i} className={opt === q.answer ? 'font-semibold text-green-700' : ''}>
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p><strong>Correct Answer:</strong> <span className="text-green-700 font-medium">{q.answer}</span></p>
                      <p><strong>Category:</strong> {q.category}</p>
                      <p><strong>Difficulty:</strong> {q.difficulty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;