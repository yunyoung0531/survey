import React, { useState} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface OptionProps {
    option: string;
    index: number;
    questionType?: string; 
    moveOption?: (dragIndex: number, hoverIndex: number) => void;
    onUpdateOption?: (index: number, newOption: string) => void; 
    onDeleteOption?: (index: number) => void; 
    totalOptions: number;
}


const Option: React.FC<OptionProps> = ({ option, index, questionType, moveOption, onUpdateOption, onDeleteOption, totalOptions }) => {
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
    
    const handleDelete = () => {
        onDeleteOption?.(index); 
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

    const inputType = questionType === '객관식 질문' ? 'radio' : 'checkbox';

    return (
        <div ref={(node) => drag(drop(node))}  key={index}>
            <label className="option">
            <FontAwesomeIcon icon={faGripVertical} className='option-move-icon' style={{color: "#bababa", marginRight: '10px', cursor: 'move'}} size='sm' />
                <input type={inputType} name="option" value={option} readOnly />
                {editing ? (
                    <input
                        type="text"
                        value={newOption}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        className='option-edit'
                    />
                ) : (
                    <span onDoubleClick={handleClick}>{option}</span>
                )}
                {totalOptions >= 2 ? <FontAwesomeIcon icon={faXmark} className='xmark-icon' onClick={handleDelete}/> : null}
            </label>
        </div>
    );
};

export default Option;