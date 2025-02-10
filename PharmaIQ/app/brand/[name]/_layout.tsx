import { BrandDetails, fetchBrandDetails } from "@/utils/data_interface";
import BrandDetailsContext from "@/utils/BrandDetailsContext";
import { Stack, Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";

export default function DrugTabsLayout() {
  const { name } = useLocalSearchParams() as { name: string };
  const [brandName, setBrandName] = useState<string>("");
  const [detail, setDetail] = useState<BrandDetails | null>(null);
  const navigation = useNavigation();

  // TODO: useQuery spot
  useEffect(() => {
    async function fetchDetail() {
      console.log("Fetching details for:", name);
      const fetchedDetail = await fetchBrandDetails(name);
      setDetail(fetchedDetail);
    }
    setBrandName(decodeURIComponent(name));
    fetchDetail();
  }, [name]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: brandName });
  }, [brandName]);

  return (
    <BrandDetailsContext.Provider value={detail!}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Stack.Screen name="[name]" options={{}} />
        <Tabs.Screen name="forms" options={{ title: "Forms" }} />
        <Tabs.Screen name="comp" options={{ title: "Composition" }} />
        <Tabs.Screen name="brands" options={{ title: "Brands" }} />
      </Tabs>
    </BrandDetailsContext.Provider>
  );
}
