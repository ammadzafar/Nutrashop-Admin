import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import Uploader from '../../../components/ImageUploader/Uploader';
import axios from 'axios';
import "./modalstyle.css";
const BannerMobile = (props) => {
  let id = props.bannerMob.id;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [upImg , setUpImg]=useState('');
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const saveImage = (image) => {
    console.log(image)
    setUpImg(image)
};
const showUpdateMobile=useEffect(()=>{
      axios
      .put('api/banners/addMobileImage', id)
      .then((response) => {
       console.log(response)
    })
    .catch((error) => {
        console.log(error);
    });
    return()=>{
      saveImage("")
    }
  },[])
  console.log(props)
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible}  onCancel={handleCancel}>
      <div className='modal-main'>
      <div className='modal-image'>
          <img src={process.env.REACT_APP_BASE_IMAGE_PATH + props.bannerMob.image} alt="desktop banner"/>
        </div>
        <div className='modal-uploader'>
          <Uploader saveImage={saveImage} />
          <Button type="primary" onClick={showUpdateMobile}>
              Submit
          </Button>
        </div>
        </div>
      </Modal>
    </>
  );
};
export default BannerMobile;