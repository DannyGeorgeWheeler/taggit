import './Gallery.css';
import React, { useEffect, useState } from 'react';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Gallery({images}) {
    const [currentImg, setCurrentImg] = useState(0);
    const totalImgs = images.length;

    const handleNextClick = () => {
        document.getElementById(`image${currentImg}`).classList.toggle('hideImage');
        if (currentImg < totalImgs - 1) {
            setCurrentImg(currentImg + 1);
        } else {
            setCurrentImg(0);
        }
    };

    const handlePrevClick = () => {
        document.getElementById(`image${currentImg}`).classList.toggle('hideImage');
        if (currentImg > 0) {
            setCurrentImg(currentImg - 1);
        } else {
            setCurrentImg(totalImgs - 1);
        }
    };

    useEffect(() => {
        console.log(`change to image #${currentImg}`);
        document.getElementById(`image${currentImg}`).classList.toggle('hideImage');
    }, [currentImg]);

    return (
        <div className='galleryContainer'>
            {images.map((image, index) => <img key={`image${index}`} id={`image${index}`} className='galleryImage hideImage' src={image.source} alt='' />)}
            <button className='nextButton' onClick={handleNextClick}><FontAwesomeIcon icon={faCaretRight} /></button>
            <button className='prevButton' onClick={handlePrevClick}><FontAwesomeIcon icon={faCaretLeft} /></button>
        </div>
    )
}