import { Link } from "react-router-dom";

const ButtonServiceRedirect = (props) => {

    const { textButton, redirectTo } = props;
    return (
        <Link
            to={redirectTo}
            className="inline-block items-center w-full px-6 py-3 mb-3 text-lg border-2 border-gray-200 rounded-full sm:mb-0 hover:bg-[#ffff00]  sm:w-auto text-gray-400 duration-200 hover:bg-opacity-50 hover:underline hover:border-gray-400 hover:text-gray-500 bg-gray-100"
        >
            <div className="flex items-center font-semibold uppercase">
                {textButton}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="inline w-6 h-6 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </div>
        </Link>
    );

}

export default ButtonServiceRedirect;