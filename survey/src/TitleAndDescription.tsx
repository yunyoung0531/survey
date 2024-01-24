import React from 'react';

// Props 타입 정의
interface TitleAndDescriptionProps {
    isEditing: boolean;
    value: string;
    onBlur: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
    className: string;
    type: 'title' | 'description';
}

// TitleAndDescription 컴포넌트 정의
const TitleAndDescription: React.FC<TitleAndDescriptionProps> = ({
    isEditing,
    value,
    onBlur,
    onChange,
    onClick,
    className,
    type
}) => {
    const Element = type === 'title' ? 'h2' : 'p';
    const additionalClassName = type === 'title' ? 'title-editing-input' : 'description-editing-inpu';
    return (
    <>
        
        {!isEditing ? (
                <Element
                    className={`${className} ${additionalClassName}`}
                    onClick={onClick}
                >
                    {value}
                </Element>
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    autoFocus
                    className={`${className} ${additionalClassName} editing-input`}
                />
            )}
    </>
    );
};

export default TitleAndDescription;
