// RegisterSimple.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../store/actions/useraction.jsx';
import toast, { Toaster } from 'react-hot-toast';

const RegisterSimple = () => {
  const dispacth = useDispatch()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const datas = {
      fullName:{
        firstName:data?.firstName,
        lastName:data?.lastName
      },
      email:data?.email,
      password:data?.password,
      gender:data?.gender
    }
    
    const loadingToast = toast.loading('Creating your account...')

    try {
      const iscorrectrepo = await dispacth(registerUser(datas))

      if(iscorrectrepo.error){
        toast.error('Registration failed. Please check your details.', { id: loadingToast })
        return 
      }
      
      toast.success('Account created successfully!', { id: loadingToast })
      reset()
      navigate('/')
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: loadingToast })
    }
  }

  return (
    <div className="min-h-screen bg-[#212121] text-white flex items-center justify-center px-4 py-8">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#2d2d2d',
            color: '#fff',
            border: '1px solid #404040',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-medium tracking-tight mb-2">Create Account</h1>
          <p className="text-gray-400">Join us and start chatting with AI</p>
        </div>

        {/* Main Card */}
        <div className="bg-[#171717] rounded-2xl border border-[#2d2d2d] p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: { value: 2, message: 'First name must be at least 2 characters' }
                  })}
                  className={`w-full px-4 py-3 bg-[#212121] border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 ${
                    errors.firstName ? 'border-red-500/50 bg-red-500/5' : 'border-[#2d2d2d] hover:border-[#404040]'
                  }`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                  })}
                  className={`w-full px-4 py-3 bg-[#212121] border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 ${
                    errors.lastName ? 'border-red-500/50 bg-red-500/5' : 'border-[#2d2d2d] hover:border-[#404040]'
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={`w-full px-4 py-3 bg-[#212121] border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 ${
                  errors.email ? 'border-red-500/50 bg-red-500/5' : 'border-[#2d2d2d] hover:border-[#404040]'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                className={`w-full px-4 py-3 bg-[#212121] border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 text-white placeholder-gray-500 ${
                  errors.password ? 'border-red-500/50 bg-red-500/5' : 'border-[#2d2d2d] hover:border-[#404040]'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                Gender
              </label>
              <select
                id="gender"
                {...register('gender', { required: 'Please select your gender' })}
                className={`w-full px-4 py-3 bg-[#212121] border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 text-white ${
                  errors.gender ? 'border-red-500/50 bg-red-500/5' : 'border-[#2d2d2d] hover:border-[#404040]'
                }`}
              >
                <option value="" className="bg-[#212121]">Select Gender</option>
                <option value="male" className="bg-[#212121]">Male</option>
                <option value="female" className="bg-[#212121]">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-400 text-xs mt-1">{errors.gender.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 ${
                isSubmitting
                  ? 'bg-white/10 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 border border-white/20 transform hover:-translate-y-0.5'
              } focus:outline-none focus:ring-2 focus:ring-white/20`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-white hover:text-gray-200 font-medium transition-colors duration-200 underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterSimple;
