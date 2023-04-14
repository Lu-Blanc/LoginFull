import React, {useState, useEffect} from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [getusers, setGetUsers] = useState([]);
  const navigate = useNavigate();


  useEffect(()=>{
    refresToken();
  },[]);

  const refresToken = async() =>{
    try {
      const response = await axios.get('http://localhost:5000/login/token');
      setToken(response.data.accessToken);
      const decode = jwtDecode(response.data.accessToken)
      setUsername(decode.username);
    } catch (error) {
      if(error.response){
        navigate('/login')
      }
    }
  }

  const getUsers = async() => {
    try {
      const response = await axios.get('http://localhost:5000/login/get',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setGetUsers(response.data);
    } catch (error) {
      
    }
  }

  return (
    <div className='bg-slate-500 flex justify-center items-center h-screen'>
        <h1 className='text-[100px] absolute inset-x-0 top-10 '>Welcome Back : {username}</h1>
        <button onClick={getUsers} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">getUsers</button>
        <table className='border-separate border-spacing-2 border border-slate-500'>
          <thead>
            <tr>
              <th className='border border-slate-600'>No</th>
              <th className='border border-slate-600'>Username</th>
              <th className='border border-slate-600'>Email</th>
            </tr>
          </thead>
          <tbody>
            {getusers.map((user, index)=>(
              <tr key={user.id}>
              <td className='border border-slate-600'>{index + 1}</td>
              <td className='border border-slate-600'>{user.username}</td>
              <td className='border border-slate-600'>{user.email}</td>
            </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Dashboard