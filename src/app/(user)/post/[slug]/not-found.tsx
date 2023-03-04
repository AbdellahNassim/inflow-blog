import Link from "next/link";

export default function NotFound() {
    return (
        <div className="py-20 text-center">
            <h2 className="text-7xl font-bold text-[#E7E247]">404 Not Found</h2>
            <p>Could not find requested page <Link href="/" className="font-bold">Go home</Link></p>
        </div>
    );
}