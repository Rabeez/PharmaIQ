import { Link, Stack } from "expo-router";
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
    <View className="flex flex-col items-center gap-2 p-4 text-center md:px-6 md:py-24 lg:py-32 xl:py-48">
      <Stack.Screen options={{ headerTitle: "Home" }} />
      <View className="w-full">
        <Input>
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            placeholder="Search for Drug or Brand..."
            onChangeText={(text) => {
              runFuzzySearch(text);
            }}
          />
        </Input>
      </View>

      <View className="w-full">
        {results.length > 0 && <SearchResultsTable results={results} />}
      </View>
    </View>
  );
}
