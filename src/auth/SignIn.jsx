import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link ,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';
import '../App.css';
import { useSigninMutation } from '../redux/service/SignupApi';
import { getLoginValidationSchema } from '../utils/LoginValidationSchema';
import HomeBus from '../assets/homeBus.png';
import Input from '../components/Input';
import Button from '../components/Button';


const SignIn = () => {
    const validationSchema = getLoginValidationSchema();
    const navigate = useNavigate();
    const [signin] = useSigninMutation();

 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const onSubmit = async (data) => {
        try {
            const result = await signin(data);
    
            if (result?.data?.statusCode === 200) {
                const { accessToken, refreshToken } = result.data.data;
                const decodedToken = jwtDecode(accessToken);
                console.log('Decoded Token:', decodedToken);
    
                const firstName = decodedToken.FirstName || 'User';
                const role = decodedToken.Role?.toUpperCase(); 
    
                sessionStorage.setItem('Token', accessToken);
                sessionStorage.setItem('RefreshToken', refreshToken);
                sessionStorage.setItem('FirstName', firstName);
                sessionStorage.setItem('Role', role);
    
                toast.success('Login successful!', { autoClose: 1000 });
    
                if (role === 'ADMIN') {
                    console.log('Navigating to admin page'); 
                    setTimeout(() => navigate('/admin'), 1000);  
                } else {
                    console.log('Navigating to home page');
                    setTimeout(() => navigate('/home'), 1000);  
                }
    
                reset();
            } else {
                toast.error(result?.data?.message || 'Login failed. Please try again.', { autoClose: 1000 });
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred during submission. Please try again.', {
                autoClose: 500,
            });
        }
    };
    
    

    return (
        <div className="home-container">

            <div className="right-img-container">
                <img src={HomeBus} alt="Sign In" />
            </div>
            
           <div className="customer-container d-flex justify-content-start align-items-start ">
                <div className="card border-0 shadow-lg bg-light mx-auto" style={{ marginTop: '180px'}} >
                    <div className="card-body">
                        <h2 className="text-center font-italic">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                            <div className="mb-3 w-100">
                                <Input
                                    {...register('email')}
                                    type="email"
                                    placeholder="Email"
                                    className="form-control"
                                />
                                <span className="error text-danger">{errors.email?.message}</span>
                            </div>
                            <div className="mb-3 w-100">
                                <Input
                                    type="password"
                                    {...register('password')}
                                    placeholder="Password"
                                    className="form-control"
                                />
                                <span className="error text-danger">{errors.password?.message}</span>
                            </div>
                          
                            <div className="text-end w-100">
                                <Button
                                    type="button"
                                    className="btn btn-link p-0"
                                    onClick={() => navigate('/forgot-password')}
                                    style={{ textDecoration: 'none', color: '#0066b8' }}
                                >
                                    Forgot Password?
                                </Button>
                            </div>
                            <div className="justify-content-center mt-3 w-100">
                                <Button
                                    type="submit"
                                    className="btn w-100"
                                    style={{ color: 'white', backgroundColor: '#0066b8' }}
                                >
                                    Sign In
                                </Button>
                            </div>
                        </form>

                        <ToastContainer />

                        <p className="text-center mt-3">
                            Don't have an account?

                            <Link  to='/signup'>
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
      

            <ToastContainer />
        </div>
    );
};

export default SignIn;
