import React, { useState, useEffect } from "react";
import Data from "../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./gridBox.css";

const generateBackgroundColor = (index) => {
  const colors = [
    "#ffaaaa",
    "#aaffaa",
    "#aaaaff",
    "#ffffaa",
    "#ffaaff",
    "#aaffff",
  ];
  return colors[index % colors.length];
};

const GridBox = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.innerWidth <= 480
  );

  const prevSlide = () => {
    if (isMobileScreen) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? Data.features.length - 1 : prevIndex - 1
      );
    }
  };

  const nextSlide = () => {
    if (isMobileScreen) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Data.features.length);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 480) {
        window.location.reload();
      }
      setIsMobileScreen(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex]);

  useEffect(() => {
    const slider = document?.querySelector(".mobileGridContainer");
    if (currentIndex) {
      const translationAmount = currentIndex * 100;
      slider.style.transform = `translateX(-${translationAmount}%)`;
    } else if (currentIndex === 0) {
      if (slider) {
        const translationAmount = currentIndex * (100 / Data.features.length);
        slider.style.transform = `translateX(-${translationAmount}%)`;
      }
    }
  }, [currentIndex]);

  return (
    <div>
      <div
        className={isMobileScreen ? "mobileGridContainer" : "gridContainer"}
        style={{ border: "none" }}
      >
        {Data?.features?.map((item, index) => (
          <div
            className={
              isMobileScreen ? "mobileGridBoxContainer" : "gridBoxContainer"
            }
            key={index}
            style={{ backgroundColor: generateBackgroundColor(index) }}
          >
            <div
              className={
                isMobileScreen ? "mobileGridContainerBox" : "gridContainerBox"
              }
            >
              <div
                className={
                  isMobileScreen ? "mobileGridContentBox" : "gridContentBox"
                }
              >
                <img src={item.logo} style={{ width: "50px" }} alt="logo" />
                <p className={isMobileScreen ? "mobileGridTitle" : "gridTitle"}>
                  {item.title}
                </p>
                <p
                  className={
                    isMobileScreen ? "mobileGridContent" : "gridContent"
                  }
                >
                  {item.desc}
                </p>
              </div>
              <div
                className={
                  isMobileScreen ? "mobileImgContainer" : "ImgContainer"
                }
              >
                <img src={item.image} alt={`item-${index}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttonContainer">
        <button onClick={prevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button onClick={nextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default GridBox;
