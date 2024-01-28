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
  import { DndProvider } from 'react-dnd';
  import { HTML5Backend } from 'react-dnd-html5-backend';

  // 각 질문의 제목과 유형을 저장하기 위한 새로운 인터페이스
interface QuestionData {
  id: string;
  title: string;
  type: string;
  options: string[];
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
      { id: '제목없는 질문', title: '제목없는 질문', type: '객관식 질문' , options: ['옵션 1']}
    ]);

    // 새 질문을 추가하는 함수
    const addNewQuestion = () => {
      const newQuestionId = `question-${questions.length + 1}`;
      const newQuestion: QuestionData = {
        id: newQuestionId,
        title: `새로운 질문 ${questions.length + 1}`,
        type: '객관식 질문',
        options: ['옵션 1']
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

    const addOptionToQuestion = (questionId: string, newOption: string) => {
      setQuestions(questions.map(question => {
        if (question.id === questionId) {
          // 여기서 question.type을 사용합니다.
          switch (question.type) {
            case '객관식 질문':
              return { ...question, options: [...question.options, newOption] };
            case '체크박스ㅤ':
              // 체크박스 옵션 추가 로직
              return { ...question, options: [...question.options, newOption] };
            case '드롭다운ㅤ':
              // 드롭다운 옵션 추가 로직
              return { ...question, options: [...question.options, newOption] };
            default:
              return question;
          }
        }
        return question;
      }));
    };
    
    const moveQuestion = (dragIndex: number, hoverIndex: number) => {
      const dragQuestion = questions[dragIndex];
      const updatedQuestions = [...questions];
      // 드래그된 질문을 제거
      updatedQuestions.splice(dragIndex, 1);
      // 새 위치에 드래그된 질문을 삽입
      updatedQuestions.splice(hoverIndex, 0, dragQuestion);
      setQuestions(updatedQuestions);
    };

    const moveOption = (questionId: string, dragIndex: number, hoverIndex: number) => {
      setQuestions(prevQuestions => {
          const newQuestions = [...prevQuestions];
          const questionIndex = newQuestions.findIndex(q => q.id === questionId);
  
          if (questionIndex >= 0) {
              // 선택한 질문의 옵션 배열을 복사합니다.
              const newOptions = [...newQuestions[questionIndex].options];
  
              // 드래그한 옵션을 배열에서 추출합니다.
              const [draggedOption] = newOptions.splice(dragIndex, 1);
  
              // 새 위치에 드래그한 옵션을 삽입합니다.
              newOptions.splice(hoverIndex, 0, draggedOption);
  
              // 새로운 옵션 배열로 질문을 업데이트합니다.
              newQuestions[questionIndex] = {
                  ...newQuestions[questionIndex],
                  options: newOptions
              };
          }
  
          return newQuestions;
      });
  };
  
  const updateQuestionOptions = (questionId: string, newOptions: string[]) => {
    setQuestions(questions.map(question => 
      question.id === questionId ? { ...question, options: newOptions } : question
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
          
        <DndProvider backend={HTML5Backend}>
          <div className='sur-test'>
            {questions.map((question, index) => (
              <div className='survey-container-detail' key={question.id}>
              <Question
                key={question.id} // 질문의 고유 ID를 key로 사용
                id={question.id} // 질문의 고유 ID
                index={index} // 현재 질문의 인덱스
                questionTitle={question.title}
                questionType={question.type}
                onDuplicate={() => duplicateQuestion(index)}
                onQuestionTypeChange={(newType) => {
                  // 질문 유형을 변경하는 새 함수
                  const updatedQuestions = [...questions];
                  updatedQuestions[index] = { ...updatedQuestions[index], type: newType };
                  setQuestions(updatedQuestions);
                }}
                onDelete={() => deleteQuestion(index)}
                onUpdateTitle={(newTitle) => updateQuestionTitle(question.id, newTitle)}
                options={question.options}
                onAddOption={(newOption) => addOptionToQuestion(question.id, newOption)} // 여기에 question.type을 전달합니다.
                onMove={moveQuestion} // 질문 순서를 변경하는 함수
                moveOption={(dragIndex, hoverIndex) => moveOption(question.id, dragIndex, hoverIndex)}
                onUpdateOptions={(newOptions) => updateQuestionOptions(question.id, newOptions)}
              />
              </div>
            ))}
          </div>
          </DndProvider>

            <div className='new-container'>
              <FontAwesomeIcon
                className='new-container-icon'
                icon={faCirclePlus}
                size="lg"
                onClick={addNewQuestion}
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