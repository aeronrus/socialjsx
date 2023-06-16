import { Link } from 'react-router-dom';
import './register.scss';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type RegisterDataType = {
  username: string;
  email: string;
  password: string;
  name: string;
};
const Register: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterDataType>({
    username: '',
    email: '',
    password: '',
    name: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await axios.post('http://localhost:9999/backend/auth/register', registerData);
      //navigate('/login');
    } catch (error) {
      console.log(error);
      alert('Не удалось зарегистрироваться, попробуйте снова');
    }
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>RogaleV</h1>
          <p>Welcome in our world! Join by other billion users!</p>
          <span>Do you have account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Your name" name="name" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="password" placeholder="Paswword" name="password" onChange={handleChange} />
            <button onClick={handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
