import React from "react";
import Register from "./Register";

const Main = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="flex w-11/12 max-w- rounded-lg overflow-hidden"
                style={{ backgroundImage: `url("/assets/background.png")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* Left Section */}
                <div className="w-1/2 p-8 flex flex-col justify-center items-center ">
                    <img src="/assets/logo.png" className="start-0 left-0" />
                    <img src="/assets/register.JPEG" alt="Registration" className="w-full max-w-xl" />
                    <p className="mt-6 text-3xl text-center text-gray-600 font-medium">
                        Connect, Collaborate, and Control –
                        <span className="text-orange-600 font-semibold">Society  <br />Management Simplified</span>
                    </p>
                </div>
                {/* Right Section */}
                <div className="w-1/2 p-12">
                    <Register />
                </div>
            </div>
        </div>
    );
};

export default Main;