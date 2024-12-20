import AC from '../assets/cat-bus2.png'
import bus from '../assets/bus.jpg';
import sleeperBus from '../assets/cat-bus1.png';


export const BASE_URL = "http://localhost:8081/api/v1/auth/";

  
export const FormFields = [
    
        {
          name: 'firstName',
          placeholder: 'First name',
          type: 'text',
          className: 'w-48 me-2',
          id: 'firstName'
        },
        {
          name: 'lastName',
          placeholder: 'Last name',
          type: 'text',
          className: 'w-48',
          id: 'lastName'
        },
        
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email',
          className: 'w-100',
          id: 'email'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          className: 'w-100',
          id: 'password'
        },
        
       
        {
          name: 'role',
          placeholder: 'Role',
          type: 'text',
          className: 'w-100',
          id: 'role'
        },
        {
          name: 'termsAccepted',
          label: 'I accept the Terms and Conditions',
          type: 'checkbox',
          className: 'form-check-input',
          id: 'termsAccepted',
          isCheckbox: true
        }
];


export const acBuses = [
  { id: 1, imgSrc: AC, price: 700, type: 'AC' },
  { id: 2, imgSrc: AC, price: 700, type: 'AC' },
];

export const nonAcBuses = [
  { id: 3, imgSrc: bus, price: 520, type: 'NON-AC' },
  { id: 4, imgSrc: bus, price: 520, type: 'NON-AC' },
];

export const sleeperBuses = [
  { id: 5, imgSrc: sleeperBus, price: 950, type: 'SLEEPER' }, 
  { id: 6, imgSrc: sleeperBus, price: 950, type: 'SLEEPER' },
];