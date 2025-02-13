import { DrugDetails, fetchDrugDetails } from "@/utils/data_interface";
import DrugDetailsContext from "@/utils/DrugDetailsContext";
import { Stack, Tabs, useGlobalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";

export default function DrugTabsLayout() {
  const { name } = useGlobalSearchParams() as { name: string };
  const [drugName, setDrugName] = useState<string>("");
  // TODO: when navigating to drug page for second time previous drug's info
  // is visible while new drug is loading. this should be shown as skeleton
  const [detail, setDetail] = useState<DrugDetails | null>(null);
  const navigation = useNavigation();

  // TODO: useQuery spot
  useEffect(() => {
    async function fetchDetail() {
      console.log("Fetching details for:", name);
      const fetchedDetail = await fetchDrugDetails(name);
      setDetail(fetchedDetail);
    }
    setDrugName(decodeURIComponent(name));
    fetchDetail();
  }, [name]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: drugName });
  }, [drugName]);

  return (
    <DrugDetailsContext.Provider value={detail!}>
      <Stack.Screen name="[name]" options={{}} />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="info" options={{ title: "Info" }} />
        <Tabs.Screen name="dosage" options={{ title: "Dosage" }} />
        <Tabs.Screen name="brands" options={{ title: "Brands" }} />
      </Tabs>
    </DrugDetailsContext.Provider>
  );
}
