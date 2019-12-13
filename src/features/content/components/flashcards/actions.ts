import { createAction } from 'typesafe-actions';

export const toggleShuffle = createAction('@flashcards/TOGGLE_SHUFFLE')<void>();

export const toggleSpeech = createAction('@flashcards/TOGGLE_SPEECH')<void>();

export const toggleRepeat = createAction('@flashcards/TOGGLE_REPEAT')<void>();
