import Svg, { Path, Rect } from 'react-native-svg';

// Vector reconstruction from the supplied Figma close-up.
export function BrandMark({ size = 66 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 144 144" aria-hidden={true}>
      <Rect width="144" height="144" rx="34" fill="#39396E" />
      <Path
        fill="#E9EBE8"
        fillRule="evenodd"
        d="M75 63C81 55 85 43 87 32C89 21 94 16 101 21C110 28 122 42 127 53C133 68 125 76 111 78C100 80 88 78 79 78C72 82 66 87 62 94C61 99 68 109 68 115C69 123 60 124 51 121C37 117 21 101 16 89C11 78 15 70 26 66C39 60 56 62 75 63ZM38 78C40 83 44 89 48 92C50 86 53 82 56 78C50 77 44 77 38 78ZM93 63C99 64 103 63 107 62C107 57 103 52 99 48C97 53 95 59 93 63Z"
      />
    </Svg>
  );
}

export function BrandStar() {
  return (
    <Svg width={62} height={45} viewBox="0 0 112 80" aria-hidden={true}>
      <Path fill="#39396E" d="M56 0L60 29L84 9L65 34L112 39L66 43L79 73L60 50L55 80L51 51L32 71L46 45L0 40L46 35L34 10L51 29Z" />
    </Svg>
  );
}
