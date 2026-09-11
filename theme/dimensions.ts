import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const dimensions = {
  screenWidth: width,
  screenHeight: height,
  isSmallDevice: width < 375,

  // Shared component sizing
  tabBarHeight: 64,
  headerHeight: 56,
  buttonHeight: 48,
  inputHeight: 48,
  cardImageHeight: 160,
  avatarSize: 40,
  iconSize: 24,
} as const;
