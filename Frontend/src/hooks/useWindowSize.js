import { useState, useEffect } from "react";

function useWindowSize() {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(getWindowSize());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}

const getWindowSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
});

export default useWindowSize;