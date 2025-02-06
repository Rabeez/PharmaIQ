import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Link, Slot } from "expo-router";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { DBProvider } from "./dbContext";

export default function Layout() {
  return (
    <DBProvider>
      <Header />
      <Slot />
      <Footer />
    </DBProvider>
  );
}

function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <GluestackUIProvider mode="light">
      <View style={{ paddingTop: top }}>
        <View className="flex h-14 flex-row items-center justify-between px-4 align-middle lg:px-6 ">
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
      </View>
    </GluestackUIProvider>
  );
}

function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <GluestackUIProvider mode="light">
      <View
        className="flex shrink-0 bg-gray-100 native:hidden"
        style={{ paddingBottom: bottom }}
      >
        <View className="flex-1 items-start px-4 py-6 md:px-6 ">
          <Text className={"text-center text-gray-700"}>
            © {new Date().getFullYear()} Me
          </Text>
        </View>
      </View>
    </GluestackUIProvider>
  );
}
