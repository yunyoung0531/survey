import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './store/questionsSlice';

export interface QuestionData {
    id: string;
    title: string;
    type: string;
    options: string[];
}

export const store = configureStore({
    reducer: {
        questions: questionsReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('questionsState', JSON.stringify(state.questions));
});  

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
