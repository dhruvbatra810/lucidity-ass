import Switch from '@mui/material/Switch';
import {useAppSelector,useAppDispatch} from "../store/store"
import { setRole } from '../store/reducers/userRole';

export default function Navbar() {
    const role = useAppSelector((state)=> state.userRole.role )
    const dispatch = useAppDispatch()
    return <div className='w-full shadow-sm shadow-white'>
        <div className='flex gap-1 items-center p-2 w-fit ml-auto mr-4'>
            <p>User</p>
            <Switch className='text-gray-800' checked={ role === 'admin'} onChange={(e)=>{
                if(e.target.checked){
                    dispatch(setRole('admin'))
                }
                else{ dispatch(setRole('user'))}
                }}/>
            <p>Admin</p>
        </div>
    </div>
}