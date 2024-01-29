// Result 컴포넌트
import React from 'react';
import { useLocation } from 'react-router-dom'; // React Router의 hook을 사용
import { QuestionData } from './store'; 

interface ResponseProps {
    responses: { [key: string]: string };
    questions: QuestionData[];
}

const Result: React.FC = () => {
    const location = useLocation();
    const { responses, questions } = location.state as ResponseProps;


    return (
        <div className="app-container">
            <h1>Result Page</h1>
            <div className="survey-container">
                {questions.map(question => (
                    <div key={question.id} className="survey-container-detail">
                        <h3>{question.title}</h3>
                        {question.type === "단답형ㅤㅤ" && (
                            <div className="response-text">
                                {responses[question.id]}
                            </div>
                        )}
                        {question.type === "장문형ㅤㅤ" && (
                            <div className="response-text-long">
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
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                        {question.type === "드롭다운ㅤ" && (
                            // 드롭다운 선택으로 응답 표시
                            <div>
                                <select value={responses[question.id]} className="form-control" disabled>
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
    );
}

export default Result;
