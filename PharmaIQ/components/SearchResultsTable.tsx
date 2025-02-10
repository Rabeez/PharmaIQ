import { Link } from "expo-router";
import { Text, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { SearchRecord } from "@/utils/search";

const CustomDivider = () => <Divider className="my-0.5" />;

function SearchHeader({ title }: { title: string }) {
  return <Heading className="my-1">{title}</Heading>;
}

function CustomListItem({ item }: { item: SearchRecord }) {
  // TODO: this function should switch on type and return relevant component
  return (
    <Text>
      <Text className="font-bold">{item.type}</Text>
      {item.name}
    </Text>
  );
}

export function CustomList({
  results,
  title,
}: {
  results: SearchRecord[];
  title?: string;
}) {
  // TODO: "scroll-to-top" button visible automatically for long lists etc
  // https://youtu.be/pZgjlh5ezd4?si=pypM7_5kkBwy6Q2Z&t=683
  return (
    <FlashList
      data={results}
      renderItem={({ item, index }) => (
        <Link
          className="w-full"
          key={index}
          href={
            item.type === "drug"
              ? `/drug/${encodeURIComponent(item.name)}/info`
              : `/brand/${encodeURIComponent(item.name)}/forms`
          }
          asChild
        >
          <Pressable>
            <CustomListItem item={item} />
          </Pressable>
        </Link>
      )}
      ItemSeparatorComponent={CustomDivider}
      ListHeaderComponent={
        title ? () => <SearchHeader title={title} /> : undefined
      }
    />
  );
}
