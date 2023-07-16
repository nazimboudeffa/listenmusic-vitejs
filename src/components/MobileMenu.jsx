import { Link } from "react-router-dom";

export default function MobileMenu ({open}) {
    return (
        <div className={`${open? "block" : "hidden"} flex flex-col`}>
            <Link href="/hit-parade">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                Hits
                </span>
            </Link>
            <Link href="/about">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                About
                </span>
            </Link>
        </div>
    )
}