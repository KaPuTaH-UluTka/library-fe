import { useState } from 'react';
import { FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInterface } from 'swiper/types';

import {API_URL} from '../../../store/api/api-url';
import {DataTestId} from '../../../types/constants/data-test-id';

import classes from './slider.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';


export const Slider = (props: { images: Array<{url: string}> }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<null | SwiperInterface>(null);

    return (
        <div className={classes.slider}>
            <Swiper data-test-id={DataTestId.SlideBig}
                    loop={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs, Scrollbar, Pagination]}
                    pagination={{
                        clickable: true
                    }}
                    className={classes.sliderWrapper}
            >
                {props.images.map((el, index) =>
                    <SwiperSlide key={index} className={classes.mainSlide}>
                        <img src={API_URL + el.url} alt={el.url}/>
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
                className={classes.thumbsWrapper}
                breakpoints={{
                    1110: {
                        pagination: false,
                    },
                    768: {
                        scrollbar: false,
                        pagination: true,
                    },
                }}
            >
                {props.images.map((el, index) =>
                    <SwiperSlide data-test-id={DataTestId.SlideMini} key={index} className={classes.thumbsItem}>
                        <img src={API_URL + el.url} alt={el.url}/>
                    </SwiperSlide>
                )}
            </Swiper>
            <div className={classes.shadow} />
        </div>
    );
};
