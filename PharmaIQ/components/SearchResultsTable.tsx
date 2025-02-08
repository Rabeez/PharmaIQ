import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/table";
import { Link } from "expo-router";
import { View, Text, StatusBar, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";

const CustomDivider = () => <Divider className="my-0.5" />;
const SearchHeader = () => <Heading className="my-1">Search results</Heading>;

export function SearchResultsTable({ results }: { results: string[] }) {
  return (
    <FlashList
      data={results}
      renderItem={({ item, index }) => (
        <Link
          className="w-full"
          key={index}
          href={`/drug/${encodeURIComponent(item)}`}
          asChild
        >
          <Pressable>
            <Text>{item}</Text>
          </Pressable>
        </Link>
      )}
      ItemSeparatorComponent={CustomDivider}
      ListHeaderComponent={SearchHeader}
    />
  );
}
