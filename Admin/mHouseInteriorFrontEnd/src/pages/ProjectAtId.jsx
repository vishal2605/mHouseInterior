import { useEffect } from "react";
import { fetchProjectById } from "../api's/service";

function ProjectAtId(props){

    useEffect(async ()=> {
        const projectArray = await fetchProjectById(props.ProjectId);
        
    },[])
    return (
        <>
            
        </>
    )
}

export default ProjectAtId;