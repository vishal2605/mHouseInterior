import { useNavigate } from "react-router-dom";
import CreateProjectDialog from "../components/CreateProjectDialog";
import Navbar from "../components/Navbar";
import ProjectSection from "../components/ProjectSection";
import { useEffect, useState } from "react";
import { LogoutDialog } from "../components/LogoutDialog";

const AdminDashboard=()=>{
    const navigate=useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(()=>{
        const checkAuth = ()=>{
            try{
                const token=localStorage.getItem('token');
                if(!token){
                    navigate('/login');
                }
            }
            catch(error){
                console.error('error while loading page')
            }
        }
        checkAuth();
    },[navigate])

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };
    return (
        
        <div>
             <Navbar/>
            <div className="flex justify-between items-center px-4 py-4 mt-2">
                <div className="text-2xl font-medium">
                    Add Project
                </div>
                <button onClick={toggleDialog} className=' px-6 py-1.5 border-2 border-amber-600 bg-amber-600 text-white rounded-full hover:bg-white hover:text-amber-600'>
                    Create
                </button>
            </div>
            <CreateProjectDialog isOpen={isDialogOpen} toggleDialog={toggleDialog} isEdit={false}/>
            <LogoutDialog></LogoutDialog>
            <ProjectSection/>
        </div>
    )
}
export default AdminDashboard;