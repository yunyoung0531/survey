  import React, { useState } from 'react';
  import './App.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faImage } from '@fortawesome/free-regular-svg-icons'
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
  import { faFileImport } from '@fortawesome/free-solid-svg-icons';
  import { faEquals } from '@fortawesome/free-solid-svg-icons';
  import { faT } from '@fortawesome/free-solid-svg-icons';
  import { faYoutube } from '@fortawesome/free-brands-svg-icons';
  import TitleAndDescription from './TitleAndDescription';
  import QuestionTypeDropdown from './QuestionTypeDropdown';
  import Question from './Question';


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

    const [questions, setQuestions] = useState<string[]>(['제목없는 질문']);

    // 새 질문을 추가하는 함수
    const addNewQuestion = () => {
      setQuestions(questions.concat(`새로운 질문 ${questions.length + 1}`));
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
        

        <div className='content-container' >
          
          <div className='sur-test'>
            {questions.map((questionTitle, index) => (
              <div className='survey-container-detail' key={index}>
              <Question questionTitle={questionTitle}/>
              </div>
            ))}
          </div>

            <div className='new-container'>
              <FontAwesomeIcon
                className='new-container-icon'
                icon={faCirclePlus}
                size="lg"
                onClick={addNewQuestion} // 버튼 클릭 시 addNewQuestion 함수 호출
              />
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
