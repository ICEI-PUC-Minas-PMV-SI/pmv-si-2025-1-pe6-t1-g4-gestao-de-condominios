import { MaterialIcons } from '@expo/vector-icons';
import { OpaqueColorValue } from 'react-native';
import { Colors } from '@/styles/Colors';

type IconProps = {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string | OpaqueColorValue;
};

export default function Icon({ name, size = 20, color = Colors.white }: IconProps) {
  return <MaterialIcons name={name} size={size} color={color} />;
}
