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
import { createPost } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import CommentModal from "../../Comment/CommentModal";
import SpinnerCard from "../../Spinner/Spinner";



const CreatePostModal = ({ onOpen, isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isImageUploaded, setIsImageUploaded]=useState("");
  
  const dispatch=useDispatch();
  const token=localStorage.getItem("token");
  const {user}=useSelector(store=>store)

  const [postData, setPostData] = useState({ image: '', caption: '',location:"" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    console.log("files", file);
  }, [file]);

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile.type.startsWith("image/") ||
      droppedFile.type.startsWith("video/")
    ) {
      setFile(droppedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  }

  function handleDragLeave(event) {
    setIsDragOver(false);
  }

  const handleOnChange = async(e) => {
    console.log(e.target.value);

    const file = e.target.files[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      setFile(file);
      setIsImageUploaded("uploading")
      const url = await uploadToCloudinary(file);
      setPostData((prevValues)=>({...prevValues, image:url}));
      setIsImageUploaded("uploaded");
    } else {
      setFile(null);
      alert("Please select an image/video file.");
    }
  };

  const handleSubmit = async () => {
    const data={
      jwt:token,
      data:postData,
    }
    if(token && postData.image){
      dispatch(createPost(data));
      handleClose()
    }
    
    console.log("data --- ", data);
  };
function handleClose(){
          onClose();
          setFile(null);
          setIsDragOver(false);
          setPostData({ image: '', caption: '',location:"" })
          setIsImageUploaded("")
}
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
              Share
            </Button>
          </div>

          <hr className="hrLine" />

          <ModalBody>
         
            <div className="modalBodyBox flex h-[70vh] justify-between">
              <div className="w-[50%] flex flex-col justify-center items-center">
                {isImageUploaded==="" && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`drag-drop h-full`}
                  >
                    <div className="flex justify-center flex-col items-center">
                      <FaPhotoVideo
                        className={`text-3xl ${
                          isDragOver ? "text-blue-800" : ""
                        }`}
                      />
                      <p>Drag photos or videos here </p>
                    </div>

                    <label for="file-upload" className="custom-file-upload">
                      Select from computer
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*, video/*"
                      multiple
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                )}

                {isImageUploaded==="uploading" && <SpinnerCard/>}

                {isImageUploaded==="uploaded" && (
                  <img
                    className=""
                    src={postData.image}
                    alt="dropped-img"
                  />
                )}
              </div>
              <div className="w-[1px] border h-full"></div>
              <div className="w-[50%]">
                <div className="flex items-center px-2">
                  <img
                    className="w-7 h-7 rounded-full"
                    src={user?.reqUser?.image || ""}
                    alt=""
                  />{" "}
                  <p className="font-semibold ml-4">{user?.reqUser?.username}</p>
                </div>
                <div className="px-2">
                  <textarea
                    className="captionInput"
                    placeholder="Write a caption..."
                    name="caption"
                    rows="8"

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

export default CreatePostModal;
