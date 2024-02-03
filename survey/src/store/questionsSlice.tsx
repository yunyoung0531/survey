import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestionData {
    id: string;
    title: string;
    type: string;
    options: string[];
    isRequired: boolean;
}

interface QuestionsState {
    questions: QuestionData[];
}

const initialState: QuestionsState = {
    questions: [
        { id: '제목없는 질문', title: '제목없는 질문', type: '객관식 질문', options: ['옵션 1'], isRequired: true }
    ]
};

// Slice 정의
export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion: (state, action: PayloadAction<QuestionData>) => {
            state.questions.push(action.payload);
        },
        deleteQuestion: (state, action: PayloadAction<string>) => {
            state.questions = state.questions.filter(question => question.id !== action.payload);
        },
        updateQuestion: (state, action: PayloadAction<QuestionData>) => {
            const index = state.questions.findIndex(question => question.id === action.payload.id);
            if (index !== -1) {
                state.questions[index] = action.payload;
            }
        },
        // 질문 유형을 변경하는 액션
        changeQuestionType: (state, action: PayloadAction<{ id: string; newType: string }>) => {
            const index = state.questions.findIndex(question => question.id === action.payload.id);
            if (index !== -1) {
            state.questions[index].type = action.payload.newType;
            }
        },
        
        // 질문에 옵션을 추가하는 액션
        addOptionToQuestion: (state, action: PayloadAction<{ questionId: string; newOption: string }>) => {
            const question = state.questions.find(q => q.id === action.payload.questionId);
            if (question) {
            question.options.push(action.payload.newOption);
            }
        },
         // 질문 순서를 변경하는 액션
    moveQuestion: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
        const { dragIndex, hoverIndex } = action.payload;
        const draggedQuestion = state.questions[dragIndex];
        // 질문 배열 내에서 질문을 재배치합니다.
        state.questions.splice(dragIndex, 1);
        state.questions.splice(hoverIndex, 0, draggedQuestion);
    },
    
    // 옵션을 이동하는 액션
    moveOption: (state, action: PayloadAction<{ questionId: string; dragIndex: number; hoverIndex: number }>) => {
        const { questionId, dragIndex, hoverIndex } = action.payload;
        const question = state.questions.find(q => q.id === questionId);
        if (question) {
            const draggedOption = question.options[dragIndex];
            question.options.splice(dragIndex, 1);
            question.options.splice(hoverIndex, 0, draggedOption);
        }
    },
    
    // 옵션을 업데이트하는 액션
    updateQuestionOptions: (state, action: PayloadAction<{ questionId: string; newOptions: string[] }>) => {
        const { questionId, newOptions } = action.payload;
        const question = state.questions.find(q => q.id === questionId);
        if (question) {
            question.options = newOptions;
        }
    },
    },
});

// 액션 생성자와 리듀서를 export합니다.
export const { addQuestion, deleteQuestion, updateQuestion, changeQuestionType, addOptionToQuestion, moveQuestion, moveOption, updateQuestionOptions } = questionsSlice.actions;
export default questionsSlice.reducer;