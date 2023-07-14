import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';

interface introductionsProps {
    isVisible: boolean;
}

const Introduction: React.FC<introductionsProps>  = ({isVisible}) => {
    const [tagIndex, setTagIndex] = useState(0);
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext.introductionUp) {
            const firstWord = setTimeout(() => {
                setTagIndex(0);
            }, 0);
            const secondWord = setTimeout(() => {
                setTagIndex(1);
            }, 980);

            const thirdWord = setTimeout(() => {
                setTagIndex(2);
            }, 1980);

            return () => {
                clearTimeout(firstWord);
                clearTimeout(secondWord);
                clearTimeout(thirdWord);
            }
        } 
    }, [appContext.introductionUp]);

    const tags = [
        <h1 className='text-red-500'key={0}> Preparados! </h1>,
        <h1 className='text-red-500'key={1}> Listos!! </h1>,
        <h1 className='text-red-500' key={2}> Ya!!! </h1>,
    ];

    return (
        <div className='text-2xl font-bold ' style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
            {tags[tagIndex]}
        </div>
    );
};

export default Introduction;