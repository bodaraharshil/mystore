import {useState,useEffect} from 'react';
import {parseCookies} from 'nookies';

function userRoles(){
    const {token} = parseCookies();
    const [Users,setUsers] = useState([]);

    useEffect(() => {
        fetchUser()
    }, [])

    const handleRole = async(_id,role) => {
        const res = await fetch('http://localhost:3000/api/users',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify({
                _id,
                role
            })
        });
        const data = await res.json();
        const updateusers = Object.values(Users).map(user =>{
            if(user.role != data.role && user.email == data.email)
            {
                return data;
            }
            else
            {
                return user;
            }
        })
        await setUsers(updateusers)
    }

    const fetchUser = async() => {
        const res = await fetch('http://localhost:3000/api/users',{
            headers:{
                "Authorization":token
            }
        })
        const data = await res.json();
        setUsers(data)
    }
    return(
        <div className="container">
              <h5>User role</h5>
              <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>role</th>
          </tr>
        </thead>
        <tbody>
            {Object.values(Users).map(item => {
                return(
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td style={{cursor:"pointer"}} onClick={()=>handleRole(item._id,item.role)}>{item.role}</td>
                    </tr>
                )
            })}
        </tbody>
      </table>
        </div>
    )
}


export default userRoles;