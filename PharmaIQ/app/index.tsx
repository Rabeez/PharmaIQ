import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SearchIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { fuzzySearch } from "@/utils/search";
import { SearchResultsTable } from "@/components/SearchResultsTable";
import { useDB } from "@/utils/data_interface";

export default function Page() {
  // TODO: is this needed? shouldnt parent DBProvider pass this implicitly?
  const { data } = useDB();
  const [results, setResults] = useState<string[]>([]);

  const runFuzzySearch = (query: string) => {
    // Replace with actual fuzzy search logic
    const matched = fuzzySearch(query, data);
    setResults(matched);
  };

  return (
    <View className="flex flex-col items-center gap-2 px-4 py-12 text-center md:px-6 md:py-24 lg:py-32 xl:py-48">
      <Text
        role="heading"
        className="text-center text-3xl font-bold tracking-tighter color-red-400 native:text-5xl sm:text-4xl md:text-5xl lg:text-6xl"
      >
        Welcome to PharmaIQ
      </Text>
      <Text className="mx-auto max-w-[700px] text-center text-lg text-gray-500 md:text-xl dark:text-gray-400">
        Discover and collaborate on drug information. Explore our services now.
      </Text>

      <View className="gap-4">
        <Button
          size="md"
          variant="outline"
          action="primary"
          className="flex h-9 text-sm"
        >
          <Link suppressHighlighting href="/">
            <ButtonText>Explore</ButtonText>
          </Link>
        </Button>
      </View>

      <View className="w-full gap-4">
        <Input>
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            placeholder="Search..."
            onChangeText={(text) => {
              runFuzzySearch(text);
            }}
          />
        </Input>
      </View>

      <View className="w-full gap-4">
        {results.length > 0 && <SearchResultsTable results={results} />}
      </View>
    </View>
  );
}
