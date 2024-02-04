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
    // onUserResponse: (response: string) => void; 
    isRequired: boolean;
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
    const [isRequired, setIsRequired] = useState(false);

    let navigate = useNavigate();
    const handleSubmit = () => {
        // 'responses' 상태를 'Result' 페이지로 전달
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

    // 응답 초기화 함수
    const clearResponses = () => {
    setResponses({});
    // `key` prop을 변경하여 PreviewQuestion 컴포넌트를 강제로 리셋
    setForceReset(prev => !prev);
    };

    // `forceReset` 상태를 추가하여 PreviewQuestion 컴포넌트를 강제로 리셋할 수 있게 함
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
                    key={`${question.id}-${forceReset}`} // 이 key를 통해 컴포넌트를 리셋
                    id={question.id}
                    index={index}
                    questionTitle={question.title}
                    questionType={question.type}
                    options={question.options}
                    isRequired={question.isRequired} // 필수 여부를 prop로 전달
                    onUserResponse={(response) => {
                         // response가 객체인 경우, 객체의 값을 추출하여 handleResponseChange 호출
                        if (typeof response === 'object') {
                            // 객체에서 키를 기준으로 값을 추출하는 로직
                            // 예를 들어 "기타" 입력 값 처리
                            const otherResponse = response["기타..."]; // "기타..."가 키인 경우
                            handleResponseChange(question.id, otherResponse);
                        } else {
                            // response가 문자열인 경우, 직접 호출
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
