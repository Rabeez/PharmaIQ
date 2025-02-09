import "@/global.css";
import { Link, Slot } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { DBProvider } from "@/utils/data_interface";

// TODO: setup "share" button in drug/brand page header
// this will use deeplinks to navigate to appropriate page
export default function Layout() {
  return (
    <DBProvider>
      <SafeAreaView className="flex flex-1">
        <Header />
        <Slot />
        <Footer />
      </SafeAreaView>
    </DBProvider>
  );
}

function Header() {
  return (
    <View className="flex h-14 w-full flex-row items-center justify-between px-4 align-middle lg:px-6">
      <View className="flex-1 items-start justify-center align-middle font-bold">
        <Button size="md" variant="link" action="primary">
          <Link className="h-full w-full" href="/">
            PharmaIQ
          </Link>
        </Button>
      </View>
      <View className="flex flex-row gap-4 sm:gap-6">
        <Button size="md" variant="link" action="primary">
          <Link
            className="text-md web:underline-offset-4 h-full w-full align-middle font-medium hover:underline"
            href="/about"
          >
            About
          </Link>
        </Button>
        <Button size="md" variant="link" action="primary">
          <Link
            className="text-md web:underline-offset-4 h-full w-full font-medium hover:underline"
            href="/"
          >
            Product
          </Link>
        </Button>
      </View>
    </View>
  );
}

function Footer() {
  return (
    <View className="absolute bottom-0 w-full flex-1 items-start px-4 py-6 md:px-6">
      <Text className={"text-center text-gray-700"}>
        © {new Date().getFullYear()} Me
      </Text>
    </View>
  );
}
