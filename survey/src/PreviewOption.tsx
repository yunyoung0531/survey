import React, { useState} from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface PreviewOptionProps {
    option: string;
    index: number;
    questionType?: string; 
    moveOption?: (dragIndex: number, hoverIndex: number) => void;
    onUpdateOption?: (index: number, newOption: string) => void; 
    options?: string[]; 
    onUserResponse?: (response: string) => void;  
}


const PreviewOption: React.FC<PreviewOptionProps> = ({ option, index, questionType, moveOption, onUpdateOption, options, onUserResponse }) => {

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
        onUpdateOption?.(index, newOption); 
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
    
    let inputElement = null;

    if (questionType === '객관식 질문') {
        inputElement = <input type="radio" name="option" value={option} onChange={() => onUserResponse?.(option)}
        readOnly />;
    } else if (questionType === '체크박스ㅤ') {
        inputElement = <input type="checkbox" name="option" value={option} onChange={() => onUserResponse?.(option)} readOnly />;
    } else if (questionType === '드롭다운ㅤ') {
        
        inputElement = (
        <select className="form-control">
            {options?.map((opt: string, optIndex: number) => ( 
            <option key={optIndex} value={opt} selected={opt === option}>
                {opt}
            </option>
            ))}
        </select>
        );
    }
    
    return (
        <div ref={(node) => drag(drop(node))}  key={index}>
            <label className="option">
                {inputElement}
                {isOtherOption && (
                <input
                    type="text"
                    value={otherText}
                    onChange={handleOtherChange}
                    placeholder="기타..."
                    className={isOtherOption ? 'visible' : 'hidden'}
                />
                )}
                {!isOtherOption && <span onDoubleClick={handleClick}>{option}</span>}
            </label>
        </div>
    );
};

export default PreviewOption;