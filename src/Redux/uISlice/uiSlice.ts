import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../createAppSlice"
import * as UISelectors from "./uiSelectors"

export type uiSliceType = {
  placeholder: string
}
const uiSliceInitialState: uiSliceType = {
  placeholder: "HelloWorld",
}

const dummyAsyncFunction = async (amount: number): Promise<string> => {
  // This is a mock function to simulate an async operation.
  // In a real application, this could be an API call or some other async operation.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Async operation completed with amount: ${amount.toString()}`)
    }, 1000)
  })
}

export const uiSlice = createAppSlice({
  name: "uiSlice",
  initialState: uiSliceInitialState,
  reducers: create => ({
    setPlaceholder: create.reducer((state, action: PayloadAction<string>) => {
      state.placeholder = action.payload
    }),

    incrementAsync: create.asyncThunk(
      async (amount: number) => {
        //this would actually be some kind of async api call, The above warning is due to the fact that this is a mock function
        // For example, you might fetch data from a server or perform some asynchronous operation
        const response = await dummyAsyncFunction(amount)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.placeholder = "loading"
        },
        fulfilled: (state, action) => {
          state.placeholder = "Payload Recieved " + action.payload
        },
        rejected: state => {
          state.placeholder = "failed"
        },
      },
    ),
  }),
  selectors: { ...UISelectors },
})
