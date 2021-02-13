import {useState,useEffect} from 'react';
import {parseCookies} from 'nookies';

function userRoles(){
    const {token} = parseCookies();
    const [Users,setUsers] = useState([]);

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async() => {
        const res = await fetch('http://localhost:3000/api/users',{
            headers:{
                "Authorization":token
            }
        })
        const data = await res.json();
        setUsers(data)
        console.log("{}{}{}{}{}123456786",data)
    }
    return(
        <div className="container">
              <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>role</th>
          </tr>
        </thead>
        <tbody>
            {console.log("uses",Users)}
            {Object.values(Users).map(item => {
                return(
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                    </tr>
                )
            })}
        </tbody>
      </table>
        </div>
    )
}


export default userRoles;