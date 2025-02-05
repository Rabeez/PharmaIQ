import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Link, Slot } from "expo-router";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
}

function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <GluestackUIProvider mode="light">
      <View style={{ paddingTop: top }}>
        <View className="flex h-14 flex-row items-center justify-between px-4 lg:px-6 ">
          <View className="flex-1 items-start justify-center font-bold">
            <Link href="/">PharmaIQ</Link>
          </View>
          <View className="flex flex-row gap-4 sm:gap-6">
            <Link
              className="text-md web:underline-offset-4 font-medium hover:underline"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-md web:underline-offset-4 font-medium hover:underline"
              href="/"
            >
              Product
            </Link>
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
