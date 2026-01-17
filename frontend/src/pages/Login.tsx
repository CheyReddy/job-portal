import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, type FieldErrors } from 'react-hook-form'
import { loginSchema } from '../validation/loginSchema'
import { type LoginFormValues } from '../typevalues/FormValues';
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import { login } from '../service/authService';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getRole } from "../utils/auth";


function Login() {

  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      profileCompleted: false
    },
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });

  const { register, handleSubmit, reset, formState } = form;
  const { errors, isValid, isDirty, isSubmitting, isSubmitSuccessful, submitCount } = formState

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    if (submitCount > 3) {
      toast.warn("Still trying? Double-check your details!");
    }
  }, [submitCount]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data);
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("profileCompleted", response.profileCompleted);
      // eslint-disable-next-line react-hooks/purity
      localStorage.setItem("tokenExpiry", (Date.now() + response.expiresIn).toString());
      console.log(response.token);
      toast.success("Login successful");

      if (isAuthenticated()) {
        const role = getRole();
        if (role === "JOB_SEEKER") navigate("/jobseeker");
        if (role === "RECRUITER") navigate("/recruiter");
        if (role === "ADMIN") navigate("/admin");
      }

    } catch (error) {
      toast.error("Incorrect email/password..!");
      console.error(error);
    }
  }

  const onError = (errors: FieldErrors<LoginFormValues>) => {
    console.log("Errors: ", errors);
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6'>
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Job Portal Login
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Sign in to your account
          </p>
        </div>

        <form className='space-y-4' onSubmit={handleSubmit(onSubmit, onError)}>

          <div>
            <label htmlFor="email" className="label">Email</label>
            <input type="email" className='input' placeholder='someone@gmail.com' {...register("email")} />
            {errors.email && (
              <p className='text-sm text-red-600 mt-1'>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="label">Password</label>
            <input type="password" {...register("password")} className='input' placeholder='******' {...register("password")} />
            {errors.password && (
              <p className='text-sm text-red-600 mt-1'>{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button type="submit" className='btn-primary w-full' disabled={!isValid || !isDirty}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className='text-sm text-gray-600 text-center mt-6'>
          Don't have an account?{" "}
          <a href="#" className='text-blue-600 hover:underline'>Sign up</a>
        </p>

      </div>
    </div>
  )
}

export default Login
