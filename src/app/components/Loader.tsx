// app/components/Loader.tsx
"use client";

import Lottie from "lottie-react";
import loaderAnim from "../../../public/lottie/loader.json";

type Props = {
    /** diameter in px */
    size?: number;
    /** true = cover the whole viewport */
    fullScreen?: boolean;
};

export default function Loader({ size = 120, fullScreen = false }: Props) {
    return (
        <div
            className={
                fullScreen
                    ? "fixed inset-0 z-50 flex items-center justify-center bg-white" // overlay, centred
                    : "flex items-center justify-center"
            }
        >
            <Lottie
                animationData={loaderAnim}
                loop
                autoplay
                style={{ width: size, height: size }}
            />
        </div>
    );
}
