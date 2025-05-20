import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWord, searchWord } from '../../service/dictionaryService';

// Search từ vựng
export const searchVocabulary = createAsyncThunk(
    'dictionary/searchVocabulary',
    async ({ word }, { rejectWithValue }) => {
        try {
            const res = await searchWord({ word });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Không thể tìm kiếm từ vựng');
        }
    }
);

// Get từ vựng
export const getVocabulary = createAsyncThunk(
    'dictionary/getVocabulary',
    async ({ wordId }, { rejectWithValue }) => {
        try {
            const res = await getWord({ wordId });
            return res.data; 
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Không thể tìm kiếm chi tiết từ vựng');
        }
    }
);


const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState: {
        words: [], 
        currentWord: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentWord: (state) => {
            state.currentWord = null;
        },
        clearListWord: (state) => {
            state.words = [];
        },
    },
    extraReducers: (builder) => {
        // Handle searchVocabulary
        builder
            .addCase(searchVocabulary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchVocabulary.fulfilled, (state, action) => {
                state.loading = false;
                state.words = action.payload.words || [];
            })
            .addCase(searchVocabulary.rejected, (state, action) => {
                state.loading = false;
                state.words = [];
                state.error = action.payload;
            });

        // Handle getVocabulary
        builder
            .addCase(getVocabulary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVocabulary.fulfilled, (state, action) => {
                state.loading = false;
                state.currentWord = action.payload;
            })
            .addCase(getVocabulary.rejected, (state, action) => {
                state.loading = false;
                state.currentWord = null;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearCurrentWord, clearListWord } = dictionarySlice.actions;

export default dictionarySlice.reducer;