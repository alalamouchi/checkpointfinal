import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default function Gallery(props) {
    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: "#" + props.galleryID,
            children: "a",
            pswpModule: () => import("photoswipe"),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, []);

    return (
        <Container>
            <div id={props.galleryID}>
                <Row lg={3}>
                    {props.images.map((image, index) => {
                        return (
                            <Col lg>
                                <a
                                    href={image.largeURL}
                                    data-pswp-width={image.width}
                                    data-pswp-height={image.height}
                                    key={props.galleryID + "-" + index}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={image.thumbnailURL}
                                        alt=""
                                        width={350}
                                        style={{
                                            objectFit: "cover",
                                        }}
                                    />
                                </a>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </Container>
    );
}
