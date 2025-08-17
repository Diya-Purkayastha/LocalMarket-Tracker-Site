import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance = useAxios();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {

        console.log(data);

        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);

                // update userinfo in the database
                const userInfo = {
                    email: data.email,
                    name: data.name,
                    photoURL: profilePic,
                    role: 'user', // default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data);

                // update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('profile name pic updated');
                        navigate(from);
                    })
                    .catch(error => {
                        console.log(error)
                    })

            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image)

        const formData = new FormData();
        formData.append('image', image);


        const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imagUploadUrl, formData)

        setProfilePic(res.data.data.url);

    }

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
      <div className="card  w-full bg-opacity-20 backdrop-blur-md max-w-sm shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center text-white">Create Account</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* ✅ Name Field */}
              <label className="label text-white">Your Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}

              {/* ✅ Profile Image Field */}
              <label className="label mt-3 text-white">Profile Picture</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />

              {/* ✅ Email Field */}
              <label className="label mt-3 text-white">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}

              {/* ✅ Password Field */}
              <label className="label mt-3 text-white">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input input-bordered w-full"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 6 characters long
                </p>
              )}

              {/* ✅ Register Button */}
              <button className="btn bg-my-primary text-white w-full mt-4">
                Register
              </button>
            </fieldset>

            {/* ✅ Login Link */}
            <p className="text-center mt-4 text-sm  text-white">
              Already have an account?{" "}
              <Link className="link text-my-primary font-semibold" to="/login">
                Login
              </Link>
            </p>
          </form>

          
          <SocialLogin />
        </div>
      </div>
    </div>
    );
};

export default Register;