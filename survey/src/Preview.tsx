import React, { useState } from 'react';
import PreviewQuestion from './PreviewQuestion';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import TitleAndDescription from './TitleAndDescription';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface QuestionData {
    id: string;
    title: string;
    type: string;
    options: string[];
    
    isRequired: boolean;
}

interface Responses {
    [key: string]: string; 
}

interface QuestionProps extends QuestionData {
    onUserResponse: (response: string) => void;
    
}

interface PreviewProps {
    title: string;
    description: string;
}

const Preview: React.FC<PreviewProps> = ({ title, description }) => {
    const [isRequired, setIsRequired] = useState(false);

    let navigate = useNavigate();
    const handleSubmit = () => {
        
        navigate('/result', { state: { title, description, responses, questions: questionsFromRedux } });
    };
    
    const [responses, setResponses] = useState<Responses>({});
    const questionsFromRedux = useSelector((state: RootState) => state.questions.questions);

    const handleResponseChange = (questionId: string, response: string) => {
        console.log("handleResponseChange called", questionId, response);
        const newResponses = {...responses, [questionId]: response};
        console.log(newResponses);
        setResponses(newResponses);

    };

    const clearResponses = () => {
    setResponses({});
    
    setForceReset(prev => !prev);
    };

    
    const [forceReset, setForceReset] = useState(false);


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
                    key={`${question.id}-${forceReset}`} 
                    id={question.id}
                    index={index}
                    questionTitle={question.title}
                    questionType={question.type}
                    options={question.options}
                    isRequired={question.isRequired} 
                    onUserResponse={(response) => {
                        if (typeof response === 'object') {
                            const otherResponse = response["기타..."]; 
                            handleResponseChange(question.id, otherResponse);
                        } else {
                            
                            handleResponseChange(question.id, response);
                        }
                    }}
                    
                    />
                </div>
            ))}
            </div>
        </DndProvider>
        </div>
        <div className='submit-and-cancel'>
            <Button className='submit-btn' onClick={handleSubmit}>제출</Button>{' '}
            <div className='preview-cancel' onClick={clearResponses}>양식 지우기</div>
        </div>
        </div>
    );
}

export default Preview;
