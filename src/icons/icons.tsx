import Svg, { Path } from 'react-native-svg';

type IconProps = {
  width?: number;
  height?: number;
  fill?: string;
  stroke? : string
};

export const BackIcon = ({
  width = 24,
  height = 24,
  fill = '#0F0F0F',
  stroke = '#0F0F0F'
}: IconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
        fill={fill}
      />
    </Svg>
  );
};

export const BurgerIcon = ({
  width = 24,
  height = 24,
  stroke = '#0F0F0F',
}: IconProps) => {
    return (
        <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
    >
        <Path d="M5 12H20" stroke={stroke} stroke-width="2" stroke-linecap="round" />
        <Path d="M5 17H20" stroke={stroke} stroke-width="2" stroke-linecap="round"/>
        <Path d="M5 7H20" stroke={stroke} stroke-width="2" stroke-linecap="round" />
    </Svg>
    )
}
