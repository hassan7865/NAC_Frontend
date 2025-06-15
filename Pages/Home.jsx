import { useEffect } from "react";
import Overview from "../Components/Overview";
import { Req } from "../src/Url";

export default function Home() {
  useEffect(() => {
    const track = async () => {
      const payload = {
        referrer: document.referrer || null,
        location: window.location.href,
        userAgent: navigator.userAgent,
      };

      try {
        await Req.post("/track-visit", payload);
      } catch (err) {
        console.error("Tracking failed", err);
      }
    };

    track();
  }, []);

  return (
    <div>
      <Overview />
    </div>
  );
}
