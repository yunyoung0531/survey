import React, { useState } from 'react';
import PreviewQuestion from './PreviewQuestion';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import TitleAndDescription from './TitleAndDescription';
import { Button } from 'react-bootstrap';

interface QuestionData {
    id: string;
    title: string;
    type: string;
    options: string[];
    // onUserResponse: (response: string) => void; 
}

interface Responses {
  [key: string]: string; // 또는 사용자 응답의 타입에 맞게 조정
}

// Question 컴포넌트의 Props 타입
interface QuestionProps extends QuestionData {
    onUserResponse: (response: string) => void;
    // 다른 필요한 props가 있다면 여기에 추가
}

interface PreviewProps {
    title: string;
    description: string;
}

const Preview: React.FC<PreviewProps> = ({ title, description }) => {
    const [responses, setResponses] = useState<Responses>({});
    const questionsFromRedux = useSelector((state: RootState) => state.questions.questions);

    const handleResponseChange = (questionId: string, response: string) => {
        setResponses({...responses, [questionId]: response});
    };

    return (
        <div className="app-container">
        <div className="survey-container">
            <div className="survey-header" style={{ position: 'relative' }}>
            <TitleAndDescription
                value={title}
                className='title-editing-input'
                type='title'
            />
            <TitleAndDescription
                value={description}
                className='description-editing-input'
                type='description'
            />
            </div>
        </div>
        <div className='content-container-preview' >
        <DndProvider backend={HTML5Backend}>
            <div className='sur-test'>
            {questionsFromRedux.map((question: QuestionData, index: number) => (
                <div className='survey-container-detail-pre' key={question.id}>
                <PreviewQuestion
                    key={question.id}
                    id={question.id}
                    index={index}
                    questionTitle={question.title}
                    questionType={question.type}
                    options={question.options}
                    onUserResponse={(response) => handleResponseChange(question.id, response)}
                    />
                </div>
            ))}
            </div>
        </DndProvider>
        </div>
        <div className='submit-and-cancel'>
            <Button className='submit-btn'>제출</Button>{' '}
            <div className='preview-cancel'>양식 지우기</div>
        </div>
        </div>
    );
}

export default Preview;
