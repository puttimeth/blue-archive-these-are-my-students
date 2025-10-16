import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

export const GaTracker = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (id) {
      ReactGA.initialize(id);
      setInit(true);
    }
  }, []);

  useEffect(() => {
    if (init) {
      ReactGA.event("page_view");
    }
  }, [init]);

  return <div />;
};
