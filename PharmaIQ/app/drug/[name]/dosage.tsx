import { VStack } from "@/components/ui/vstack";
import { DrugDetails } from "@/utils/data_interface";
import { useDrugDetails } from "@/utils/DrugDetailsContext";
import { View, Text } from "react-native";

export default function Page() {
  const detail = useDrugDetails();
  // TODO: show skeleton for whole page while deatail is null
  return (
    <View className="flex flex-1 p-2">
      {/* <Tabs.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      <Content
        item={
          detail ?? {
            NAME: "<UNK>",
            OVERVIEW: "Loading...",
            CHARACTERSTICS: "Loading...",
          }
        }
      />
    </View>
  );
}

function Content({ item }: { item: DrugDetails | null }) {
  if (!item) {
    return (
      <View className="color-red-400">
        <Text className="font-bold">Error:</Text> Invalid item data
      </View>
    );
  }
  // TODO: think how to show any missing or N/A values for all fields
  return (
    <View className="text-center">
      <VStack space="md" reversed={false}>
        <Text className="font-bold">DOSAGE</Text>
      </VStack>
    </View>
  );
}
