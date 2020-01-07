import React, { useState, useEffect } from 'react';
import { instance } from '../../constants';
import Loading from '../../common/Loading/Loading';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';

import { HashRouter as Router, Route, withRouter } from "react-router-dom";
import moment from "moment";

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Modal from '../../common/Modal/Modal';
import Logo from '../../common/Logo/Logo';
import Text, {ErrorText, WarningText, InfoText} from '../../common/Text/Text';

const Home = ({history}) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');

  let content;

  if (error) {
    content = <div>{error}</div>;
  } else if (loading) {
    content = <Loading />;
  } else {
    content = (
      <React.Fragment>
        Built in components in Logo:

        <div styleName="demo">
          <Text bold>Buttons</Text>
          <Button>Primary</Button>
          <Space/>
          <Button secondary>Secondary</Button>

          <Space/>

          <Text bold>Text</Text>
          <ErrorText>Error</ErrorText>
          <WarningText>Error</WarningText>
          <InfoText>Error</InfoText>

          <Space/>

          <Text bold>Modal</Text>
          <Button onClick={() => {setModalOpen(true)}}>Show demo modal</Button>
          {modalOpen && <Modal title="Demo Modal" onClose={() => setModalOpen(false)}>Hello I am a modal</Modal>}  
        
          <Space/>

          <Text bold>Logo</Text>
          <Logo />
          
          <Space/>

          <Text bold>Loading</Text>
          <Loading tiny/>
          
          <Space/>

          <Text bold>Input</Text>
          <Input value={inputVal} error={inputVal !== '' ? 'Fake error' : ''} onChange={(v) => setInputVal(v)} placeholder="Demo placeholder"/>
        

        </div>
      </React.Fragment>
    );
  }

  return (
    <div styleName="container">
      {content}
    </div>
  );
}

// Remove this, it was done for ease of demo only
const Space = () => {
  return <div style={{height: '20px'}}/>;
}

export default withRouter(CSSModules(Home, styles, {allowMultiple: true}));
