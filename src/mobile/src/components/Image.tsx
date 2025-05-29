import { useState } from 'react';
import {
  Image as Img,
  StyleProp,
  StyleSheet,
  ImageStyle,
  NativeSyntheticEvent,
  ImageErrorEventData,
  ImageResizeMode,
  ImageSourcePropType,
} from 'react-native';

type ImageSource = string | ImageSourcePropType;

type ComponentProps = {
  src?: ImageSource;
  style?: StyleProp<ImageStyle>;
  useCache?: boolean;
  fallbackImg?: string;
  resizeMode?: ImageResizeMode;
  onError?: () => void;
};

const FinalComponent = ({ src, useCache, onError, style, resizeMode }: ComponentProps) => {
  const isRemote = typeof src === 'string';

  return (
    <Img
      resizeMode={resizeMode}
      style={[styles.image, style]}
      source={isRemote ? { uri: src, ...(useCache ? { cache: 'force-cache' } : {}) } : src}
      onError={onError}
    />
  );
};

export default function Image({
  style,
  src,
  useCache = false,
  resizeMode = 'stretch',
  fallbackImg,
  onError,
}: ComponentProps) {
  const [hasError, setHasError] = useState(false);

  const onImgError = (err?: NativeSyntheticEvent<ImageErrorEventData>) => {
    setHasError(true);
    if (hasError && onError) {
      onError();
    }
    if (err) {
      console.log(err);
    }
  };

  const source = hasError || !src ? fallbackImg : src;

  return (
    <FinalComponent
      style={style}
      src={source}
      useCache={useCache}
      fallbackImg={fallbackImg}
      onError={onImgError}
      resizeMode={resizeMode}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    // height: 300,
    // width: 300,
  },
});
