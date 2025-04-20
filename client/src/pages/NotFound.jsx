import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const msg = `The page you're looking for doesn't exist.`;

  return (
    <div className="box">
      <h1>404 – Not Found</h1>
      <p>{msg}</p>
      <button onClick={() => navigate("/")}>Return Home</button>
    </div>
  );
};

export default NotFound;
