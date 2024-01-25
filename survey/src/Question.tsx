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

interface QuestionProps {
    questionTitle: string;
}

const Question: React.FC<QuestionProps> = ({ questionTitle }) => {
    const [questionType, setQuestionType] = useState<string>('객관식 질문');

    const handleQuestionTypeChange = (type: string) => {
    setQuestionType(type);
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
    );
};

export default Question