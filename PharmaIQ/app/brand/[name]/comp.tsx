import { BrandDetails } from "@/utils/data_interface";
import { View, Text, ScrollView } from "react-native";
import { useBrandDetails } from "@/utils/BrandDetailsContext";
import { CustomList } from "@/components/SearchResultsTable";

export default function Page() {
  const detail = useBrandDetails();
  // TODO: show skeleton for whole page while deatail is null
  // via useQuery return values
  if (!detail || !detail.COMPOSITION || detail.COMPOSITION.length === 0) {
    return (
      <View className="flex flex-1 p-2">
        <Text>MISSING composition</Text>
      </View>
    );
  }
  return (
    <View className="flex flex-1 p-2">
      <Content item={detail} />
    </View>
  );
}

function Content({ item }: { item: BrandDetails }) {
  return (
    <ScrollView className="h-full w-full">
      <CustomList
        results={item.COMPOSITION.map((val) => ({ type: "drug", name: val }))}
      />
    </ScrollView>
  );
}
