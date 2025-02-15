import "@/global.css";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { DBProvider } from "@/utils/data_interface";

// TODO: setup "share" button in drug/brand page header
// this will use deeplinks to navigate to appropriate page
export default function Layout() {
  return (
    <DBProvider>
      <SafeAreaView className="flex flex-1">
        <Stack></Stack>
      </SafeAreaView>
    </DBProvider>
  );
}
