import { Link } from "expo-router";
import { Text, Pressable, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { SearchRecord } from "@/utils/search";
import { Badge, BadgeText } from "./ui/badge";
import { HStack } from "./ui/hstack";

function CustomDivider() {
  return <Divider className="my-0.5 bg-slate-300" />;
}

function SearchHeader({ title }: { title: string }) {
  return <Heading className="my-1">{title}</Heading>;
}

function CustomListItem({ item }: { item: SearchRecord }) {
  // TODO: render company name as "subtitle" for brands
  return (
    <HStack className="w-full place-items-center  p-1 align-middle">
      {item.type === "drug" ? (
        <Badge
          size="sm"
          variant="solid"
          className="mr-2 w-[15%] justify-center rounded-full bg-teal-300"
        >
          <BadgeText>{item.type}</BadgeText>
        </Badge>
      ) : (
        <Badge
          size="sm"
          variant="solid"
          className="mr-2 w-[15%] justify-center rounded-full bg-orange-300"
        >
          <BadgeText>{item.type}</BadgeText>
        </Badge>
      )}
      <Text className="text-lg">{item.data.name}</Text>
    </HStack>
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
    <View className="flex-1">
      {title && <SearchHeader title={title} />}
      <FlashList
        data={results}
        estimatedItemSize={62}
        keyExtractor={(item, index) =>
          `${item.type}-${item.data.code}-${index}`
        }
        renderItem={({ item, index }) => {
          const key = `${item.type}-${item.data.code}-${index}`;
          return (
            <Link
              className="w-full"
              href={
                item.type === "drug"
                  ? `/drug/${encodeURIComponent(item.data.name)}/info`
                  : `/brand/${encodeURIComponent(item.data.name)}/forms`
              }
              asChild
            >
              <Pressable key={key}>
                <CustomListItem item={item} />
              </Pressable>
            </Link>
          );
        }}
        ItemSeparatorComponent={CustomDivider}
      />
    </View>
  );
}
