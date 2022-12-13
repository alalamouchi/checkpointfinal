import React, { useEffect, useState, useRef } from "react";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import { Col } from "react-bootstrap";

function Caroussel({ blog, handleShow }) {
    const [width, setWidth] = useState(0);
    console.log(width);
    const carrousel = useRef();
    useEffect(() => {
        // console.log(
        //     carrousel.current.scrollWidth,
        //     carrousel.current.offsetWidth
        // );
        setWidth(carrousel.current.scrollWidth - carrousel.current.offsetWidth);
    }, []);
    return (
        // <Carousel fade touch={true}>
        //     {blog.photos.map((photo) => {
        //         return (
        //             <Carousel.Item style={{ border: "2px solid black" }}>
        //                 <img
        //                     className="d-block w-100"
        //                     src={photo}
        //                     alt="blog-photo"
        //                     onClick={() => handleShow(true)}
        //                     style={{
        //                         cursor: "zoom-in",
        //                         objectFit: "contain",
        //                     }}
        //                 />
        //             </Carousel.Item>
        //         );
        //     })}
        // </Carousel>
        <div>
            <motion.div ref={carrousel} className="carrousel">
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    whileTap={{ cursor: "grabbing" }}
                    className="inner-carrousel"
                >
                    {blog.photos.map((image) => {
                        return (
                            <motion.div className="item" key={image}>
                                <img
                                    src={image}
                                    alt="image-house"
                                    style={{
                                        objectFit: "cover",
                                        cursor: "zoom-in",
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Caroussel;
