import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GALLERY_ITEMS } from "../data";
import { ArrowLeft } from "lucide-react";
import GalleryCanvas from "../sections/GalleryCanvas";

export default function GalleryPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Gallery — Impact Vision";
        return () => {
            document.title = "Impact Vision";
        };
    }, []);

    return (
        <div className="min-h-screen bg-white px-4 md:px-8 py-6">
            {/* Back Button */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#6a7a9a] hover:text-navy font-sans text-[14px] font-medium transition-colors duration-200 mb-6 group"
            >
                <ArrowLeft
                    size={16}
                    className="transition-transform duration-200 group-hover:-translate-x-1"
                />
                Back to Home
            </Link>

            {/* Gallery Canvas — Full Width & Height */}
            <GalleryCanvas items={GALLERY_ITEMS} fullPage />
        </div>
    );
}
