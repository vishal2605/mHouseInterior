import Profile from '../assets/profile.png'
import ConfigData from '../config.json';
const About=()=>{
    const profile=ConfigData.profile;
    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
                <div className=' flex justify-center '>
                    <img 
                        src={Profile}
                        className='w-96 h-full rounded border-2 border-white'/>       
                </div>
                <div className='pr-10'>
                    <div className='flex items-baseline '>
                        <div className='font-medium text-2xl '>
                            Founder, 
                        </div>
                         
                        <div className='font-medium text-3xl text-amber-600'>
                            {profile.name}
                        </div>
                        
                    </div>
                    <div className='font-normal text-md text-justify mt-7'>
                        {profile.description1}
                    </div>
                    <div className='font-normal text-md text-justify mt-7'>
                        {profile.description2}
                    </div>
                </div>
            </div>
        </>
    )
}
export default About;