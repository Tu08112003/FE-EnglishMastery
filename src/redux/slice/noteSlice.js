import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNote, addWord } from '../../service/noteService';
import { toast } from 'react-toastify';

// Lấy danh sách từ vựng
export const fetchNotes = createAsyncThunk(
    'note/fetchNotes',
    async (accessToken, { rejectWithValue }) => {
        try {
            const response = await getNote({ accessToken });
            const wordArray = response?.data?.note?.words || [];
            const vocabularies = wordArray.map(w => ({
                ...w,
                id: w.wordId, 
            }));
            return vocabularies;
        } catch (err) {
            console.error('API error:', err);
            return rejectWithValue(err.response?.data?.message || 'Không thể tải danh sách từ vựng.');
        }
    }
);

// Thêm từ vựng mới
export const addVocabulary = createAsyncThunk(
    'note/addVocabulary',
    async ({ word, description, pronounce, example, learned, note, accessToken }, { rejectWithValue }) => {
        try {
            const response = await addWord({  
                word,
                description,
                pronounce,
                learned,
                note,
                example,
                accessToken,
            });
            if(response.status === 200){
                toast.success("Thêm từ vựng thành công")
            }
            return {
                word, description, pronounce, example, learned, note, id: response.data?.wordId 
            }
        } catch (err) {
            console.error('Add note error:', err);
            return rejectWithValue(err.response?.data?.message || 'Không thể thêm từ vựng.');
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
            });
    },
});

export default noteSlice.reducer;
