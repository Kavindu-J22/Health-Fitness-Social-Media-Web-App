import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

import React, { useEffect, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { GoLocation } from "react-icons/go";
import { GrEmoji } from "react-icons/gr";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createPost, findPostByIdAction } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import CommentModal from "../../Comment/CommentModal";
import SpinnerCard from "../../Spinner/Spinner";
import { useParams } from "react-router-dom";
import { editPOst } from "../../../Redux/Post/Action";

const EditPostModal = ({ onOpen, isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { post, comments, user } = useSelector((store) => store);
 

  const [postData, setPostData] = useState({
    image: "",
    caption: "",
    location: "",
    id:null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevValues) => ({ ...prevValues, [name]: value }));
  };

 useEffect(()=>{

    if(post.singlePost){
        for(let key in post.singlePost){
            setPostData((prevValues) => ({ ...prevValues, [key]: post.singlePost[key] }));
        }
    }

 },[post.singlePost])

  const handleSubmit = async () => {
    const data = {
      jwt: token,
      data: postData,
    };
    if (token && postData.image) {
      dispatch(editPOst(data));
      handleClose();
    }

    console.log("data --- ", data);
  };
  function handleClose() {
    onClose();
    setFile(null);

    setPostData({ image: "", caption: "", location: "" });
  }
  useEffect(() => {
    if (postId) {
      dispatch(
        findPostByIdAction({
          jwt: token,
          postId,
        })
      );
    }
  }, [postId]);

  return (
    <div>
      <Modal
        size={"4xl"}
        className=""
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent fontSize={"sm"}>
          <div className="flex justify-between py-1 px-10 items-center">
            <p>Create New Post</p>
            <Button
              onClick={handleSubmit}
              className="inline-flex"
              colorScheme="blue"
              size={"sm"}
              variant="ghost"
            >
              Update
            </Button>
          </div>

          <hr className="hrLine" />

          <ModalBody>
            <div className="modalBodyBox flex h-[70vh] justify-between">
              <div className="w-[50%] flex flex-col justify-center items-center">
                <img className="" src={post.singlePost?.image} alt="dropped-img" />
              </div>
              <div className="w-[1px] border h-full"></div>
              <div className="w-[50%]">
                <div className="flex items-center px-2">
                  <img
                    className="w-7 h-7 rounded-full"
                    src={
                      user?.reqUser?.image ||
                      "https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"
                    }
                    alt=""
                  />{" "}
                  <p className="font-semibold ml-4">
                    {user?.reqUser?.username}
                  </p>
                </div>
                <div className="px-2">
                  <textarea
                    className="captionInput"
                    placeholder="Write a caption..."
                    name="caption"
                    rows="8"
                    value={postData.caption}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between px-2">
                  <GrEmoji />
                  <p className="opacity-70">{postData.caption?.length}/2,200</p>
                </div>
                <hr />
                <div className="p-2 flex justify-between items-center">
                  <input
                    className="locationInput"
                    type="text"
                    placeholder="Add Location"
                    name="location"
                    onChange={handleInputChange}
                    value={postData.location}
                  />
                  <GoLocation />
                </div>
                <hr />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditPostModal;
