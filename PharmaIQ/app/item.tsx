import { VStack } from "@/components/ui/vstack";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export type ItemType = { title: string; author: string; tags: string[] };

export default function Page() {
  const { data } = useLocalSearchParams();
  const item = typeof data === "string" ? (JSON.parse(data) as ItemType) : null;

  return (
    <View className="flex flex-1 p-2">
      <Content item={item} />
    </View>
  );
}

function Content({ item }: { item: ItemType | null }) {
  if (!item) {
    return (
      <View className="color-red-400">
        <Text className="font-bold">Error:</Text> Invalid item data
      </View>
    );
  }
  return (
    <View className="text-center">
      <VStack space="md" reversed={false}>
        <Text className="font-bold">{item.title}</Text>
        <Text className="font-normal">{item.author}</Text>
        <Text className="font-thin">{item.tags}</Text>
      </VStack>
    </View>
  );
}
