import { View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1">
      <Content />
    </View>
  );
}
function Content() {
  return <View className="text-center">about page</View>;
}
