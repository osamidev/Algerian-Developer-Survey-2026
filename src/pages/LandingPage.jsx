import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  });
  return <div>hello this is Landing page</div>;
}

export default LandingPage;
