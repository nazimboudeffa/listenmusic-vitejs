import { Link } from "react-router-dom";

export default function MobileMenu ({open}) {
    return (
        <div className={`${open? "block" : "hidden"} flex flex-col`}>
            <Link to="/hit-parade">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                Hits
                </span>
            </Link>
            <Link to="/about">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                About
                </span>
            </Link>
            <Link to="/search">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                Search
                </span>
            </Link>
        </div>
    )
}