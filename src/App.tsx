import Navbar from './components/navbar'
import './App.css'
import Inventory from './features/dashboard/inventorySection'
import { useEffect } from 'react'
import { useAppDispatch } from './store/store'
import { fetchInventory } from './store/reducers/inventory'

function App() {
  const dispatch = useAppDispatch();

  useEffect(()=>{
        dispatch(fetchInventory())
  },[])
  return (
    <div className='flex flex-col'>
      <Navbar/>
      <Inventory/>
    </div>
  )
}

export default App
