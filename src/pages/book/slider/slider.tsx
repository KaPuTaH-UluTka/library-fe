import { useState } from 'react';
import { FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInterface } from 'swiper/types';

import FirstImg from './assets/book.png';
import defaultImg from './assets/defaultBook.png';
import SecondImg from './assets/secondSlide.png';

import classes from './slider.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';


export const Slider = (props: { images: string[] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<null | SwiperInterface>(null);

    const parseImg = (img: string) => {
        const path = img.split('/')[2];

        if (path === 'book.png') {
            return FirstImg;
        }
        if (path === 'secondSlide.png') {
            return SecondImg;
        }

        return defaultImg;
    };


    return (
        <div className={classes.slider}>
            <Swiper data-test-id="slide-big"
                    loop={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    pagination={{
                        clickable: true
                    }}
                    className={classes['slider-wrapper']}
            >
                {props.images.map((el, index) =>
                    <SwiperSlide key={index} className={classes['main-slide']}>
                        <img src={parseImg(el)} alt={el}/>
                    </SwiperSlide>
                )}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={30}
                slidesPerView={5}
                freeMode={true}
                onSlideChange={() => {thumbsSwiper?.pagination.update()}}
                scrollbar={{draggable: true}}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs, Scrollbar, Pagination]}
                className={classes['thumbs-wrapper']}
            >
                {props.images.map((el, index) =>
                    <SwiperSlide data-test-id="slide-mini" key={index} className={classes['thumbs-item']}>
                        <img src={parseImg(el)} alt={el}/>
                    </SwiperSlide>
                )}
            </Swiper>
            <div className={classes.shadow} />
        </div>
    );
};
