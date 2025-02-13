import { BrandDetails, fetchBrandDetails } from "@/utils/data_interface";
import BrandDetailsContext from "@/utils/BrandDetailsContext";
import { Stack, Tabs, useGlobalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function BrandTabsLayout() {
  const { name } = useGlobalSearchParams() as { name: string };
  const [brandName, setBrandName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  // TODO: when navigating to drug page for second time previous drug's info
  // is visible while new drug is loading. this should be shown as skeleton
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
    navigation.setOptions({
      headerTitle: (_: any) => (
        <View>
          <Text>{brandName}</Text>
        </View>
      ),
    });
  }, [brandName]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (_: any) => (
        <View>
          <Text>{brandName}</Text>
          <Text className="text-gray-400">{detail?.COMP_NAME}</Text>
        </View>
      ),
    });
  }, [detail]);

  return (
    <BrandDetailsContext.Provider value={detail!}>
      <Stack.Screen name="[name]" options={{}} />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="forms" options={{ title: "Forms" }} />
        <Tabs.Screen name="comp" options={{ title: "Composition" }} />
        <Tabs.Screen name="brands" options={{ title: "Alternate Brands" }} />
      </Tabs>
    </BrandDetailsContext.Provider>
  );
}
