"use client";
import React from "react";
import { BsBookHalf, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import login from "../public/login.webp";
import { signIn, useSession } from "next-auth/react";


const SignInpage = () => {
    const { data: session } = useSession();

    return (
        <section className=" my-6 lg:my-10">
            <div className=" grid grid-cols-12 place-items-center gap-6 ">
                <div
                    className=" col-span-12 lg:col-span-6"

                >
                    <Image
                        src={login}
                        className="w-[120%] h-auto"
                        alt="Logo"
                        priority={true}
                        loading="eager"
                    />
                </div>

                <main className="flex  text-center lg:text-start   justify-center col-span-12  lg:col-span-6 ">
                    <div className="">


                        <h1 className=" flex  justify-center lg:justify-start gap-2 mt-6 font-serif font-bold  text-[22px] dark:text-gray-200 text-black "
                        >
                            Signin to &nbsp; <BsBookHalf size={30} /> .bookk
                        </h1>

                        <p
                            className="mt-4 leading-relaxed text-gray-700 dark:text-gray-400 font-medium"
                        >
                            Access a comprehensive range of features by signing in, including
                            the ability to explore all blogs, create your own blogs, edit and delete them as well. Unlock additional functionalities for an
                            enhanced user experience.
                        </p>

                        <div
                            className="flex flex-col items-center   lg:items-start   gap-4  my-6"
                        >
                            <div
                                onClick={() => {
                                    signIn("google");
                                }}
                                className=" flex gap-4 justify-center items-center sm:w-[300px] py-2 px-10 border-2 border-gray-400 rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-200 transition-all duration-500"
                            >
                                <FcGoogle size={30} />{" "}
                                <span className="font-medium text-black ">
                                    Sign In with Google
                                </span>
                            </div>
                            <div
                                onClick={() => {
                                    signIn("github");
                                }}
                                className="  flex gap-4 justify-center items-center text-white sm:w-[300px] py-2 px-10 border-2 border-gray-800 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-900 transition-all duration-500"
                            >
                                <BsGithub size={30} />{" "}
                                <span className="font-medium  ">Sign In with Github</span>
                            </div>
                        </div>

                        <div
                            className="col-span-6"
                        >
                            <p className="text-sm text-gray-700 dark:text-gray-400 font-medium">
                                By creating an account, you agree to our
                                <a
                                    href="#"
                                    className="text-gray-800 dark:text-gray-300 underline"
                                >
                                    terms and conditions{" "}
                                </a>
                                and
                                <a
                                    href="#"
                                    className="text-gray-800 dark:text-gray-300 underline"
                                >
                                    privacy policy
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default SignInpage;
