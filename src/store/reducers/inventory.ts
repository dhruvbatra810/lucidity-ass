import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from "@reduxjs/toolkit"
import { getInventory } from "../../api/inventory"

export type Product = {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  isDisabled: boolean
}

interface InventoryState {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: InventoryState = {
  items: [],
  loading: false,
  error: null
}

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getInventory();
      return response;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch inventory")
    }
  }
)

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addItems: (
      state,
      action: PayloadAction<Omit<Product, "isDisabled">[]>
    ) => {
      state.items = action.payload.map(product => ({
        ...product,
        isDisabled: false
      }))
    },

    deleteItem: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter(
        item => item.id !== action.payload.id
      )
    },

    disableItem: (state, action: PayloadAction<{ id: number }>) => {
      const product = state.items.find(
        item => item.id === action.payload.id
      )
      if (product) {
        product.isDisabled = !product.isDisabled
      }
    },

    editItem: (
      state,
      action: PayloadAction<{ id: number; data: Partial<Product> }>
    ) => {
      const product = state.items.find(
        item => item.id === action.payload.id
      )
      if (product) {
        Object.assign(product, action.payload.data)
      }
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchInventory.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.map(product => ({
          ...product,
          isDisabled: false
        }))
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const {
  deleteItem,
  disableItem,
  editItem,
  addItems
} = inventorySlice.actions

export default inventorySlice.reducer
