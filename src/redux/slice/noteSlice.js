import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNote, addWord, updateWord, deleteWord } from '../../service/noteService';

// Lấy danh sách từ vựng
export const fetchNotes = createAsyncThunk(
    'note/fetchNotes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getNote();
            const wordArray = response?.data?.note?.words || [];
            const vocabularies = wordArray.map(w => ({
                ...w,
                id: w.wordId,
            }));
            return vocabularies;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Không thể tải danh sách từ vựng.');
        }
    }
);

// Thêm từ vựng mới
export const addVocabulary = createAsyncThunk(
    'note/addVocabulary',
    async ({ word, description, pronounce, example, learned, note }, { rejectWithValue }) => {
        try {
            const response = await addWord({
                word,
                description,
                pronounce,
                learned,
                note,
                example,
            });
            if (response.status === 200) {
                return {
                    word,
                    description,
                    pronounce,
                    example,
                    learned,
                    note,
                    id: response.data?.wordId,
                };
            } else {
                return rejectWithValue('Không thể thêm từ vựng. Vui lòng thử lại.');
            }
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Không thể thêm từ vựng.');
        }
    }
);

// Xóa từ vựng
export const deleteVocabulary = createAsyncThunk(
    'note/deleteVocabulary',
    async ({ wordId }, { rejectWithValue }) => {
        try {
            const response = await deleteWord({ wordId });
            if (response.status === 200) {
                return { wordId };
            } else {
                return rejectWithValue('Không thể xóa từ vựng. Vui lòng thử lại!');
            }
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Không thể xóa từ vựng.');
        }
    }
);

// Cập nhật từ vựng
export const updateVocabulary = createAsyncThunk(
    'note/updateVocabulary',
    async ({ wordId, word, description, pronounce, example, learned, note }, { rejectWithValue }) => {
        try {
            const response = await updateWord({
                wordId,
                word,
                description,
                pronounce,
                learned,
                note,
                example,
            });
            if (response.status === 200) {
                return {
                    wordId,
                    word,
                    description,
                    pronounce,
                    example,
                    learned,
                    note,
                };
            } else {
                return rejectWithValue('Không thể cập nhật từ vựng. Vui lòng thử lại.');
            }
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Không thể cập nhật từ vựng.');
        }
    }
);

const noteSlice = createSlice({
    name: 'note',
    initialState: {
        vocabularies: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Notes
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.vocabularies = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.vocabularies = [];
            })
            // Add Vocabulary
            .addCase(addVocabulary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addVocabulary.fulfilled, (state, action) => {
                state.loading = false;
                state.vocabularies.push(action.payload);
            })
            .addCase(addVocabulary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Vocabulary
            .addCase(updateVocabulary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVocabulary.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.vocabularies.findIndex(v => v.id === action.payload.wordId);
                if (index !== -1) {
                    state.vocabularies[index] = {
                        ...state.vocabularies[index],
                        word: action.payload.word,
                        description: action.payload.description,
                        pronounce: action.payload.pronounce,
                        example: action.payload.example,
                        learned: action.payload.learned,
                        note: action.payload.note,
                    };
                }
            })
            .addCase(updateVocabulary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Vocabulary
            .addCase(deleteVocabulary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVocabulary.fulfilled, (state, action) => {
                state.loading = false;
                state.vocabularies = state.vocabularies.filter(v => v.id !== action.payload.wordId);
            })
            .addCase(deleteVocabulary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default noteSlice.reducer;