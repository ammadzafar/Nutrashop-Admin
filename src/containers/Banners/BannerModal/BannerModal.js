import React, { useEffect,useState } from 'react';
import { Modal, Button } from 'antd';
import "./modalstyle.css";
import axios from 'axios';
import Uploader from '../../../components/ImageUploader/Uploader';
const BannerModal = (props) => {
  let id = props.bannerid;
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
const showUpdateDesktop=useEffect(()=>{
  axios
  .put("api/banners/addBannerimage", id)
  .then((response) => {
   console.log(response)
})
.catch((error) => {
    console.log(error);
});
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
          <img src={process.env.REACT_APP_BASE_IMAGE_PATH + props.bannerimg.image} alt="desktop banner"/>
        </div>
        <div className='modal-uploader'>
          <Uploader saveImage={saveImage}/>
          <Button type="primary" onClick={showUpdateDesktop}>
        Submit
      </Button>
        </div>
        </div>
      </Modal>
    </>
  );
};
export default BannerModal;
