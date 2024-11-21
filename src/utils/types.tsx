import {NavigationProp, RouteProp} from '@react-navigation/native';
import {
  ImageProps,
  ImageRequireSource,
  TextStyle,
  ViewStyle,
} from 'react-native';

type onboarding = {
  item: {
    image: ImageProps;
    content: string;
    title: string;
  };
};

interface RouterProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  loading?: boolean;
  icon?: ImageProps;
  iconStyle?: ImageProps;
  type?: 'outline' | 'fill';
}

interface InputProps {
  style?: ViewStyle;
  titleStyle?: TextStyle;
  value: any;
  showDropDown?: boolean;
  onChangeText: (data: any) => void;
  placeholder?: string;
  disabled?: boolean;
  onPressRight?: (data: any) => void;
  showRightIcon?: boolean;
  showLeftIcon?: boolean;
  showClearIcon?: boolean;
  onPressClear?: (data: any) => void;
  rightIcon?: ImageProps;
  leftIcon?: ImageProps;
  onPressLeft?: (data: any) => void;
  backButton?: boolean;
  placeholderColor?: string;
  label?: string;
  labelStyle?: TextStyle;
  dropDownKey?: string;
  dropDownData?: any;
  inputStyle?: ViewStyle;
  onPressRightIcon?: () => void;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
}

export type DropdownComponentProps = {
  value: string;
  renderLeftIcon?: any;
  data: any;
  setValue: (value: string) => void;
  label?: string;
  placeholder: string;
  containerStyle?: ViewStyle;
  onBlur?: () => void;
  onFocus?: () => void;
  labelField?: string;
  valueField?: string;
  dropDownStyle?: ViewStyle;
  search?: boolean;
};

export type HeaderProps = {
  title?: string;
  borderBottomWidth?: number;
  onBackPressScreen?: () => void;
  onPressClearAll?: () => void;
  isHeartIcon?: boolean;
  onPressHeart?: () => void;
  onPressDelete?: () => void;
  icon?: ImageRequireSource;
  isHeartLoading?: boolean;
  isClearIcon?: boolean;
  isDeleteIcon?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  rightIcon?: any;
  showLogo?: boolean;
};

type ListComponent = {
  amount?: number | string;
  images?: ImageProps;
  onPress?: () => void;
  description?: string;
  containerStyle?: ViewStyle;
  showAddIcon?: boolean;
  showofferBadge?: boolean;
  offerAmount?: number;
  offerIndex?: number;
  index?: number;
  onPressAdd?: () => void;
  descriptionStyle?: TextStyle;
  priceStyle?: TextStyle;
  imageContainerStyle?: ViewStyle;
  heartIcon?: boolean;
  onPressHeart?: () => void;
  isWishlist?: boolean;
};

type BottomModalProps = {
  isVisible?: boolean;
  onClose?: () => void;
  onNextPress?: () => void;
  btnText?: any;
  text1?: string;
  onNextBtnPress?: () => void;
  description?: string;
};

export type {
  onboarding,
  RouterProps,
  PrimaryButtonProps,
  InputProps,
  ListComponent,
  BottomModalProps,
};
