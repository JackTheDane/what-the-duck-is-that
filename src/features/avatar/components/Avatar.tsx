import { FC, useEffect, useState } from "react";
import { combineClasses } from "../../../utils/combineClasses";
import { PlayerInfo } from "../../player/models/PlayerInfo";
import styles from "./Avatar.module.scss";
import { getAvatarImageUrl } from "../utils/getAvatarImageUrl";
import fallbackAvatarSrc from "../../../assets/fallback-avatar.jpg";

type AvatarProps = Pick<PlayerInfo, "avatarSeed"> & {
  isLeading?: boolean;
  className?: string;
};

export const Avatar: FC<AvatarProps> = ({
  avatarSeed,
  isLeading,
  className,
}) => {
  const [imageSrc, setImageSrc] = useState(getAvatarImageUrl(avatarSeed));

  useEffect(() => {
    setImageSrc(getAvatarImageUrl(avatarSeed));
  }, [avatarSeed]);

  const onImageLoadError = () => setImageSrc(fallbackAvatarSrc);

  return (
    <div className={combineClasses(className, styles.wrapper)}>
      <div
        className={combineClasses(styles.avatar, isLeading && styles.leading)}
      >
        <img src={imageSrc} onError={onImageLoadError} />
      </div>
    </div>
  );
};
