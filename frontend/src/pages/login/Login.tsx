import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { AuthContext } from '../../context/authContext';

type LoginInputType = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);

  const [loginInput, setLoginInput] = useState<LoginInputType>({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(loginInput);
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('Произошла ошибка, попробуйте снова!');
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>RogaleV</h1>
          <p>Welcome in our world! Join by other billion users!</p>
          <span>Don't have account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="password" placeholder="Paswword" name="password" onChange={handleChange} />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
