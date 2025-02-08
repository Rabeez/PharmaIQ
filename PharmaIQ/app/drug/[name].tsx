import { VStack } from "@/components/ui/vstack";
import { DrugDetails, fetchDrugDetails } from "@/utils/data_interface";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Page() {
  const { name } = useLocalSearchParams() as { name: string };
  const [detail, setDetail] = useState<DrugDetails | null>(null);

  useEffect(() => {
    async function fetchDetail() {
      console.log("Fetching details for:", name);
      const fetchedDetail = await fetchDrugDetails(name);
      console.log("Fetched detail:", fetchedDetail);
      setDetail(fetchedDetail);
    }
    fetchDetail();
  }, [name]);

  useEffect(() => {
    console.log("Current detail state:", detail);
  }, [detail]);

  // TODO: show skeleton for whole page while deatail is null
  return (
    <View className="flex flex-1 p-2">
      <Content
        item={
          detail ?? {
            NAME: name,
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
        <Text className="font-bold">{item?.NAME || "No Name"}</Text>
        <Text className="font-thin">{item?.OVERVIEW || "No Overview"}</Text>
        <Text className="font-thin">
          {item?.CHARACTERSTICS || "No Characteristics"}
        </Text>
      </VStack>
    </View>
  );
}
