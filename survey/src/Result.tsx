import React from 'react';
import { useLocation } from 'react-router-dom'; // React Router의 hook을 사용
import { QuestionData } from './store'; 
import TitleAndDescription from './TitleAndDescription';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';

interface ResponseProps {
    responses: { [key: string]: string };
    questions: QuestionData[];
    title: string;
    description: string;
}

const Result: React.FC = () => {
    const location = useLocation();
    const { title, description, responses, questions } = location.state as ResponseProps;


    return (
        <div className="app-container">
            <div className="survey-container-result">
                <div className="survey-header-result" >
                <TitleAndDescription
                    value={title}
                    className='title-editing-input-result'
                    type='title'
                />
                {/* <TitleAndDescription
                    value={description}
                    className='description-editing-input-result'
                    type='description'
                /> */}
                </div>
            
            <div className='content-container-result' >
            <div className='sur-test'>
                {questions.map(question => (
                    <div key={question.id} className="survey-container-detail-res">
                        <h4>{question.title}</h4>
                        {question.type === "단답형ㅤㅤ" && (
                            <div className="response-text">
                                <FontAwesomeIcon icon={faComment} style={{color: "#595959", marginRight: '10px', marginLeft: '5px'}} />
                                {responses[question.id]}
                            </div>
                        )}
                        {question.type === "장문형ㅤㅤ" && (
                            <div className="response-text-long">
                                <FontAwesomeIcon icon={faComment} style={{color: "#595959", marginRight: '10px', marginLeft: '10px'}} />
                                {responses[question.id]}
                            </div>
                        )}
                        {question.type === "객관식 질문" && (
                            <div>
                                {question.options.map((option, idx) => (
                                    <div key={idx}>
                                        <input
                                            type="radio"
                                            name={question.id}
                                            value={option}
                                            checked={responses[question.id] === option}
                                            readOnly
                                            className='question-radio-res'
                                        />
                                        <label>{option}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                        {question.type === "체크박스ㅤ" && (
                            <div>
                                {question.options.map((option, idx) => (
                                    <label key={idx}>
                                        <input
                                            type="checkbox"
                                            name={question.id}
                                            value={option}
                                            checked={responses[question.id]?.includes(option)}
                                            readOnly
                                            className='question-radio-res'
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                        {question.type === "드롭다운ㅤ" && (
                            // 드롭다운 선택으로 응답 표시
                            <div>
                                <select value={responses[question.id]} className="form-control" disabled style={{marginLeft: '2px'}}>
                                    {question.options.map((option, idx) => (
                                        <option key={idx} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {/* 기타 질문 유형에 대한 로직 추가 */}
                    </div>
                ))}
                </div>
                </div>
                </div>
            </div>
    );
}

export default Result;