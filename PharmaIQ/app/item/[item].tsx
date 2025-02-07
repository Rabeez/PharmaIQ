import { VStack } from "@/components/ui/vstack";
import { DrugDetails, fetchDrugDetails } from "@/utils/data_interface";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";

export default function Page() {
  const { item: rawItem } = useLocalSearchParams() as { item: string };
  const [item] = useState(rawItem); // Store the item once
  const detailRef = useRef<DrugDetails | null>(null);
  const [detail, setDetail] = useState<DrugDetails | null>(null);
  useEffect(() => {
    async function fetchDetail() {
      if (!detailRef.current) {
        console.log("Fetching details for:", item);
        const fetchedDetail = await fetchDrugDetails(item);
        console.log("Fetched detail:", fetchedDetail);
        detailRef.current = fetchedDetail;
        setDetail(fetchedDetail);
      } else {
        console.log("Using cached detail:", detailRef.current);
        setDetail(detailRef.current); // Use cached detail
      }
    }
    fetchDetail();
  }, [item]);
  useEffect(() => {
    console.log("Current detail state:", detail);
  }, [detail]);

  return (
    <View className="flex flex-1 p-2">
      <Content
        item={
          detail ?? {
            name: item,
            overview: "Loading...",
            characteristics: "NONE...",
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
  return (
    <View className="text-center">
      <VStack space="md" reversed={false}>
        <Text className="font-bold">Debug: {JSON.stringify(item)}</Text>
        <Text className="font-bold">{item?.name || "No Name"}</Text>
        <Text className="font-thin">{item?.overview || "No Overview"}</Text>
        <Text className="font-thin">
          {item?.characteristics || "No Characteristics"}
        </Text>
      </VStack>
    </View>
  );
}
