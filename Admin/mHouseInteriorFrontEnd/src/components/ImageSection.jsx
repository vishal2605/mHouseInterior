import { Link, useNavigate } from "react-router-dom";
import Fade from 'react-reveal/Fade';

const ImageSection = () => {
    const navigate = useNavigate();
    const goToProjects = () => {
        navigate('/projects');
    }
    const goToServices = () => {
        navigate('/services');
    }
    const goToAbout = () => {
        navigate('/about');
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-4">
            <Fade>
                <div className="sm:col-span-2 sm:row-span-2 bg-white">
                    <div className="relative w-full h-full px-4 sm:px-0" onClick={goToProjects}>
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/51a3f15de4b0e2549bc09c5d/accd0717-b93e-47a2-9310-db4654193bec/LEAD+IMAGE+.jpg?format=1500w"
                            className="w-full h-full object-cover"
                            alt="Descriptive Alt Text"
                        />
                        <div className="absolute inset-0 hover:bg-white hover:bg-opacity-50 flex items-center justify-center md:text-6xl text-5xl font-bold text-white">
                            Projects
                        </div>
                    </div>
                </div>
            </Fade>
            <Fade>
                <div className="sm:col-span-2 sm:row-span-1 bg-white" onClick={goToServices}>
                    <div className="relative w-full h-full px-4 sm:px-0">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/51a3f15de4b0e2549bc09c5d/5b0510b1-e4bf-4493-8968-e6e293cbc63a/%C2%A9Jane+Beiles-7561.jpg"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 hover:bg-white hover:bg-opacity-50 flex items-center justify-center md:text-6xl text-5xl font-bold text-white">
                            Services
                        </div>
                    </div>
                </div>
            </Fade>
            <Fade>
                <div className="relative w-full h-full px-4 sm:px-0">
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/51a3f15de4b0e2549bc09c5d/1636744176107-9GTISMNUOMPDZSX5JRCF/2910055B-358D-493E-A73B-2BD20DD5DDF6.JPG"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 hover:bg-white hover:bg-opacity-50 flex items-center justify-center md:text-6xl text-5xl font-bold text-white" onClick={goToAbout}>
                        About
                    </div>
                </div>
            </Fade>
            <Fade>
                <div className="relative w-full h-full px-4 sm:px-0">
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/51a3f15de4b0e2549bc09c5d/e5477178-3a27-400d-a74d-096ae3aafa60/D2_11.jpeg"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 hover:bg-white hover:bg-opacity-50 flex items-center justify-center md:text-6xl text-5xl font-bold text-white">
                        Contact
                    </div>
                </div>
            </Fade>
        </div>
    );
}
export default ImageSection;
