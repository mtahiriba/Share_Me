import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const Pin = ({ pin, user }) => {

  const [postHover, setPostHover] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [saved, setSaved] = useState(pin.save.length);
  const navigate = useNavigate();

  useEffect(() => {
    if (user)
      setAlreadySaved(!!pin.save.filter((item) => item.id === user?.sub)?.length);
  }, [saved, user, pin.save]);

  const savePin = (id) => {
    if (!alreadySaved) {
      pin.save.push({
        id: user.sub,
        userName: user.name,
        image: user.picture,
      });
      setSaved(pin.save.length);
    }
  };

  const deletePin = (id) => {
    //delete post
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHover(true)}
        onMouseLeave={() => setPostHover(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img className="rounded-lg" alt="user-post" src={pin.imageUrl} />
        {postHover && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between ">
              <div className="flex gap-2">
                <a
                  href={`${pin.imageUrl}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover-shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {user && (
                <>
                  {alreadySaved ? (
                    <button
                      type="button"
                      className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover-shadow-md outlined-none"
                    >
                      {saved} saved
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover-shadow-md outlined-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        savePin(pin._id);
                      }}
                    >
                      save
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 w-full">
              {pin.destination && (
                <a
                  href={pin.destination}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover-shadow-md outline-none"
                >
                  <BsFillArrowUpRightCircleFill />
                  {pin.destination.length > 20
                    ? pin.destination.slice(8, 20)
                    : pin.destination.slice(8)}
                </a>
              )}
              {user && (
                <>
                  {pin.postedBy?.id === user.sub && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePin(pin._id);
                      }}
                      className="bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover-shadow-md outlined-none"
                    >
                      <AiTwotoneDelete />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {user && (
        <Link
          to={`user-profile/${user.sub}`}
          className="flex-gap-2 flex items-center mt-2"
        >
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={pin.postedBy.image}
            alt="user-profile"
          />
          <p className="font-semibold capitalize p-2">
            {pin.postedBy.userName}
          </p>
        </Link>
      )}
    </div>
  );
};

export default Pin;
