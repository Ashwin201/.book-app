//@ts-nocheck
import { BsInstagram, BsGithub } from "react-icons/bs";
import { FaLinkedin } from 'react-icons/fa'
import Link from "next/link";

const Footer = () => {
    return (
        <div>
            <header className=" flex   justify-center text-center md:justify-between  flex-col md:flex-row font-medium pb-3 lg:pb-0 pt-6 lg:pt-0  ">
                <div className="social flex justify-center align-middle  cursor-pointer mb-2 sm:mb-0 items-center text-black dark:text-gray-200 ">
                    <Link
                        aria-label="Instagram"
                        href="https://instagram.com/ashwin.203?igshid=YmMyMTA2M2Y="
                        className="mr-3"
                        target="_blank"
                    >
                        <BsInstagram size={24} />
                    </Link>
                    <Link
                        href="https://github.com/Ashwin201"
                        aria-label="Github"
                        className="mr-3"
                        target="_blank"
                    >
                        <BsGithub size={26} />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/ashmin-sharma-6a4867257"
                        className="mr-3"
                        aria-label="Linkedin"
                        target="_blank"
                    >
                        <FaLinkedin size={26} />
                    </Link>
                </div>

                <div className="text-black dark:text-gray-200">
                    @2023
                    <span className=" font-semibold "> Ashmin Sharma. </span>
                    <span className=" block sm:inline mt-1 sm:mt-0">
                        All rights reserved.
                    </span>
                </div>
            </header>
        </div>
    );
};

export default Footer;
