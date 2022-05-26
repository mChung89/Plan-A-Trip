import Login from './Login'
import CreateUserBox from './CreateUserBox'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AuthPage({ setUser, user }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [toggleLogin, setToggle] = useState(true);

  return (
  <div id="login-page">
      {toggleLogin ?<Login setUser={setUser} user={user} setToggle={setToggle} navigate={navigate} errors={errors} setErrors={setErrors}/> : <CreateUserBox setUser={setUser} user={user} setToggle={setToggle} navigate={navigate} errors={errors} setErrors={setErrors}/>}
  </div>
  )
}

export default AuthPage;
