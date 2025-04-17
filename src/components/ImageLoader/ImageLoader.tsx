import * as React from 'react';
import { memo, useEffect, useState } from 'react';
import Loader from 'components/Loader';
import { ImageLoaderProps } from './ImageLoader.types';
import s from './ImageLoader.module.scss';

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, classname }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <>
      {!isLoaded && (
        <div className={s.loaderContainer}>
          <Loader size="l" />
        </div>
      )}

      {isLoaded && <img className={classname} alt={alt} src={src} />}
    </>
  );
};

export default memo(ImageLoader);
