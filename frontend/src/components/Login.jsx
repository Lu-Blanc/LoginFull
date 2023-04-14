import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
    
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setError('Password wrong');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/login/login', {
                email,
                password
            });
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.msg);
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };
    return (
        <div className="flex justify-center items-center h-screen bg-slate-500">
            <form onSubmit={ handleSubmit } className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {error && <p className="text-red-500 text-sm mb-4 flex justify-center">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>

    )
}

export default Login