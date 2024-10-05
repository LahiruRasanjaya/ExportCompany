
import './Login.css';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../service/ApiServices';

function getClasses(fieldState, ...classes) {
    const dirty = fieldState.isDirty ? 'r-dirty' : 'r-pristine';
    const touched = fieldState.isTouched ? 'r-touched' : 'r-untouched';
    const invalid = fieldState.invalid ? 'r-invalid' : 'r-valid';
    return `${classes.join(' ')} ${dirty} ${touched} ${invalid}`;
}

export function Login() {
    const username = useId();
    const password = useId();
    const navigate = useNavigate();
    const { register, formState, getFieldState, handleSubmit, setFocus } = useForm({
        mode: 'onChange',
    });

    function handleFormSubmit({ username, password }) {
        authenticateUser({ username, password })
            .then((response) => {
                // Successful login
                localStorage.setItem('user', 'authenticated');
                navigate('/app');
            })
            .catch((error) => {
                // Handle errors, e.g., invalid credentials
                localStorage.removeItem('user');
                alert('Invalid login credentials, try again');
                setFocus('username', {
                    shouldSelect: true,
                });
            });
    }

    return (
        <div className="login-background">
            <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white bg-opacity-90">
                <h1 className="text-4xl font-bold p-2 text-center" style={{ color: 'rgb(0, 50, 105)' }}>Login</h1>
                <div className="text-red-600 mt-4">Please enter your credentials to log in</div>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex items-centerflex flex-col items-center mt-4">
                    <label htmlFor={username}>Username</label>
                    <input
                        className={getClasses(getFieldState('username', formState), 'form-control', 'mb-2')}
                        {...register('username', { required: true, minLength: 3 })}
                        id={username}
                        type="text"
                        placeholder="Enter your username here"
                    />
                    <label htmlFor={password} className="mt-4">Password</label>
                    <input
                        className={getClasses(getFieldState('password', formState), 'form-control', 'mb-2')}
                        {...register('password', { required: true, minLength: 6 })}
                        id={password}
                        type="password"
                        placeholder="Enter your password here"
                    />
                    <button
                        disabled={!formState.isValid}
                        className="mb-4 border px-4 py-1 border-sky-500 hover:bg-sky-500 hover:text-white disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-400 rounded mt-2"
                    >
                        Log In
                    </button>
                </form>
                <div className="flex flex-col items-center mt-4">
                    <span className="text-black">Forgot
                    <a href="/create-profile" className="hover:underline">
                        <span className="text-blue-500 hover:underline"> Password?</span>
                    </a>
                    </span>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                    <span className="text-black">Don't have an account? 
                    <a href="/create-profile" className="hover:underline">
                        <span className="text-blue-500 hover:underline"> Signup</span>
                    </a>
                    </span>
                </div>
            </div>
        </div>
    );
}
