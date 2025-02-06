import { Link } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SearchIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/table";
import { fuzzySearch } from "@/utils/search";
import type { FuseResult } from "fuse.js";

export default function Page() {
  return (
    <View className="flex flex-1 p-2">
      <Content />
    </View>
  );
}

function Content() {
  const [results, setResults] = useState<FuseResult<any>[]>([]);

  const runFuzzySearch = (query: string) => {
    // Replace with actual fuzzy search logic
    const matched = fuzzySearch(query);
    setResults(matched);
  };

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
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((obj, idx) => (
                  <Link
                    className="w-full"
                    key={idx}
                    href={{
                      pathname: "/item",
                      params: { data: JSON.stringify(obj.item) },
                    }}
                    asChild
                  >
                    <Pressable>
                      <TableRow key={idx}>
                        <TableData>{obj.item.author}</TableData>
                        <TableData>{obj.item.tags.join(", ")}</TableData>
                      </TableRow>
                    </Pressable>
                  </Link>
                ))}
              </TableBody>
            </Table>
          </View>
        </View>
      </View>
    </View>
  );
}
