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
    options: string[]; // 새로 추가한 옵션 목록
    onAddOption?: (option: string, type: string) => void; // 두 번째 인수로 type 추가

    id: string; // 질문의 고유 ID 추가
    onMove?: (dragIndex: number, hoverIndex: number) => void; // 질문 순서 변경 핸들러
    index: number; // 질문의 현재 인덱스
    moveOption?: (dragIndex: number, hoverIndex: number) => void; // moveOption 함수 추가
    onUpdateOptions?: (newOptions: string[]) => void; // 옵션을 업데이트하는 콜백
    onUserResponse?: (response: string) => void;  // 옵셔널로 변경

    userInputTitle: string;
    onUpdateUserInputTitle: (newTitle: string) => void;
}

const Question: React.FC<QuestionProps> = ({ questionTitle, questionType, onDuplicate, onQuestionTypeChange, onDelete, onUpdateTitle, options, onAddOption, id, index, onMove, moveOption, onUpdateOptions, onUserResponse }) => {
    const [isRequired, setIsRequired] = useState<boolean>(false);
      // isRequired 상태 업데이트 함수
    const handleIsRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRequired(e.target.checked);
        // 필수 값 변경 로직이 필요한 경우 여기에 추가
    };

    // 사용자 응답 핸들링 예시
    // const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     onUserResponse(event.target.value);
    // };
    // 사용자가 선택한 옵션을 처리하는 예시
    const handleOptionSelect = (selectedOption: string) => {
        onUserResponse?.(selectedOption);
    };

    const handleQuestionTypeChange = (newType: string) => {
        onQuestionTypeChange?.(newType); // 상위 컴포넌트에서 전달받은 핸들러를 호출
    };
    const [editTitle, setEditTitle] = useState(questionTitle); // state로 제목 관리
    // 제목이 변경될 때 호출될 핸들러
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value); // state 업데이트
        onUpdateTitle?.(e.target.value); // 상위 컴포넌트에 변경 사항 전달
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
        onUpdateOptions?.(updatedOptions); // 변경사항을 상위 컴포넌트로 전달
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
                        <Option key={index} option={option} index={index} questionType={questionType}   moveOption={moveOption || (() => {})} onDeleteOption={handleDeleteOption} // moveOption이 undefined일 경우 빈 함수 제공
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
                    {/* <label className="option">
                    <FontAwesomeIcon icon={faGripVertical} style={{color: "#bababa", marginRight: '10px', cursor: 'pointer'}} size='sm' />
                    <input type="checkbox" name="option" />
                    <span>옵션 1</span>
                    </label> */}
                    {options.map((option, index) => (
                        <Option key={index} option={option} index={index} questionType={questionType}   moveOption={moveOption || (() => {})} onDeleteOption={handleDeleteOption} // moveOption이 undefined일 경우 빈 함수 제공
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
                    {/* <label className="option" >
                    <FontAwesomeIcon icon={faGripVertical} style={{color: "#bababa", marginRight: '10px', cursor: 'pointer'}} size='sm' />
                        <span>1 옵션 1</span>
                    </label> */}
                    {options.map((option, index) => (
                        <Option key={index} option={option} index={index}questionType={questionType}   moveOption={moveOption || (() => {})} onDeleteOption={handleDeleteOption} // moveOption이 undefined일 경우 빈 함수 제공
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
        canDrag: !!id && typeof index === 'number', // id와 index가 정의되어 있는 경우에만 드래그 가능
    });
    
    const [, drop] = useDrop({
        accept: 'question',
        hover(item: { id: string; index: number }) {
            if (item.index !== index && typeof index === 'number') {
                onMove && onMove(item.index, index);
                item.index = index; // 드래그하는 항목의 새 인덱스로 업데이트
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
                  onClick={() => onDuplicate && onDuplicate()} // onDuplicate이 존재하는 경우에만 호출
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