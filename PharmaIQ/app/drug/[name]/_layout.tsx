import { DrugDetails, fetchDrugDetails } from "@/utils/data_interface";
import DrugDetailsContext from "@/utils/DrugDetailsContext";
import { Stack, Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";

export default function DrugTabsLayout() {
  const { name } = useLocalSearchParams() as { name: string };
  const [drugName, setDrugName] = useState<string>("");
  const [detail, setDetail] = useState<DrugDetails | null>(null);
  const navigation = useNavigation();

  // TODO: useQuery spot
  useEffect(() => {
    async function fetchDetail() {
      console.log("Fetching details for:", name);
      const fetchedDetail = await fetchDrugDetails(name);
      console.log("Fetched detail:", fetchedDetail);
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
      <Tabs screenOptions={{ headerShown: false }}>
        <Stack.Screen name="[name]" options={{}} />
        <Tabs.Screen name="info" options={{ title: "Info" }} />
        <Tabs.Screen name="dosage" options={{ title: "Dosage" }} />
        <Tabs.Screen name="brands" options={{ title: "Brands" }} />
      </Tabs>
    </DrugDetailsContext.Provider>
  );
}
