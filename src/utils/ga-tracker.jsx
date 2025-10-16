import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

export const GaTracker = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (id) {
      console.log("GA measurement ID is found");
      ReactGA.initialize(id);
      console.log("GA initialized successfully.");
      setInit(true);
    } else {
      console.log("GA measurement ID is not found");
    }
  }, []);

  useEffect(() => {
    if (init) {
      ReactGA.event("page_view");
    }
  }, [init]);

  return <div />;
};
