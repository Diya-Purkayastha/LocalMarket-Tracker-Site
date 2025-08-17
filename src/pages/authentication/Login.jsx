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
    const email = getValues('email'); 
    if (!email) {
      toast.warning("Please enter your email.");
      return;
    }
    navigate('/forgetpass', { state: email });
  };

  return (
     <div className="relative min-h-screen flex items-center justify-center px-4">

      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 opacity-70 bg-cover bg-center -z-10 bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/kV6DkRbr/xsharapatx-e-BADS20-DZt-A-unsplash.jpg')`,
        }}



      >

      </div>
   
  <div className="card bg-opacity-20 backdrop-blur-md w-full max-w-md md:max-w-lg shadow-2xl">
    <div className="card-body p-8">
          <h1 className="text-3xl font-bold text-center text-white">Please Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset text-white">
              <label className="label text-white">Email</label>
              <input
                type="email"
                {...register('email')}
                className="input input-bordered w-full"
                placeholder="Email"
              />

              <label className="label text-white">Password</label>
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
                  className="link link-hover text-sm text-white"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button className="btn bg-my-primary text-white mt-4 w-full">
                Login
              </button>
            </fieldset>

            <p className="text-center mt-3 text-sm text-white">
              New to this website?{' '}
              <Link
                state={{ from }}
                className="link text-my-primary font-semibold"
                to="/auth/register"
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
