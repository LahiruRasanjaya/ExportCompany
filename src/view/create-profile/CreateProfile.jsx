import './CreateProfile.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../service/ApiServices'; // Import the createUser function

export function CreateProfile() {
    const { register, handleSubmit, setFocus, formState } = useForm({
        mode: 'onChange',
    });
    
    const navigate = useNavigate();

    async function handleProfileCreate({ username, password }) {
        if (username.trim() && password.trim()) {
            try {
                const response = await createUser({ username, password });
                console.log(response)
                if (response.status === 201) { // Assuming 201 is returned on success
                    localStorage.setItem('user', 'authenticated');
                    navigate('/app');
                } else {
                    alert('Failed to create profile. Please try again.');
                }
            } catch (error) {
                alert('Error creating profile: ' + error.message);
                setFocus('username', { shouldSelect: true });
            }
        } else {
            alert('Please provide a valid username and password');
            setFocus('username', { shouldSelect: true });
        }
    }

    return (
        <div className="create-profile-background">
            <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white bg-opacity-90">
                <h1 className="text-4xl font-bold p-2 text-center" style={{ color: 'rgb(0, 50, 105)' }}>Create Profile</h1>
                <form onSubmit={handleSubmit(handleProfileCreate)} className="flex flex-col items-center mt-4" autoComplete="off">
                    <label htmlFor="username">New Username</label>
                    <input
                        className={`form-control mb-2 ${formState.errors.username ? 'r-invalid' : 'r-valid'}`}
                        {...register('username', { required: true, minLength: 3 })}
                        id="username"
                        type="text"
                        placeholder="Enter your username here"
                        autoComplete="off"
                    />
                    <label htmlFor="password" className="mt-4">New Password</label>
                    <input
                        className={`form-control mb-2 ${formState.errors.password ? 'r-invalid' : 'r-valid'}`}
                        {...register('password', { required: true, minLength: 6 })}
                        id="password"
                        type="password"
                        placeholder="Enter your password here"
                        autoComplete="off"
                    />
                    <button
                        disabled={!formState.isValid}
                        className="mt-4 mb-4 border px-4 py-1 border-sky-500 hover:bg-sky-500 hover:text-white disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-400 rounded mt-2"
                    >
                        Create Profile
                    </button>
                </form>
            </div>
        </div>
    );
}
