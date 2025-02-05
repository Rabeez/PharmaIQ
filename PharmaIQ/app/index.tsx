import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1">
      <Content />
    </View>
  );
}

function Content() {
  return (
    <View className="py-12 md:py-24 lg:py-32 xl:py-48">
      <View className="px-4 md:px-6">
        <View className="flex flex-col items-center gap-4 text-center">
          <Text
            role="heading"
            className="text-center text-3xl font-bold tracking-tighter color-red-400 native:text-5xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Welcome to PharmaIQ
          </Text>
          <Text className="mx-auto max-w-[700px] text-center text-lg text-gray-500 md:text-xl dark:text-gray-400">
            Discover and collaborate on drug information. Explore our services
            now.
          </Text>

          <View className="gap-4">
            <Link
              suppressHighlighting
              className="web:shadow web:focus-visible:outline-none web:focus-visible:ring-1 flex h-9 items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 transition-colors hover:bg-gray-900/90 focus-visible:ring-gray-950 active:bg-gray-400/90 disabled:opacity-50 disabled:pointer-events-none ios:shadow dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="/"
            >
              Explore
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
