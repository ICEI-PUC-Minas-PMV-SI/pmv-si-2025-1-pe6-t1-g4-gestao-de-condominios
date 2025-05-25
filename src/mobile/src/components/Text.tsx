import { Text as TextRN, TextProps } from "react-native";

type ComponentProps = TextProps;

export default function Text(props: ComponentProps) {
  return <TextRN {...props} />;
}
