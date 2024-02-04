// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './store/questionsSlice';

export interface QuestionData {
    id: string;
    title: string;
    type: string;
    options: string[];
    // ... 기타 필드 ...
}

export const store = configureStore({
    reducer: {
        questions: questionsReducer,
    },
});
// 스토어 상태가 변경될 때마다 localStorage에 저장
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('questionsState', JSON.stringify(state.questions));
});  
// RootState 타입을 추론합니다.
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch 타입을 추론합니다.
export type AppDispatch = typeof store.dispatch;
