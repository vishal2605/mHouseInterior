import Dashboard from "../components/Dashboard";
import ImageSection from "../components/ImageSection";
import ConfigData from "../config.json";
const Home= ()=>{
    const {info}=ConfigData;
    return(
        <>
            <div className="bg-logo parallax-image">
                <Dashboard/>
            </div>
            <div>
                <h1 className="font-semibold text-4xl text-center text-gray-700">
                    {info.intro}
                </h1>
            </div>
            <div className="mt-10">
                <ImageSection/>
            </div>
        </>
    )
}
export default Home;