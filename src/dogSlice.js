import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const setupDogList = createAsyncThunk('dogs/fetchDogList', async () => {
  const rawData = await fetch('https://dog.ceo/api/breeds/list/all')
  const data = await rawData.json()

  const dogNames = Object.keys(data.message);
  let dogSummary = {};

  const dogListRequests = Array(100).fill(null).map(async (_, idx) => {
    const randomName = dogNames[Math.floor(Math.random() * dogNames.length)]
    const image = await fetch(`https://dog.ceo/api/breed/${randomName}/images/random`)
      .then(res => res.json())
      .then(res => res.message);

    if (dogSummary.hasOwnProperty(randomName)) {
      dogSummary[randomName].imageCount += 1;
    } else {
      dogSummary[randomName] = {
        imageCount: 1,
        likeCount: 0
      }
    }

    return {
      id: idx,
      name: randomName,
      image,
      likes: 0,
    };
  });

  const dogList = await Promise.all(dogListRequests)

  return {
    dogList,
    dogSummary
  }
})

export const dogSlice = createSlice({
  name: 'dogs',
  initialState: {
    dogList: [],
    dogSummary: {},
    isLoading: false,
  },
  reducers: {
    likeDog: (state, action) => {
      state.dogList = state.dogList.map(dog => {
        if (dog.id === action.payload.id) {
          return {
            ...dog,
            likes: dog.likes + 1
          }
        }

        return dog;
      });

      state.dogSummary[action.payload.name].likeCount += 1;
    },
    setDogList: (state, action) => {
      state.dogList = action.payload;
    },
    setDogSummary: (state, action) => {
      return {
        ...state,
        dogSummary: {
          ...state.dogSummary,
          ...action.payload,
        }
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(setupDogList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setupDogList.fulfilled, (state, action) => {
        state.dogList = action.payload.dogList;
        state.dogSummary = action.payload.dogSummary;
        state.isLoading = false;
      })
      .addCase(setupDogList.rejected, (state) => {
        state.isLoading = false;
      })
  }
})

export const { setDogSummary, setDogList, likeDog } = dogSlice.actions

export default dogSlice.reducer
