import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import { faEquals } from '@fortawesome/free-solid-svg-icons';
import { faT } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import TitleAndDescription from './TitleAndDescription';
import QuestionTypeDropdown from './QuestionTypeDropdown';

const App: React.FC = () => {
  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('제목 없는 설문지');
  const [description, setDescription] = useState<string>('설문지 설명');

  const handleTitleClick = () => {
    setIsTitleEditing(true);
  };
  const handleDescriptionClick = () => {
    setIsDescriptionEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  // 사용자가 입력 필드(input field) 외부를 클릭했을 때 호출되는 이벤트 핸들러
  const handleTitleBlur = () => {
    setIsTitleEditing(false);
  };

  const handleDescriptionBlur = () => {
    setIsDescriptionEditing(false);
  };


  const [questionType, setQuestionType] = useState<string>('객관식 질문');
  // 질문 유형 변경 핸들러
  const handleQuestionTypeChange = (type: string) => {
    setQuestionType(type);
  };

  return (
    <div className="app-container">
      <div className="survey-container">
        <div className="survey-header" style={{ position: 'relative' }}>
        <TitleAndDescription
            isEditing={isTitleEditing}
            value={title}
            onBlur={handleTitleBlur}
            onChange={handleTitleChange}
            onClick={handleTitleClick}
            className='title-editing-input'
            type='title'
          />
          <TitleAndDescription
            isEditing={isDescriptionEditing}
            value={description}
            onBlur={handleDescriptionBlur}
            onChange={handleDescriptionChange}
            onClick={handleDescriptionClick}
            className='description-editing-input'
            type='description'
          />
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
                  <QuestionTypeDropdown
                    selectedType={questionType}
                    onSelectType={handleQuestionTypeChange}
                  />
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
