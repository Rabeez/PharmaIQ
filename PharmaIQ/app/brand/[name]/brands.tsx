import { BrandDetails } from "@/utils/data_interface";
import { View, Text, ScrollView } from "react-native";
import { useBrandDetails } from "@/utils/BrandDetailsContext";
import { CustomList } from "@/components/CustomList";

export default function Page() {
  const detail = useBrandDetails();
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

function Content({ item }: { item: BrandDetails }) {
  return (
    <ScrollView className="h-full w-full">
      <CustomList
        results={item.BRANDS.map((val) => ({ type: "brand", name: val }))}
      />
    </ScrollView>
  );
}
