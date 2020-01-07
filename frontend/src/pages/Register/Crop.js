import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_URL, instance } from '../../constants';

import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import Input from '../../common/Input/Input';
import Logo from '../../common/Logo/Logo';
import Loading from '../../common/Loading/Loading';
import Button from '../../common/Button/Button';
import { HashRouter as Router, Route, withRouter } from "react-router-dom";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Modal from '../../common/Modal/Modal';


let usernameTimeout, emailTimeout;

const Crop = ({photo, setCropped, setPhoto, close}) => {

  const cropper = useRef(null);
  const fileEl = useRef(null);
  const [image, setImage] = useState(photo);
  const [file, setFile] = useState('');

  const handleFileChosen = (file) => {
    const reader = new FileReader();

    reader.onload = function(e) {
      setImage(e.target.result);
    }

    reader.readAsDataURL(file);
    
    setFile(file);
  }

  const onImageLoaded = image => {

    // return false;
  };

  const checkCrop = crop => {
    if (crop.width < 50) {
      return;
    }

  }

  const _crop = () => {
    // setCropped();
    // setCropped(cropper.current.getCroppedCanvas().toDataURL());
  }

  const closeCropper = () => {
    if (image) {
      setPhoto(image)
      setCropped(cropper.current.getCroppedCanvas().toDataURL());
    }
    close();
  }

  return (
    <Modal onClose={closeCropper} title="Set Profile Photo">
      <div styleName="crop-container">
        {image && <Cropper
          ref={cropper}
          src={image}
          style={{height: 350, width: '100%'}}
          // Cropper.js options
          minCropBoxWidth={50}
          aspectRatio={1}
          guides={false}
          zoomable={false}
          crop={_crop}
          viewMode={2}
        />
        }

        {image && (
          <div styleName="button-container">
            <Button onClick={closeCropper}>
              Save!
            </Button>
          </div>
        )}
        
        <div styleName="button-container">
          <Button secondary onClick={() => fileEl.current.click()}>
            Choose profile photo
          </Button>
        </div>

        <input
          type='file'
          ref={fileEl}
          hidden
          accept="image/*"
          capture="camera"
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />

      
      </div>
    </Modal>
  );
}

export default withRouter(CSSModules(Crop, styles));
