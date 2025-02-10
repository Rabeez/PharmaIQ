import { DrugDetails } from "@/utils/data_interface";
import { useDrugDetails } from "@/utils/DrugDetailsContext";
import { View, Text, ScrollView } from "react-native";
import { CustomList } from "@/components/SearchResultsTable";

export default function Page() {
  const detail = useDrugDetails();
  // TODO: show skeleton for whole page while deatail is null
  // via useQuery return values
  if (!detail || !detail.BRANDS || detail.BRANDS.length === 0) {
    return (
      <View className="flex flex-1 p-2">
        <Text>MISSING brands</Text>
      </View>
    );
  }
  return (
    <View className="flex flex-1 p-2">
      <Content item={detail} />
    </View>
  );
}

function Content({ item }: { item: DrugDetails }) {
  return (
    <ScrollView>
      <CustomList
        results={item.BRANDS.map((val) => ({ type: "brand", name: val }))}
      />
    </ScrollView>
  );
}
