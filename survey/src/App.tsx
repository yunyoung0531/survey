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


  // 각 질문의 제목과 유형을 저장하기 위한 새로운 인터페이스
interface QuestionData {
  id: string;
  title: string;
  type: string;

}


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

    const [questions, setQuestions] = useState<QuestionData[]>([
      { id: '제목없는 질문', title: '제목없는 질문', type: '객관식 질문'}
    ]);

    // 새 질문을 추가하는 함수
    const addNewQuestion = () => {
      const newQuestionId = `question-${questions.length + 1}`;
      const newQuestion: QuestionData = {
        id: newQuestionId,
        title: `새로운 질문 ${questions.length + 1}`,
        type: '객관식 질문',
      };
      setQuestions([...questions, newQuestion]); // 새 질문을 상태에 추가합니다.
    };


      // 질문을 복제하는 함수
    const duplicateQuestion = (index: number) => {
        // 현재 질문을 복제하고 배열에 추가
        const newQuestions = [...questions];
        const questionToCopy = { ...newQuestions[index] };
        newQuestions.splice(index + 1, 0, questionToCopy);
        setQuestions(newQuestions);
    };

    //삭제 기능 
    const deleteQuestion = (index: number) => {
      setQuestions(questions.filter((_, questionIndex) => questionIndex !== index));
    };
  
    // 질문의 제목을 업데이트하는 함수
    const updateQuestionTitle = (id: string, newTitle: string) => {
      setQuestions(questions.map(question => 
        question.id === id ? { ...question, title: newTitle } : question
      ));
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
            {questions.map((question, index) => (
              <div className='survey-container-detail' key={question.id}>
              <Question
                questionTitle={question.title}
                questionType={question.type}
                onDuplicate={() => duplicateQuestion(index)}
                onQuestionTypeChange={(newType) => {
                  // 질문 유형을 변경하는 새 함수
                  const updatedQuestions = [...questions];
                  updatedQuestions[index] = { ...updatedQuestions[index], type: newType };
                  setQuestions(updatedQuestions);
                }}
                onDelete={() => deleteQuestion(index)} // 삭제 이벤트 핸들러 추가
                onUpdateTitle={(newTitle) => updateQuestionTitle(question.id, newTitle)}
              />
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