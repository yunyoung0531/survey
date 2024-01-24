import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Form } from 'react-bootstrap';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import { faEquals } from '@fortawesome/free-solid-svg-icons';
import { faT } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';


const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="survey-container">
        <div className="survey-header">
          <h2>제목 없는 설문지</h2>
          <p>설문지 설명</p>
        </div>
      </div>

      <div className='content-container'>
        <div className='survey-container-detail'>
          <div className="survey-question">
            <div className='drag-drop'>
              <FontAwesomeIcon icon={faEllipsis}/>
            </div>
            <div className='question-title-container'>
              <div className="question-title">
                <h4>제목없는 질문</h4>
                <span className='icon-outside'>
                <span className="icon-dropdown-container">
                  <FontAwesomeIcon style={{color: '#5e5e5e', cursor: 'pointer'}} icon={faImage} />
                <Dropdown className='drop-down' style={{marginLeft: '20px'}}>
                  <Dropdown.Toggle id="dropdown-basic">
                  <FontAwesomeIcon style={{color: '#5e5e5e', marginRight: '8px'}} icon={faCircleDot} />
                    객관식 질문ㅤㅤ
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1"><FontAwesomeIcon className='dropdown-icon' icon={faBarsStaggered} />단답형</Dropdown.Item>
                    <Dropdown.Item href="#/action-2"><FontAwesomeIcon className='dropdown-icon' icon={faBarsStaggered} />장문형</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-3"><FontAwesomeIcon className='dropdown-icon' icon={faCircleDot} />객관식 질문</Dropdown.Item>
                    <Dropdown.Item href="#/action-3"><FontAwesomeIcon className='dropdown-icon' icon={faSquareCheck} />체크박스</Dropdown.Item>
                    <Dropdown.Item href="#/action-3"><FontAwesomeIcon className='dropdown-icon' icon={faCircleCheck} />드롭다운 </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </span>
                </span>
              </div>
            </div>
            <div className="question-options">
              <label className="option">
                <input type="radio" name="option" value="option1" />
                <span>옵션 1</span>
                </label>
              <label className="option">
                <input type="radio" name="option" value="option2" />
                <span>옵션 추가 또는 기타 추가</span>
              </label>
            </div>
            <div className='question-tail'>
              <FontAwesomeIcon style={{color: '#5e5e5e'}} icon={faCopy} />
              <FontAwesomeIcon style={{color: '#5e5e5e'}} icon={faTrashCan} />
              <span className='question-tail-option'>
                ㅤ필수
                <Form>
                  <Form.Check 
                    type="switch"
                    id="custom-switch"
                    // label="필수"
                  />
                </Form>
                <FontAwesomeIcon style={{color: '#5e5e5e', cursor: 'pointer'}} icon={faEllipsisVertical}/>
              </span>
            </div>
          </div>
        </div>
          <div className='new-container'>
            <FontAwesomeIcon className='new-container-icon' icon={faCirclePlus} size="lg" />
            <FontAwesomeIcon className='new-container-icon' icon={faFileImport} size="lg" />
            <FontAwesomeIcon className='new-container-icon' icon={faT} size="lg" />
            <FontAwesomeIcon className='new-container-icon' icon={faImage} size="lg" />
            <FontAwesomeIcon className='new-container-icon' icon={faYoutube} size="lg" />
            <FontAwesomeIcon className='new-container-icon' icon={faEquals} size="lg" />
          </div>
        </div>
      </div>
  );
}

export default App;
