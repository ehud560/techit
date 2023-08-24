import { FunctionComponent, useEffect, useState } from "react";
import { getUserDetails } from "../services/usersService";
import User from "../interfaces/User";

interface ProfileProps { }

const Profile: FunctionComponent<ProfileProps> = () => {
  let [userInfo, setUserInfo] = useState<User>();
  useEffect(() => {
    getUserDetails()
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="card">
        <div className="card-title">{userInfo?.name}</div>
        <div className="card-body">
          <div className="card-text">{userInfo?.email}</div>
          {userInfo?.isAdmin ? <p>This user is admin</p> : <p>Regular user</p>}
        </div>
      </div>
    </>
  );
};

export default Profile;
