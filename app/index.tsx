import { Stack } from "expo-router";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { fuzzySearch, SearchRecord } from "@/utils/search";
import { CustomList } from "@/components/CustomList";
import { useDB } from "@/utils/data_interface";

export default function Page() {
  // TODO: is this needed? shouldnt parent DBProvider pass this implicitly?
  const { data } = useDB();
  const [results, setResults] = useState<SearchRecord[]>([]);

  const runFuzzySearch = (query: string) => {
    const matched = fuzzySearch(query, data);
    setResults(matched);
  };

  return (
    <View className="flex flex-1 flex-col items-center gap-2 p-4 text-center md:px-6 md:py-24 lg:py-32 xl:py-48">
      <Stack.Screen
        options={{
          headerTitle: (_: any) => (
            <View>
              <Text>Home</Text>
            </View>
          ),
        }}
      />
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

      <View className="h-full w-full">
        {results.length > 0 && (
          <CustomList results={results} title="Search Results" />
        )}
      </View>
    </View>
  );
}
