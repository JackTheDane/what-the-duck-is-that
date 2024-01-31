import {
  PictureZoomer,
  PictureZoomerProps,
} from "../../pictureZoomer/components/PictureZoomer";
import styles from "./PictureZoomerSlideShow.module.scss";
import charmander from "../../../assets/c.png";
import biksemad from "../../../assets/biksemad.webp";
import guldkorn from "../../../assets/guldkorn.jpg";
import kat from "../../../assets/kat.jpg";
import tommy from "../../../assets/tommy.jpg";
import hagrid from "../../../assets/hagrid.jpg";
import vanillaCoke from "../../../assets/vanilla_cherry_coke.png";
import appelsin from "../../../assets/appelsin.jpg";
import dronning from "../../../assets/dronning.jpg";
import santa from "../../../assets/santa.png";
import silverOrnament from "../../../assets/silver_ornament.jpg";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/Button";
import { useCombinedClasses } from "../../../hooks/useCombinedClasses";
import { useKeyboardEvent } from "../../../hooks/useKeyboardEvent";
import { ROUTES } from "../../../routes";
import clamp from "lodash/clamp";

const data: PictureZoomerProps[] = [
  {
    name: "En appelsin!",
    src: appelsin,
  },
  {
    name: "Julemanden!",
    src: santa,
  },
  {
    name: "Charmander!",
    src: charmander,
    transformCenter: {
      x: 17,
      y: 80,
    },
  },
  {
    name: "MISSEN!! (Aka. Tali)",
    src: kat,
    transformCenter: {
      x: 60,
      y: 35,
    },
  },
  {
    name: "En sund & nærende morgenmad!",
    src: guldkorn,
    transformCenter: {
      x: 57,
      y: 60,
    },
  },
  {
    name: "PS1 Hagrid",
    src: hagrid,
    transformCenter: {
      x: 40,
      y: 44,
    },
  },
  {
    name: "Vores allesammens majestæt 👑!",
    src: dronning,
  },
  {
    name: "Biksemad!",
    src: biksemad,
    transformCenter: {
      x: 60,
      y: 50,
    },
  },
  {
    name: "Vanilla cherry coke... 🤢",
    src: vanillaCoke,
    transformCenter: {
      x: 50,
      y: 68,
    },
  },
  {
    name: "Tommy Wiseau",
    src: tommy,
    transformCenter: {
      x: 48,
      y: 50,
    },
  },
  {
    name: "Et fint sølvsmykke 💖",
    src: silverOrnament,
  },
];

const maxSlideIndex = data.length - 1;

export const PictureZoomerSlideShow = () => {
  const navigate = useNavigate();
  const { slideIndex: slideIndexString, quizId } = useParams();
  const slideIndex = slideIndexString ? Number(slideIndexString) : 0;

  if (!quizId) {
    return <Navigate to={ROUTES.home} />;
  }

  const goToPreviousSlide = () => {
    navigate(
      ROUTES.quiz.play.route(quizId, clamp(slideIndex - 1, 0, maxSlideIndex))
    );
  };

  const goToNextSlide = () => {
    navigate(
      ROUTES.quiz.play.route(quizId, clamp(slideIndex + 1, 0, maxSlideIndex))
    );
  };

  useKeyboardEvent((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        goToPreviousSlide();
        break;

      case "ArrowRight":
        goToNextSlide();
        break;
    }
  });

  const selectedPicture = data[slideIndex] ?? data[0];

  return (
    <div className={styles.slideshow}>
      {slideIndex > 0 ? (
        <Button
          onClick={goToPreviousSlide}
          size="large"
          className={useCombinedClasses(
            styles.slideIndexButton,
            slideIndex === 0 && styles.hidden
          )}
        >
          👈
        </Button>
      ) : (
        <Button
          onClick={() => navigate(ROUTES.lobby)}
          size="large"
          className={styles.slideIndexButton}
        >
          <span>☕</span>
          Lobby
        </Button>
      )}

      <div className={styles.zoomerWrapper}>
        <PictureZoomer {...selectedPicture} key={slideIndex} />
      </div>

      {slideIndex < maxSlideIndex ? (
        <Button
          onClick={goToNextSlide}
          size="large"
          className={styles.slideIndexButton}
        >
          👉
        </Button>
      ) : (
        <Button
          onClick={() => navigate(ROUTES.quiz.winner.route(quizId))}
          size="large"
          className={styles.slideIndexButton}
        >
          👑
        </Button>
      )}
    </div>
  );
};
