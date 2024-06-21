import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import "./singlePage.scss";
// import { singlePostData, userData } from "../../lib/dummydata";
import { redirect, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
const SinglePage = () => {
  const post = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(post.isSaved);
  const handleSave = async () => {
    setSaved((prev) => !prev);
    if (!currentUser) {
      redirect("/login");
    }
    try {
      await apiRequest.post(`/users/save`, {
        postId: post.id,
      });
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    }
  };
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="./pin.png" alt="pin" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="user" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.description),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner pays utilities</p>
                ) : (
                  <p>Renter pays utilities</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet ? (
                  <p>Pet Allowed</p>
                ) : (
                  <p>Pet Not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" />
              <div className="featureText">
                <span>Income Policy </span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="size" />
              <span>{post.postDetail.size}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="size" />
              <span>{post.bedroom}</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="size" />
              <span>{post.bathroom}</span>
            </div>
          </div>
          <p className="title"> Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="size" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="size" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="size" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="chat" /> Send a Message
            </button>
            <button onClick={handleSave} style={{
              backgroundColor: saved ? "#fece51" : "#fff",
            }} >
              <img src="/save.png" alt="save" /> {saved ? "Place is Saved" : "Save The Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
