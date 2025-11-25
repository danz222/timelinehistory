import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { gsap } from "gsap";

import { TimelineSegment } from "./timelineTypes";

import "swiper/css";
import "swiper/css/navigation";
import "./timelineBlock.scss";

interface TimelineBlockProps {
    segments: TimelineSegment[];
}

const TimelineBlock: React.FC<TimelineBlockProps> = ({ segments }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeSegment = segments[activeIndex];

    const [displayFromYear, setDisplayFromYear] = useState<number>(
        Number(segments[0].fromYear)
    );
    const [displayToYear, setDisplayToYear] = useState<number>(
        Number(segments[0].toYear)
    );

    const prevIndexRef = useRef(0);
    const circleRef = useRef<HTMLDivElement | null>(null);
    const rotationRef = useRef(0);

    const [isEventsAtBeginning, setIsEventsAtBeginning] = useState(true);
    const [isEventsAtEnd, setIsEventsAtEnd] = useState(false);

    const eventsSwiperRef = useRef<SwiperType | null>(null);
    const categoryRef = useRef<HTMLDivElement | null>(null);
    const eventsRef = useRef<HTMLDivElement | null>(null);

    const angleStep = 360 / segments.length;
    const baseAngle = -60;
    const radius = 49.5;

    const formatIndex = (n: number) => String(n).padStart(2, "0");

    const setActiveWithAnimation = (nextIndex: number) => {
        if (!circleRef.current) {
            setActiveIndex(nextIndex);
            return;
        }
        
        /* круг */
        const currentIndex = activeIndex;
        const len = segments.length;

        let deltaSteps = nextIndex - currentIndex;
        const half = len / 2;

        if (deltaSteps > half) {
            deltaSteps -= len;
        } else if (deltaSteps < -half) {
            deltaSteps += len;
        }

        const deltaAngle = -deltaSteps * angleStep;
        const fromRotation = rotationRef.current;
        const toRotation = fromRotation + deltaAngle;

        rotationRef.current = toRotation;

        /* поворот круга */
        gsap.to(circleRef.current, {
            rotation: toRotation,
            duration: 0.8,
            ease: "power2.inOut",
            onUpdate: () => {
                const current = gsap.getProperty(circleRef.current, "rotation") as number;
                gsap.set(".timeline__point-badge", {
                    rotation: -current
                });
            }
        });

        setActiveIndex(nextIndex);
    };

    const goPrev = () => {
        if (activeIndex === 0) return;
        setActiveWithAnimation(activeIndex - 1);
    };

    const goNext = () => {
        if (activeIndex === segments.length - 1) return;
        setActiveWithAnimation(activeIndex + 1);
    };

    const goPrevEventSlide = () => {
        eventsSwiperRef.current?.slidePrev();
    };

    const goNextEventSlide = () => {
        eventsSwiperRef.current?.slideNext();
    };

    
    /* анимация больших чисел */
    useEffect(() => {
        const prevIndex = prevIndexRef.current;
        const prevSegment = segments[prevIndex];
        const nextSegment = segments[activeIndex];

        const fromObj: { value: number } = { value: Number(prevSegment.fromYear) };
        gsap.to(fromObj, {
            value: Number(nextSegment.fromYear),
            duration: 0.6,
            ease: "power2.inOut",
            onUpdate: () => setDisplayFromYear(Math.round(fromObj.value))
        });

        const toObj: { value: number } = { value: Number(prevSegment.toYear) };
        gsap.to(toObj, {
            value: Number(nextSegment.toYear),
            duration: 0.6,
            ease: "power2.inOut",
            onUpdate: () => setDisplayToYear(Math.round(toObj.value))
        });

        prevIndexRef.current = activeIndex;
    }, [activeIndex, segments]);


    /* анимация подписи категории */
    useEffect(() => {
        if (!categoryRef.current) return;

        gsap.fromTo(
            categoryRef.current,
            {
                autoAlpha: 0,
                x: 80
            },
            {
                autoAlpha: 1,
                x: 0,
                duration: 0.8,

            }
        );
    }, [activeIndex]);


    /* анимация блока событий */
    useEffect(() => {
        if (!eventsRef.current) return;

        gsap.fromTo(
            eventsRef.current,
            { autoAlpha: 0 },
            {
                autoAlpha: 1,
                duration: 0.8,

            }
        );
    }, [activeIndex]);

    return (
        <div className="timeline">
            <div className="timeline__line-v timeline__line-v--1" />
            <div className="timeline__line-v timeline__line-v--2" />
            <div className="timeline__line-v timeline__line-v--3" />
            <div className="timeline__line-h timeline__line-h--1" />

            <div className="timeline__right">
                <div className="timeline__accent-line" />

                <div className="timeline__left">
                    <h2 className="timeline__heading">
                        Исторические
                        <br />
                        даты
                    </h2>
                </div>

                <div className="timeline__main">
                    <div className="timeline__year timeline__year--left">
                        {displayFromYear}
                    </div>

                    <div className="timeline__year timeline__year--right">
                        {displayToYear}
                    </div>

                    <div className="timeline__circle">
                        <div className="timeline__circle-rotating" ref={circleRef}>
                            <div className="timeline__circle-inner" />

                            {segments.map((segment, index) => {
                                const angle = baseAngle + index * angleStep;
                                const rad = (angle * Math.PI) / 180;

                                const x = 50 + radius * Math.cos(rad);
                                const y = 50 + radius * Math.sin(rad);
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={segment.id}
                                        type="button"
                                        className={"timeline__point" + (isActive ? " timeline__point--active" : "")}
                                        style={{ left: `${x}%`, top: `${y}%` }}
                                        onClick={() => setActiveWithAnimation(index)}
                                    >
                                        <span className="timeline__point-dot" />
                                        <span className="timeline__point-badge">
                                            {segment.order}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="timeline__category" ref={categoryRef}>
                            <span className="timeline__category-text">
                                {activeSegment.category}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="timeline__bottom">
                    <div className="timeline__nav">
                        <button
                            type="button"
                            className={
                                "timeline__circle-arrow timeline__circle-arrow--prev" +
                                (activeIndex === 0 ? " disabled" : "")
                            }
                            onClick={goPrev}
                        >
                            <span className="timeline__circle-arrow-icon timeline__circle-arrow-icon--prev" />
                        </button>

                        <div className="timeline__nav-info">
                            {formatIndex(activeSegment.order)}/{formatIndex(segments.length)}
                        </div>

                        <button
                            type="button"
                            className={
                                "timeline__circle-arrow timeline__circle-arrow--next" +
                                (activeIndex === segments.length - 1 ? " disabled" : "")
                            }
                            onClick={goNext}
                        >
                            <span className="timeline__circle-arrow-icon timeline__circle-arrow-icon--next" />
                        </button>
                    </div>

                    <div className="timeline__events" ref={eventsRef}>
                        <Swiper
                            modules={[Navigation]}
                            className="timeline__swiper"
                            grabCursor
                            spaceBetween={80}
                            slidesPerView={1.1}
                            breakpoints={{
                                800: { slidesPerView: 3, spaceBetween: 80 },
                                1280: { slidesPerView: 3, spaceBetween: 80 }
                            }}
                            onSwiper={(swiper) => {
                                eventsSwiperRef.current = swiper;
                                setIsEventsAtBeginning(swiper.isBeginning);
                                setIsEventsAtEnd(swiper.isEnd);
                            }}
                            onSlideChange={(swiper) => {
                                setIsEventsAtBeginning(swiper.isBeginning);
                                setIsEventsAtEnd(swiper.isEnd);
                            }}
                        >
                            {activeSegment.events.map((event) => (
                                <SwiperSlide key={event.id}>
                                    <div className="timeline__event">
                                        <div className="timeline__event-year">
                                            {event.year}
                                        </div>
                                        <p className="timeline__event-description">
                                            {event.description}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <button
                    type="button"
                    className={
                        "timeline__events-arrow timeline__events-arrow--prev" +
                        (isEventsAtBeginning ? " disabled" : "")
                    }
                    onClick={goPrevEventSlide}
                >
                    <span className="timeline__events-arrow-icon timeline__events-arrow-icon--prev" />
                </button>

                <button
                    type="button"
                    className={
                        "timeline__events-arrow timeline__events-arrow--next" +
                        (isEventsAtEnd ? " disabled" : "")
                    }
                    onClick={goNextEventSlide}
                >
                    <span className="timeline__events-arrow-icon timeline__events-arrow-icon--next" />
                </button>
            </div>
        </div>
    );
};

export default TimelineBlock;