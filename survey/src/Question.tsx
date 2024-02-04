import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import QuestionTypeDropdown from './QuestionTypeDropdown';
import { Form } from 'react-bootstrap';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faGrip } from '@fortawesome/free-solid-svg-icons';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { useDrag, useDrop } from 'react-dnd';
import Option from './Option';

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

    userInputTitle: string;
    onUpdateUserInputTitle: (newTitle: string) => void;
}

const Question: React.FC<QuestionProps> = ({ questionTitle, questionType, onDuplicate, onQuestionTypeChange, onDelete, onUpdateTitle, options, onAddOption, id, index, onMove, moveOption, onUpdateOptions, onUserResponse }) => {
    const [isRequired, setIsRequired] = useState<boolean>(false);
    const handleIsRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRequired(e.target.checked);
        
    };

    const handleOptionSelect = (selectedOption: string) => {
        onUserResponse?.(selectedOption);
    };

    const handleQuestionTypeChange = (newType: string) => {
        onQuestionTypeChange?.(newType); 
    };
    const [editTitle, setEditTitle] = useState(questionTitle); 
    
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value); 
        onUpdateTitle?.(e.target.value); 
    };

    const addOption = (type: string) => {
        onAddOption?.(`옵션 ${(options.length) + 1}`, type); 
    };
    const addOtherOption = () => {
        onAddOption?.('기타...', questionType); 
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

    const handleDeleteOption = (indexToDelete: number) => {
        const newOptions = options.filter((_, index) => index !== indexToDelete);
        if (options.length >= 2) {
            setLocalOptions(newOptions); 
            onUpdateOptions?.(newOptions);
        }
    };
    

    const renderQuestionContent = () => {
        const hasOtherOption = localOptions.includes('기타');

        switch (questionType) {
            case '단답형ㅤㅤ':
                return <div className="custom-input">단답형 텍스트</div>;
            case '장문형ㅤㅤ':
                return <div className="custom-input-long">장문형 텍스트</div>;
            case '객관식 질문': 
                return (<>
                    {options.map((option, index) => (
                        <Option key={index} option={option} index={index} questionType={questionType}   moveOption={moveOption || (() => {})} onDeleteOption={handleDeleteOption} 
                        onUpdateOption={updateOption} totalOptions={options.length}/>
                    ))}
                    <label className="option">
                        <span className='plus-option' onClick={() => addOption('객관식 질문')}>
                        옵션 추가
                        </span>
                        {!hasOtherOption && (
                        <>
                            {options.includes('기타...') ? null : <><span>⠀또는⠀</span><span className='plus-etc' onClick={addOtherOption}> '기타' 추가</span></>}
                        </>
                        )}
                    </label>
                </>);
            case '체크박스ㅤ':
                return (<>
                    {options.map((option, index) => (
                        <Option key={index} option={option} index={index} questionType={questionType}   moveOption={moveOption || (() => {})} onDeleteOption={handleDeleteOption} 
                        onUpdateOption={updateOption} totalOptions={options.length}
                        />
                    ))}
                    <label className="option">
                        <span className='plus-option' onClick={()=>{addOption('체크박스ㅤ')}}>옵션 추가</span>
                        {!hasOtherOption && (
                        <>
                            {options.includes('기타...') ? null : <><span>⠀또는⠀</span><span className='plus-etc' onClick={addOtherOption}> '기타' 추가</span></>}
                        </>
                        )}
                    </label>
                </>);
            
            case '드롭다운ㅤ':
                return (<>
                    {options.map((option, index) => (
                        <Option key={index} option={option} index={index}questionType={questionType}   moveOption={moveOption || (() => {})} onDeleteOption={handleDeleteOption} 
                        onUpdateOption={updateOption} totalOptions={options.length}/>
                    ))}
                    <label className="option">
                        <span className='plus-option' onClick={()=>{addOption('드롭다운ㅤ')}}>옵션 추가</span>
                        
                    </label>
                </>);
            default:
                return (<>
                    test
                </>);
            }
    };

    const [, drag] = useDrag({
        type: 'question',
        item: { id, index },
        canDrag: !!id && typeof index === 'number', 
    });
    
    const [, drop] = useDrop({
        accept: 'question',
        hover(item: { id: string; index: number }) {
            if (item.index !== index && typeof index === 'number') {
                onMove && onMove(item.index, index);
                item.index = index; 
            }
        },
    });
    
    return (
    <div ref={drop} className="survey-question">
        <div ref={drag} className='drag-drop'>
        {/* <FontAwesomeIcon icon={faEllipsis}/> */}
        <FontAwesomeIcon icon={faGrip} style={{color: "#b0b0b0", cursor: 'move'}} size='sm' />
        </div>  
        <div className='question-title-container'>
        {/* <div className="question-title"> */}
            <div className="question-text">
            <input
                type="text"
                value={editTitle}
                onChange={handleTitleChange}
                className="question-title-input"
                placeholder="질문 제목 입력"
            />
            </div>
            <span className='icon-outside'>
            
            <FontAwesomeIcon style={{color: '#5e5e5e', cursor: 'pointer', marginTop: '-15px'}} size='lg' icon={faImage} />
            <QuestionTypeDropdown
                selectedType={questionType}
                onSelectType={handleQuestionTypeChange}
            />
            </span>
        {/* </div> */}
        </div>
            <div className="question-options">
            {renderQuestionContent()}
            </div>
            <div className='question-tail'>
                <FontAwesomeIcon style={{color: '#5e5e5e', cursor: 'pointer'}} icon={faCopy}
                onClick={() => onDuplicate && onDuplicate()} 
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
                    onChange={handleIsRequiredChange}
                    />
                </Form>
                <FontAwesomeIcon style={{color: '#5e5e5e', cursor: 'pointer'}} icon={faEllipsisVertical}/>
                </span>
            </div>
    </div>
    );
};

export default Question;