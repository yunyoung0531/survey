import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import QuestionTypeDropdown from './QuestionTypeDropdown';
import { Form } from 'react-bootstrap';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import './App.css';
// import { ShortAnswer } from './ShortAnswer';
// import { LongAnswer } from './LongAnswer';
// import { MultipleChoice } from './MultipleChoice';
// import { Checkbox } from './Checkbox';
// import { DropdownQuestion } from './DropdownQuestion';


interface QuestionProps {
    questionTitle: string;
    questionType: string;
    onDuplicate: () => void;
    onQuestionTypeChange: (type: string) => void;
    onDelete: () => void; // 삭제 이벤트 핸들러
}

const Question: React.FC<QuestionProps> = ({ questionTitle, questionType, onDuplicate, onQuestionTypeChange, onDelete }) => {
    // const [questionType, setQuestionType] = useState<string>('객관식 질문');

    const handleQuestionTypeChange = (newType: string) => {
        onQuestionTypeChange(newType); // 상위 컴포넌트에서 전달받은 핸들러를 호출
    };

    const renderQuestionContent = () => {
        switch (questionType) {
            case '단답형ㅤㅤ':
                return <div className="custom-input">단답형 텍스트</div>;
            case '장문형ㅤㅤ':
                return <textarea className="form-control" placeholder="장문형 텍스트"></textarea>;
            case '객관식 질문': 
                return (<>
                    <label className="option">
                        <input type="radio" name="option" value="option1" />
                        <span>옵션 1</span>
                    </label>
                    <label className="option">
                        <input type="radio" name="option" value="option2" />
                        <span>옵션 추가 또는 기타 추가</span>
                    </label>
                </>);
            case '체크박스ㅤ':
                return (<>
                    <label className="option">
                        <input type="radio" name="option" value="option1" />
                        <span>옵션 1</span>
                    </label>
                    <label className="option">
                        <input type="radio" name="option" value="option2" />
                        <span>옵션 추가 또는 기타 추가</span>
                    </label>
                </>);
            case '드롭다운ㅤ':
                return (<>
                    <label className="option">
                        <input type="radio" name="option" value="option1" />
                        <span>옵션 1</span>
                    </label>
                    <label className="option">
                        <input type="radio" name="option" value="option2" />
                        <span>옵션 추가</span>
                    </label>
                </>);
            default:
                return (<>
                    test
                </>);
            }
    };

    return (
    <div className="survey-question">
        <div className='drag-drop'>
        <FontAwesomeIcon icon={faEllipsis}/>
        </div>  
        <div className='question-title-container'>
        {/* <div className="question-title"> */}
            <div className="question-text">
            <h4>{questionTitle}</h4>
            </div>
            <span className='icon-outside'>
            
            <FontAwesomeIcon style={{color: '#5e5e5e', cursor: 'pointer'}} icon={faImage} />
            <QuestionTypeDropdown
                selectedType={questionType}
                onSelectType={handleQuestionTypeChange}
            />
            </span>
        {/* </div> */}
        </div>
      {/* 다른 질문 옵션들은 여기에 추가 */}
            {/* <div className="question-options">
                <label className="option">
                <input type="radio" name="option" value="option1" />
                <span>옵션 1</span>
                </label>
                <label className="option">
                <input type="radio" name="option" value="option2" />
                <span>옵션 추가 또는 기타 추가</span>
                </label>
            </div> */}
            <div className="question-options">
            {renderQuestionContent()}
            </div>
            <div className='question-tail'>
                <FontAwesomeIcon style={{color: '#5e5e5e', cursor: 'pointer'}} icon={faCopy}
                onClick={onDuplicate}
                />
                <FontAwesomeIcon style={{color: '#5e5e5e', cursor: 'pointer'}} icon={faTrashCan} 
                onClick={onDelete}
                />
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
    );
};

export default Question;