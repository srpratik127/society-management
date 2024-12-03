import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='text-center m-[50px]'>
      <img src="/assets/error-page.gif" alt="error-page" className='mx-auto'/>
      <h1 className='text-2xl mb-5'>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className='hover:bg-slate-100 mt-4 inline-block p-3 rounded-md'>Go to Home</Link>
    </div>
  );
};

export default ErrorPage;
