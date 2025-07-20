import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully logged in");
        navigate(from);
      })
      .catch((error) => toast.error(error.code));
  };

  const handleForgetPass = () => {
    const email = getValues('email'); // ✅ FIXED
    if (!email) {
      toast.warning("Please enter your email.");
      return;
    }
    navigate('/forgetpass', { state: email });
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Please Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email')}
                className="input input-bordered w-full"
                placeholder="Email"
              />

              <label className="label">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                })}
                className="input input-bordered w-full"
                placeholder="Password"
              />
              {errors.password?.type === 'required' && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className="text-red-500 text-sm">
                  Password must be at least 6 characters
                </p>
              )}

              {/* Forgot Password */}
              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={handleForgetPass}
                  className="link link-hover text-sm"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button className="btn bg-my-primary text-white mt-4 w-full">
                Login
              </button>
            </fieldset>

            <p className="text-center mt-3 text-sm">
              New to this website?{' '}
              <Link
                state={{ from }}
                className="link text-my-primary font-semibold"
                to="/register"
              >
                Register
              </Link>
            </p>
          </form>

         
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
