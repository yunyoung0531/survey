import React, { useState, useEffect } from 'react';
import './App.css';
import PreviewOption from './PreviewOption';


interface QuestionProps {   
    questionTitle: string;  
    questionType: string;
    onDuplicate?: () => void;
    onQuestionTypeChange?: (type: string) => void;
    onDelete?: () => void;
    onUpdateTitle?: (newTitle: string) => void;
    options: string[]; 
    onAddOption?: (option: string, type: string) => void; 

    id: string; 
    onMove?: (dragIndex: number, hoverIndex: number) => void; 
    index: number; 
    moveOption?: (dragIndex: number, hoverIndex: number) => void; 
    onUpdateOptions?: (newOptions: string[]) => void; 
    onUserResponse?: (response: string) => void;  

    isRequired: boolean;
}

const PreviewQuestion: React.FC<QuestionProps> = ({ questionTitle, questionType, onDuplicate, onQuestionTypeChange, onDelete, onUpdateTitle, options, onAddOption, id, index, onMove, moveOption, onUpdateOptions, onUserResponse, isRequired }) => {
    
    const handleOptionSelect = (selectedOption: string) => {
        onUserResponse?.(selectedOption);
    };

    const handleQuestionTypeChange = (newType: string) => {
        onQuestionTypeChange?.(newType); 
    };
    const [editTitle, setEditTitle] = useState(questionTitle); 
    

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUserResponse?.(event.target.value); 
    };

    
    const [localOptions, setLocalOptions] = useState<string[]>(options);
    useEffect(() => {
        setLocalOptions(options);
    }, [options]);

    const updateOption = (optionIndex: number, newOptionText: string) => {
        const updatedOptions = localOptions.map((option, idx) => {
            if (idx === optionIndex) {
                return newOptionText;
            }
            return option;
        });
        setLocalOptions(updatedOptions);
        onUpdateOptions?.(updatedOptions); 
    };

    const renderQuestionContent = () => {
        const hasOtherOption = localOptions.includes('기타');

        switch (questionType) {
            case '단답형ㅤㅤ':
                return <div className="custom-input-preview">
                        <input
                        type="text"
                        placeholder="단답형 텍스트"
                        onChange={handleTitleChange} 
                        className='short-input-pre'
                        />
                    </div>;
            case '장문형ㅤㅤ':
                return <div className="custom-input-long-preview">
                        <input
                        type="text"
                        placeholder="장문형 텍스트"
                        onChange={handleTitleChange} 
                        className='long-input-pre'
                        />
                </div>;
            case '객관식 질문': 
                return (<>
                    {options.map((option, index) => (
                        <PreviewOption key={index} option={option} index={index} questionType={questionType} onUserResponse={onUserResponse}
                        />
                        
                    ))}
                    <label className="option">
                    </label>
                </>);
            case '체크박스ㅤ':
                return (<>
                    {options.map((option, index) => (
                        <PreviewOption key={index} option={option} index={index} questionType={questionType} onUserResponse={onUserResponse}
                        />
                    ))}
                    <label className="option">
                    </label>
                </>);
            
            case '드롭다운ㅤ':
                return (<>
                    <select className="form-control"
                    onChange={(e) => onUserResponse?.(e.target.value)}
                    >
                    {localOptions.map((option, idx) => (
                        <option key={idx} value={option} >
                            {option}
                        </option>
                    ))}
                    </select>
                    <label className="option">
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
        <div className='question-title-container'>
            <div className="question-text-preview">
            <input
                value={editTitle}
                className="question-title-input-preview"
            />
            </div>
        </div>
            <div className="question-options">
            {renderQuestionContent()}
            </div>
    </div>
    );
};

export default PreviewQuestion;