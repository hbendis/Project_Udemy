import React, { useEffect, useState,useContext } from "react";
import { UserContext } from '../../App'

const Profile = () => {
  const [myPics, setPics] = useState([])
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setPics(result.mypost)


      })


  }, [])
  return (
    <div className="profilePage">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "10px auto",
          borderBottom: "1px solid #c5c4c4",
        }}
      >
        <div>
          <img
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            src="https://images.unsplash.com/photo-1590587023193-a7d02db44945?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div>
          <div>
      <h4>{state?state.name:"loading"}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <div>40 Posts</div>
              <div>40 Followers</div>
              <div>40 Following</div>
            </div>
          </div>
        </div>

      </div>
      <div className="gallery">

        {
          myPics.map(item => {
            return (
              <img key={item._id} className="items" src={item.photo} alt={item.title} />
            )

          })

        }
      </div>
    </div>
  );
};
export default Profile;
