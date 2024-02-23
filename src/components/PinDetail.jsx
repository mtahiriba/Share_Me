import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { POSTS } from "../Shared/Posts";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  // Add a comment to the pin
  const addComent = () => {
    if (comment) {
      setAddingComment(true);

      setTimeout(() => {
        pinDetail.comments.push({
          id: uuidv4(),
          comment: comment,
          postedBy: {
            id: user.sub,
            userName: user.name,
            image: user.picture,
          },
        });

        setComment("");
        setAddingComment(false);
      }, 2000);
    }
  };

  // Fetch the pin details
  const fetchPinDetails = () => {
    setTimeout(() => {
      let details = POSTS.filter((post) => post._id.toString() === pinId);
      setPinDetail(details[0]);
      if (details[0]) {
        let similiar = POSTS.filter(
          (post) =>
            post.catagory === details[0].catagory &&
            post._id.toString() !== pinId
        );
        setPins(similiar);
      }
    }, 1000);
  };

  // Fetch the pin details on mount
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner message="Loading pin..." />;

  return (
    <>
      <div
        className="flex xl-flex-row flex-col m-auto pb-3 bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial ">
          <img
            src={pinDetail.imageUrl}
            alt="user-post"
            className="rounded-t-3xl rounded-b-lg w-full h-full object-cover"
          />
        </div>
        <div className="w-full flex-1 xl:min-w-620 pl-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail.imageUrl}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover-shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a
              href={pinDetail.destination}
              target="_blank"
              rel="noreferrer"
              className="pr-3"
            >
              {pinDetail.destination.length > 30
                ? pinDetail.destination.slice(8, 30)
                : pinDetail.destination.slice(8)}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className="mt-3">{pinDetail.about}</p>
          </div>
          <Link
            to={`user-profile/${pinDetail.postedBy.id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={pinDetail.postedBy.image}
              alt="user-profile"
            />
            <p className="font-semibold capitalize p-2">
              {pinDetail.postedBy.userName}
            </p>
          </Link>
          {(pinDetail?.comments.length > 0 || user) && (
            <h2 className="mt-5 text-2xl">Comments</h2>
          )}
          
          <div className="max-h-370 ovderflow-y-auto">
            {pinDetail?.comments?.map((comment, i) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={i}
              >
                <img
                  src={comment.postedBy.image}
                  alt="user-profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>

          {user && (
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`user-profile/${pinDetail.postedBy.id}`}>
                <img
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={user.picture}
                  alt="user-profile"
                />
              </Link>
              <input
                className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold text-base outline-none"
                onClick={addComent}
              >
                {addingComment ? "Posting the comment..." : "Post"}
              </button>
            </div>
          )}
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2x mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout pins={pins} user={user} />
        </>
      ) : (
        <div className="mt-8">
          <Spinner message="Loading more pins..." />
        </div>
      )}
    </>
  );
};

export default PinDetail;
