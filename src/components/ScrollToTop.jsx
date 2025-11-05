import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Call this component in App.jsx to work throughout the project
function ScrollToTop() {
    // Get the current pathname from the router
    const { pathname } = useLocation();

    useEffect(() => {
        // Whenever the route changes, scroll the window to the top
        window.scrollTo(0, 0);
    }, [pathname]); // Dependency: triggers effect when pathname changes
    return null;
}

export default ScrollToTop;