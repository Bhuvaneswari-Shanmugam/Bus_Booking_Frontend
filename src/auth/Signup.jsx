import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSignupValidationSchema } from '../utiles/SignupValidationSchema';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../redux/service/SignupApi';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormFields } from '../constant/Index';
import Button from '../components/Button';
import Input from '../components/Input';
import Form from '../components/Form';
import HomeBus from '../assets/homeBus.png';
import '../App.css';

const Signup = () => {
    const validationSchema = getSignupValidationSchema();
    const navigate = useNavigate();

    const [signup] = useSignupMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        try {
            await signup(data).unwrap();
            toast.success("SignUp done Successfully", {
                autoClose: 500,
                onClose: () => navigate('/')
            });
            reset();
        } catch (err) {
            console.error("Signup Error: ", err);
            toast.error("Signup failed. Please try again.");
        }
    };

    return (
        <div className="home-container">
            <div className="right-img-container">
                <img src={HomeBus} alt="Sign In" />
            </div>

            <div className="customer-container d-flex justify-content-center align-items-center my-4">
                <ToastContainer />
                <div className="card border-0 shadow-lg bg-light" style={{ margin:'0px'}}>
                    <div className="card-body flex-column justify-content-between">
                        <h2 className="text-center font-italic p-4">Customer Signup</h2>

                        <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center w-100">
                            {FormFields.map((field, index) => (
                                <div key={index} className="mb-3 w-100">
                                    {!field.isCheckbox ? (
                                        <>
                                            <Input
                                                {...register(field.name)}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                className="form-control w-100"
                                                id={field.id}
                                            />
                                            <span className="error text-danger">{errors[field.name]?.message}</span>
                                        </>
                                    ) : (
                                        <div className="form-check w-100">
                                            <Input
                                                type="checkbox"
                                                {...register(field.name)}
                                                className={field.className}
                                                id={field.id}
                                            />
                                            <label className="form-check-label" htmlFor={field.id}>
                                                {field.label}
                                            </label>
                                            <span className="error text-danger">{errors[field.name]?.message}</span>
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="justify-content-center mt-3 w-100">
                                <Button
                                    type="submit"
                                    className="btn w-100"
                                    style={{
                                        color: 'white',
                                        backgroundColor: '#0066b8',
                                        margin: 0,
                                        padding: '0.6rem 1rem',
                                        border: 'none',
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </Form>

                        <p className="text-center mt-3">
                            Already have an account?{' '}
                            <Button
                                type="button"
                                className="btn btn-link p-0"
                                onClick={() => navigate('/')}
                            >
                                Sign In
                            </Button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
