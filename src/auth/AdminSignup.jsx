// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { getAdminValidationSchema } from '../utiles/AdminValidationSchema';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css';

// const AdminSignup = () => {
//     const validationSchema = getAdminValidationSchema();
//     const navigate = useNavigate();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors }
//     } = useForm({
//         resolver: yupResolver(validationSchema),
//     });

//     const onSubmit = (data) => {
//         const formData = { ...data, role: 'ADMIN' };
//         console.log("Form Data:", formData);
//         navigate('/signin');
//     };

//     return (
//         <div className="customer-signup-container d-flex justify-content-center align-items-center my-4">
//             <div className="card border-0 shadow-lg bg-light " style={{ maxWidth: '380px', height:'450px'}}>
//                 <div className="card-body d-flex flex-column justify-content-between">
//                     <h2 className="text-center font-italic">Admin Signup</h2>

//                     <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
//                         <div className="mb-3 w-100">
//                             <input {...register('firstName')}
//                              placeholder="First name" 
//                              className="form-control" />
//                             <span className="error text-danger">{errors.firstName?.message}</span>
//                         </div>
//                         <div className="mb-3 w-100">
//                             <input {...register('lastName')} 
//                             placeholder='Last name' 
//                             className="form-control" />
//                             <span className="error text-danger">{errors.lastName?.message}</span>
//                         </div>
//                         <div className="mb-3 w-100">
//                             <input {...register('email')} 
//                             placeholder='Email' 
//                             className="form-control" />
//                             <span className="error text-danger">{errors.email?.message}</span>
//                         </div>
//                         <div className="mb-3 w-100">
//                             <input type="password"
//                             {...register('password')} 
//                             placeholder='Password' 
//                             className="form-control" />
//                             <span className="error text-danger">{errors.password?.message}</span>
//                         </div>

//                         <div className="justify-content-center mt-3 w-100">
//                             <button type="submit" className="btn btn-primary w-100">Sign Up</button>
//                         </div>
//                     </form>
//                     <p className="text-center mt-3">
//                         Already have an account?
//                         <button
//                             type="button"
//                             className="btn btn-link p-0"
//                             onClick={() => navigate('/signin')}
//                         >
//                             Sign In
//                         </button>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminSignup;
