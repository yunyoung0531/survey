import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import { faEquals } from '@fortawesome/free-solid-svg-icons';
import { faT } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import TitleAndDescription from './TitleAndDescription';
import QuestionTypeDropdown from './QuestionTypeDropdown';
import Question from './Question';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store'; // RootState는 전체 애플리케이션 상태의 타입입니다.
import { addQuestion, deleteQuestion, updateQuestion, changeQuestionType, addOptionToQuestion, moveQuestion, moveOption, updateQuestionOptions } from './store/questionsSlice';
// import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preview from './Preview';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Result from './Result';
  // 각 질문의 제목과 유형을 저장하기 위한 새로운 인터페이스
interface QuestionData {
  id: string;
  title: string;
  type: string;
  options: string[];
  isRequired:boolean;
}
const QuestionMemo = React.memo(Question);

const App: React.FC = () => {
  // const [questions, setQuestions] = useState<QuestionData[]>([]); // 질문 배열 상태

  // 질문의 "필수" 상태를 토글하는 함수
  const toggleIsRequired = (id: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, isRequired: !question.isRequired } : question
      )
    );
  };
  const [isRequired, setIsRequired] = useState(false);
  const handleToggleRequired = (required: boolean) => {
    setIsRequired(required);
  };
  const [userInputTitle, setUserInputTitle] = useState(""); // 질문 제목 상태 관리

      const handleUserInputTitleChange = (newTitle: string) => {
        setUserInputTitle(newTitle); // 사용자 입력에 따라 제목 상태 업데이트
      };  
    
    const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
    const [isDescriptionEditing, setIsDescriptionEditing] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('제목 없는 설문지');
    const [description, setDescription] = useState<string>('설문지 설명');

    const questionsFromRedux = useSelector((state: RootState) => state.questions.questions);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    // 새 질문을 추가하는 함수
  const handleAddNewQuestion = () => {
    const newQuestionId = `question-${questionsFromRedux.length + 1}`;
    const newQuestion: QuestionData = {
      id: newQuestionId,
      title: `새로운 질문 ${questionsFromRedux.length + 1}`,
      type: '객관식 질문',
      options: ['옵션 1'],
      isRequired: false,
    };
    // 액션을 디스패치하여 새 질문을 추가합니다.
    dispatch(addQuestion(newQuestion));
  };

    // 질문의 "필수" 상태를 변경하는 함수
  const handleToggleIsRequired = (id: string) => {
    const question = questionsFromRedux.find(question => question.id === id);
    if (question) {
      const updatedQuestion = {
        ...question,
        isRequired: !question.isRequired
      };
      // 액션을 디스패치하여 질문의 "필수" 상태를 업데이트합니다.
      dispatch(updateQuestion(updatedQuestion));
    }
  };


  // 질문을 복제하는 함수
  const handleDuplicateQuestion = (index: number) => {
    const questionToCopy = questionsFromRedux[index];
    // 복제할 질문의 데이터를 변경하고 새 ID를 할당합니다.
    const duplicatedQuestion = {
      ...questionToCopy,
      id: `question-${questionsFromRedux.length + 1}`
    };
    // 액션을 디스패치하여 질문을 복제합니다.
    dispatch(addQuestion(duplicatedQuestion));
  };

  // 질문을 삭제하는 함수
  const handleDeleteQuestion = (id: string) => {
    // 액션을 디스패치하여 질문을 삭제합니다.
    dispatch(deleteQuestion(id));
  };

  // 질문 제목을 업데이트하는 함수
  const handleUpdateQuestionTitle = (id: string, newTitle: string) => {
      // 업데이트할 질문의 새 데이터를 생성합니다.
  const questionToUpdate = questionsFromRedux.find(q => q.id === id);
  if (questionToUpdate) {
    const updatedQuestion: QuestionData = {
      ...questionToUpdate,
      title: newTitle,
      // isRequired 필드를 현재 값으로 유지합니다.
      isRequired: questionToUpdate.isRequired
    };
    dispatch(updateQuestion(updatedQuestion));
  
  }
};

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

    //질문 유형을 변경하는 함수
    const handleChangeQuestionType = (id: string, newType: string) => {
      dispatch(changeQuestionType({ id, newType }));
    };

    // 질문에 옵션을 추가하는 함수
    const handleAddOptionToQuestion = (questionId: string, newOption: string) => {
      dispatch(addOptionToQuestion({ questionId, newOption }));
    };

    // const [questionType, setQuestionType] = useState<string>('객관식 질문');
    // // 질문 유형 변경 핸들러
    // const handleQuestionTypeChange = (type: string) => {
    //   setQuestionType(type);
    // };

    // 질문 순서를 변경하는 함수
    const handleMoveQuestion = (dragIndex: number, hoverIndex: number) => {
      dispatch(moveQuestion({ dragIndex, hoverIndex }));
    };

    // 옵션을 이동하는 함수
    const handleMoveOption = (questionId: string, dragIndex: number, hoverIndex: number) => {
      dispatch(moveOption({ questionId, dragIndex, hoverIndex }));
    };

    // 옵션을 업데이트하는 함수
    const handleUpdateQuestionOptions = (questionId: string, newOptions: string[]) => {
      dispatch(updateQuestionOptions({ questionId, newOptions }));
    };

    const [questions, setQuestions] = useState<QuestionData[]>(() => {
      // localStorage에서 질문 데이터 불러오기
      const savedQuestions = localStorage.getItem('questions');
      return savedQuestions ? JSON.parse(savedQuestions) : [];
    });
    
    useEffect(() => {
      localStorage.setItem('questions', JSON.stringify(questions));
    }, [questions]);
    
    return (
      <>
          <Routes>
            <Route path="/" element={<>
              <NavBar title={title} description={description} userInputTitle={userInputTitle} />
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
                    {questionsFromRedux.map((question, index) => (
                      <div className='survey-container-detail' key={question.id}>
                        <QuestionMemo
                        key={question.id} // 질문의 고유 ID를 key로 사용
                        id={question.id} // 질문의 고유 ID
                        index={index} // 현재 질문의 인덱스
                        questionTitle={question.title}
                        questionType={question.type}
                        onDuplicate={() => handleDuplicateQuestion(index)}
                        onQuestionTypeChange={(newType) => handleChangeQuestionType(question.id, newType)}
                        onDelete={() => handleDeleteQuestion(question.id)}
                        onUpdateTitle={(newTitle) => handleUpdateQuestionTitle(question.id, newTitle)}
                        options={question.options}
                        onAddOption={(newOption) => handleAddOptionToQuestion(question.id, newOption)}
                        onMove={(dragIndex, hoverIndex) => handleMoveQuestion(dragIndex, hoverIndex)}
                        moveOption={(dragIndex, hoverIndex) => handleMoveOption(question.id, dragIndex, hoverIndex)}
                        onUpdateOptions={(newOptions) => handleUpdateQuestionOptions(question.id, newOptions)}
                        userInputTitle={userInputTitle}
                        onUpdateUserInputTitle={handleUserInputTitleChange}
                        // isRequired={question.isRequired}
                        // onToggleRequired={() => toggleIsRequired(question.id)}
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
                        onClick={handleAddNewQuestion}
                        />
                      <FontAwesomeIcon className='new-container-icon' icon={faFileImport} size="lg" />
                      <FontAwesomeIcon className='new-container-icon' icon={faT} size="lg" />
                      <FontAwesomeIcon className='new-container-icon' icon={faImage} size="lg" />
                      <FontAwesomeIcon className='new-container-icon' icon={faYoutube} size="lg" />
                      <FontAwesomeIcon className='new-container-icon' icon={faEquals} size="lg" />
                    </div>

                  </div>
                </div>
            </>}/>

              <Route path="/preview" element={<>
                <Preview title={title} description={description}/>
              </>} />
              <Route path="/result" element={<>
                <Result />
              </>} />
          </Routes>
          </>
    );
}

export default App;