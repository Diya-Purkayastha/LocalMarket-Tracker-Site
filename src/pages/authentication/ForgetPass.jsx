import React, { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';


const ForgetPass = () => {
  
    const { forgetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setEmail(location.state);
        }
    }, [location.state]);

    const handleForgetPassword = () => {
        if (!email) {
            toast.warning("Please enter your email.");
            return;
        }

        forgetPassword(email)
            .then(() => {
                toast.info("Check your email now");
                window.open("https://mail.google.com", "_blank");
            })
            .catch((error) => {
                const errorMessag = error.code;
                setErrorMessage(errorMessag);
                toast.error(errorMessage);
            });
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
            <div className="card-body">
                <h1 className='card-title'>Change Password Now</h1>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button onClick={handleForgetPassword} className="btn btn-secondary mt-4">
                        Reset Password
                    </button>
                </fieldset>
            </div>
        </div>
    );
};

export default ForgetPass;