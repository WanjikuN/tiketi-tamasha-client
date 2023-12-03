import {render ,screen,cleanup}from '@testing-library/react'; 
import Authentication from '../Authentication';



test ('should render Authentication component',()=>{
    render(<Authentication/>);
    const AuthenticationElement =screen.getByTestId('Authentication');
    expect(AuthenticationElement).toBeInTheDocument();
})
// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import Authentication from '../Authentication';


// jest.mock('notistack', () => ({
//   ...jest.requireActual('notistack'),
//   useSnackbar: () => ({
//     enqueueSnackbar: jest.fn(),
//   }),
// }));

// // Mock the react-router-dom module
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));

// describe('Authentication component', () => {
//   it('renders Login form by default', () => {
//     render(<Authentication isLoggedIn={false} setIsLoggedIn={() => {}} />);
    
//     expect(screen.getByText('Login')).toBeInTheDocument();
//     expect(screen.getByText('Sign Up')).toBeInTheDocument();
//   });

//   it('renders Sign Up form when isLoggedIn is false', () => {
//     render(<Authentication isLoggedIn={true} setIsLoggedIn={() => {}} />);
    
//     expect(screen.getByText('Sign Up')).toBeInTheDocument();
//     expect(screen.getByText('Login')).toBeInTheDocument();
//   });

  
// });
