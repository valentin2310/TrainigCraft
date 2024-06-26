import ObjetivoCard from "@/app/ui/objetivos/objetivo-card"
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css';

export default function ScrollObjetivos({ lista }) {
    return (
        <>
            <Carousel
                additionalTransfrom={0}
                arrows={false}
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
                itemClass="px-1 sm:px-1 xl:px-3"
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                partialVisbile
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 3,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {lista && lista.map((objetivo) => (
                    <ObjetivoCard key={objetivo.id} objetivo={objetivo} />
                ))}
            </Carousel>
        </>
    )
}