import React from 'react';
import './App.css';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faBarsStaggered, faSquareCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

interface QuestionTypeDropdownProps {
    selectedType: string;
    onSelectType: (type: string) => void;
}

const QuestionTypeDropdown: React.FC<QuestionTypeDropdownProps> = ({ selectedType, onSelectType }) => {
    return (
        <Dropdown className='drop-down' style={{marginLeft: '20px'}}>
        <Dropdown.Toggle id="dropdown-basic" >
            <FontAwesomeIcon style={{color: '#5e5e5e', marginRight: '8px'}} icon={faCircleDot} />
            {selectedType}ㅤ
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onClick={() => onSelectType('단답형ㅤㅤ')}><FontAwesomeIcon className='dropdown-icon' icon={faBarsStaggered} />단답형</Dropdown.Item>
            <Dropdown.Item onClick={() => onSelectType('장문형ㅤㅤ')}><FontAwesomeIcon className='dropdown-icon' icon={faBarsStaggered} />장문형</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => onSelectType('객관식 질문')}><FontAwesomeIcon className='dropdown-icon' icon={faCircleDot} />객관식 질문</Dropdown.Item>
            <Dropdown.Item onClick={() => onSelectType('체크박스ㅤ')}><FontAwesomeIcon className='dropdown-icon' icon={faSquareCheck} />체크박스</Dropdown.Item>
            <Dropdown.Item onClick={() => onSelectType('드롭다운ㅤ')}><FontAwesomeIcon className='dropdown-icon' icon={faCircleCheck} />드롭다운</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    );
};

export default QuestionTypeDropdown;
