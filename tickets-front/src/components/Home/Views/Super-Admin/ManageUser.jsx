import { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import "./index.css";
import UserListItem from "./UserList/UserList";

const ManageUser = () => {
  const [loading, setLoading] = useState(false);
  const [trigger,setTrigger]=useState(true);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const token = Cookies.get("jwtToken");
  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("jwtToken");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/s-admin/getAllUsers?search=${searchInput}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    if(trigger){
    fetchUsers();
    setTrigger(false)
    }
  }, [trigger]);

  const changeSearchInput = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  };

  const submitForSearch=(e)=>{
    e.preventDefault()
    setTrigger(true)
  } 
  
  return (
    <div>
      {loading ? (
        <div className="loader-container" data-testid="loader">
          <Rings color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        <>
          <div className="home-heading-container">
            <h1 className="home-heading">Manage User</h1>
            <p className="home-para">Manage Users in your Organisation</p>
          </div>
          <div className="filter-container">
          <form className="user-search-container" onSubmit={submitForSearch}>
            <input type="text" className="user-search-Input" onChange={changeSearchInput} value={searchInput} placeholder="Search Name" />
            <button className="search-btn" type="submit"><FaSearch className="search-icon"/></button>
          </form>
          </div>
          {users.length > 0 ? (
            <ul className="manage-user-container">
              {users.map((user) => (
                <UserListItem key={user.user_id} userItem={user} />
              ))}
            </ul>
          ) : (
            <p>No users found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ManageUser;
