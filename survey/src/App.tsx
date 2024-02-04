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
import TitleAndDescription from './TitleAndDescription';
import Question from './Question';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store'; 
import { addQuestion, deleteQuestion, updateQuestion, changeQuestionType, addOptionToQuestion, moveQuestion, moveOption, updateQuestionOptions } from './store/questionsSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preview from './Preview';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Result from './Result';
  
interface QuestionData {
  id: string;
  title: string;
  type: string;
  options: string[];
  isRequired:boolean;
}
const QuestionMemo = React.memo(Question);

const App: React.FC = () => {
  
  const [userInputTitle, setUserInputTitle] = useState(""); 
      const handleUserInputTitleChange = (newTitle: string) => {
        setUserInputTitle(newTitle); 
      };  
    
    const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
    const [isDescriptionEditing, setIsDescriptionEditing] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('제목 없는 설문지');
    const [description, setDescription] = useState<string>('설문지 설명');

    const questionsFromRedux = useSelector((state: RootState) => state.questions.questions);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    
  const handleAddNewQuestion = () => {
    const newQuestionId = `question-${questionsFromRedux.length + 1}`;
    const newQuestion: QuestionData = {
      id: newQuestionId,
      title: `새로운 질문 ${questionsFromRedux.length + 1}`,
      type: '객관식 질문',
      options: ['옵션 1'],
      isRequired: false,
    };
    
    dispatch(addQuestion(newQuestion));
  };

  const handleToggleIsRequired = (id: string) => {
    const question = questionsFromRedux.find(question => question.id === id);
    if (question) {
      const updatedQuestion = {
        ...question,
        isRequired: !question.isRequired
      };
      
      dispatch(updateQuestion(updatedQuestion));
    }
  };
  const handleDuplicateQuestion = (index: number) => {
    const questionToCopy = questionsFromRedux[index];
    
    const duplicatedQuestion = {
      ...questionToCopy,
      id: `question-${questionsFromRedux.length + 1}`
    };
    
    dispatch(addQuestion(duplicatedQuestion));
  };

  
  const handleDeleteQuestion = (id: string) => {
    
    dispatch(deleteQuestion(id));
  };

  
  const handleUpdateQuestionTitle = (id: string, newTitle: string) => {
      
  const questionToUpdate = questionsFromRedux.find(q => q.id === id);
  if (questionToUpdate) {
    const updatedQuestion: QuestionData = {
      ...questionToUpdate,
      title: newTitle,
      
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

    
    const handleTitleBlur = () => {
      setIsTitleEditing(false);
    };

    const handleDescriptionBlur = () => {
      setIsDescriptionEditing(false);
    };

    
    const handleChangeQuestionType = (id: string, newType: string) => {
      dispatch(changeQuestionType({ id, newType }));
    };

    
    const handleAddOptionToQuestion = (questionId: string, newOption: string) => {
      dispatch(addOptionToQuestion({ questionId, newOption }));
    };
    
    const handleMoveQuestion = (dragIndex: number, hoverIndex: number) => {
      dispatch(moveQuestion({ dragIndex, hoverIndex }));
    };

    
    const handleMoveOption = (questionId: string, dragIndex: number, hoverIndex: number) => {
      dispatch(moveOption({ questionId, dragIndex, hoverIndex }));
    };

    
    const handleUpdateQuestionOptions = (questionId: string, newOptions: string[]) => {
      dispatch(updateQuestionOptions({ questionId, newOptions }));
    };

    const [questions, setQuestions] = useState<QuestionData[]>(() => {
      
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
                        key={question.id} 
                        id={question.id} 
                        index={index} 
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