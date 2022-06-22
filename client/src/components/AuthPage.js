import Login from "./Login";
import CreateUserBox from "./CreateUserBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage({ setUser, user, setTrip, setTripSelector }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [toggleLogin, setToggle] = useState(true);

  return (
    <>
      {toggleLogin ? (
        <Login
          setTripSelector={setTripSelector} 
          setUser={setUser}
          setTrip={setTrip}
          user={user}
          setToggle={setToggle}
          navigate={navigate}
          errors={errors}
          setErrors={setErrors}
        />
      ) : (
        <CreateUserBox
          setTripSelector={setTripSelector} 
          setUser={setUser}
          user={user}
          setToggle={setToggle}
          navigate={navigate}
          errors={errors}
          setErrors={setErrors}
        />
      )}
    </>
  );
}

export default AuthPage;
