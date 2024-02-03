import React, { useState} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

interface PreviewOptionProps {
    option: string;
    index: number;
    questionType?: string; 
    moveOption?: (dragIndex: number, hoverIndex: number) => void;
    onUpdateOption?: (index: number, newOption: string) => void; // 옵션 업데이트 함수 추가
    options?: string[]; 
    onUserResponse?: (response: string) => void;  // 옵셔널로 변경
}


const PreviewOption: React.FC<PreviewOptionProps> = ({ option, index, questionType, moveOption, onUpdateOption, options, onUserResponse }) => {

      // "기타" 텍스트 입력을 위한 상태를 추가합니다.
    const [otherText, setOtherText] = useState('');
    const isOtherOption = option === '기타...';

    const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtherText(e.target.value);
        onUserResponse?.(e.target.value);
    };

    const [editing, setEditing] = useState(false);
    const [newOption, setNewOption] = useState(option);

    const handleClick = () => {
        if (!isDragging) setEditing(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewOption(e.target.value);
    };

    const handleBlur = () => {
        onUpdateOption?.(index, newOption); // 변경 사항을 상위 컴포넌트에 전달
        setEditing(false);
    };
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'option',
        item: { index },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop({
        accept: "option",
        hover(item: { index: number }) {
            if (item.index !== index) {
                moveOption?.(item.index, index);
                item.index = index;
            }
        }
    });

    // const inputType = questionType === '객관식 질문' ? 'radio' : 
    // questionType === '체크박스ㅤ' ? 'checkbox' : 'radio';
    // 여기에 드롭다운 요소를 추가합니다.
    let inputElement = null;

    if (questionType === '객관식 질문') {
        inputElement = <input type="radio" name="option" value={option} onChange={() => onUserResponse?.(option)}
        readOnly />;
    } else if (questionType === '체크박스ㅤ') {
        inputElement = <input type="checkbox" name="option" value={option} onChange={() => onUserResponse?.(option)} readOnly />;
    } else if (questionType === '드롭다운ㅤ') {
        // 드롭다운을 렌더링하기 위한 코드. 
        // 주의: 드롭다운은 각 옵션별로 렌더링하는 것이 아니라, 
        // 모든 옵션을 포함하는 하나의 드롭다운으로 렌더링해야 하므로, 
        // 이를 상위 컴포넌트에서 처리해야 할 수도 있습니다.
        inputElement = (
        <select className="form-control">
            {/* 선택된 옵션을 표시하기 위해 option 요소에 selected 속성을 사용할 수 있습니다. */}
            {options?.map((opt: string, optIndex: number) => ( // 'options?'는 'options'가 undefined일 수도 있음을 나타냅니다.
            <option key={optIndex} value={opt} selected={opt === option}>
                {opt}
            </option>
            ))}
        </select>
        );
    }

    // const inputType = questionType === '객관식 질문' ? 'radio' : 
    // questionType === '체크박스ㅤ' ? 'checkbox' : null;

    // // 라디오 버튼 또는 체크박스를 렌더링합니다.
    // let inputElement = null;
    // if (inputType) {
    //     inputElement = (
    //         <input
    //         type={inputType}
    //         name="option"
    //         value={option}
    //         readOnly // 수정되지 않도록 readOnly 설정
    //         />
    //     );
    // }
    return (
        <div ref={(node) => drag(drop(node))}  key={index}>
            <label className="option">
            {/* <FontAwesomeIcon icon={faGripVertical} style={{color: "#bababa", marginRight: '10px', cursor: 'move'}} size='sm' />
            <input type={inputType} name="option" value={option} />
            <span>{option}</span> */}
            {/* <FontAwesomeIcon icon={faGripVertical} style={{color: "#bababa", marginRight: '10px', cursor: 'move'}} size='sm' /> */}
                {/* <input type={inputType} name="option" value={option} readOnly /> */}
                {inputElement}
                {/* 텍스트 필드가 "기타" 옵션에만 나타나도록 합니다. */}
                {isOtherOption && (
                <input
                    type="text"
                    value={otherText}
                    onChange={handleOtherChange}
                    placeholder="기타..."
                    className={isOtherOption ? 'visible' : 'hidden'}
                />
                )}
                {/* {editing || (questionType !== '드롭다운ㅤ') ? (
                    <span onDoubleClick={handleClick}>{option}</span>
                ) : (
                    ''
                )} */}
                        {!isOtherOption && <span onDoubleClick={handleClick}>{option}</span>}
            </label>
        </div>
    );
};

export default PreviewOption;