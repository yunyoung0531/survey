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
// import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { useDrag, useDrop } from 'react-dnd';
import PreviewOption from './PreviewOption';
// import { Dropdown, DropdownButton } from 'react-bootstrap';

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
    moveOption?: (dragIndex: number, hoverIndex: number) => void; 
    onUpdateOptions?: (newOptions: string[]) => void; // 옵션을 업데이트하는 콜백
    onUserResponse?: (response: string) => void;  // 옵셔널로 변경
}

const PreviewQuestion: React.FC<QuestionProps> = ({ questionTitle, questionType, onDuplicate, onQuestionTypeChange, onDelete, onUpdateTitle, options, onAddOption, id, index, onMove, moveOption, onUpdateOptions, onUserResponse }) => {
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
    // const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEditTitle(e.target.value); // state 업데이트
    //     onUpdateTitle?.(e.target.value); // 상위 컴포넌트에 변경 사항 전달
    // };

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
    // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // 입력 필드의 새로운 값으로 상태를 업데이트합니다.
    //     setEditTitle(event.target.value);
    //     // 상위 컴포넌트의 변경 핸들러를 호출하여 변경 사항을 전달합니다.
    //     // 여기서 옵셔널 체이닝을 사용하여 함수가 정의되어 있을 때만 호출합니다.
    //     onUpdateTitle?.(event.target.value);
    // };

    const renderQuestionContent = () => {
        const hasOtherOption = localOptions.includes('기타');

        switch (questionType) {
            case '단답형ㅤㅤ':
                return <div className="custom-input-preview">
                        {/* 단답형 텍스트 */}
                        <input
                        type="text"
                        placeholder="단답형 텍스트"
                        // onChange={handleTitleChange} 
                        className='short-input-pre'
                        />
                    </div>;
            case '장문형ㅤㅤ':
                return <div className="custom-input-long-preview">
                        <input
                        type="text"
                        placeholder="장문형 텍스트"
                        // onChange={handleTitleChange} 
                        className='long-input-pre'
                        />
                </div>;
            case '객관식 질문': 
                return (<>
                    {options.map((option, index) => (
                        <PreviewOption key={index} option={option} index={index} questionType={questionType} />
                    ))}
                    <label className="option">
                        {/* <span className='plus-option' onClick={() => addOption('객관식 질문')}>
                        옵션 추가
                        </span> */}
                            {/* {!hasOtherOption && (
                            <>
                                <span> 또는</span>
                                <span className='plus-etc' onClick={addOtherOption}> '기타' 추가</span>
                            </>
                            )} */}
                    </label>
                </>);
            case '체크박스ㅤ':
                return (<>
                    {/* <label className="option">
                    <input type="checkbox" name="option" />
                    <span>옵션 1</span>
                    </label> */}
                    {options.map((option, index) => (
                        // <label className="option" key={index}>
                        //     <FontAwesomeIcon icon={faGripVertical} style={{color: "#bababa", marginRight: '10px', cursor: 'pointer'}} size='sm' />
                        //     <input type="checkbox" name="option" value={option} />
                        //     <span>{option}</span>
                        // </label>
                        <PreviewOption key={index} option={option} index={index} questionType={questionType}
                        />
                    ))}
                    <label className="option">
                        {/* <span className='plus-option' onClick={()=>{addOption('체크박스ㅤ')}}>옵션 추가</span>
                        <span> 또는</span>
                        <span className='plus-etc' onClick={()=>{addOtherOption()}}> '기타' 추가</span> */}
                    </label>
                </>);
            
            case '드롭다운ㅤ':
                return (<>
                    
                    {/* {options.map((option, index) => (
                        <PreviewOption key={index} option={option} index={index} options={options} questionType={questionType}
                        />
                    ))} */}
                    <select className="form-control">
                    {localOptions.map((option, idx) => (
                        <option key={idx} value={option}>
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
    <div className="survey-question">
        <div className='question-title-container'>
        {/* <div className="question-title"> */}
            <div className="question-text-preview">
            <input
                // type="text"
                value={editTitle}
                // onChange={handleTitleChange}
                className="question-title-input-preview"
                // placeholder="질문 제목 입력"
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