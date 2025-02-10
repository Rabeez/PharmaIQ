import { DrugDetails } from "@/utils/data_interface";
import { useDrugDetails } from "@/utils/DrugDetailsContext";
import { View, Text, ScrollView } from "react-native";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContentText,
  AccordionIcon,
  AccordionContent,
} from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import { ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";

export default function Page() {
  const detail = useDrugDetails();
  // TODO: show skeleton for whole page while deatail is null
  // via useQuery return values
  if (!detail || !detail.DOSAGE) {
    return (
      <View className="flex flex-1 p-2">
        <Text>MISSING dosage</Text>
      </View>
    );
  }
  return (
    <View className="flex flex-1 p-2">
      <Content item={detail} />
    </View>
  );
}

function Content({ item }: { item: DrugDetails }) {
  return (
    <ScrollView>
      <Accordion
        size="md"
        variant="unfilled"
        type="multiple"
        isCollapsible={true}
        isDisabled={false}
        className="border border-outline-200"
      >
        {Object.entries(item.DOSAGE).map(([key, value], index, arr) => {
          const isLast = index === arr.length - 1;
          return (
            <>
              <AccordionItem value={key}>
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText>{key}</AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon
                              as={ChevronUpIcon}
                              className="ml-3"
                            />
                          ) : (
                            <AccordionIcon
                              as={ChevronDownIcon}
                              className="ml-3"
                            />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <AccordionContentText>
                    <VStack>
                      {value === null ? (
                        <Text>No relevant information available.</Text>
                      ) : (
                        Object.entries(value).map(([key, value]) => (
                          <>
                            <Text>
                              <Text className="font-bold">{key}: </Text>
                              {value}
                            </Text>
                          </>
                        ))
                      )}
                    </VStack>
                  </AccordionContentText>
                </AccordionContent>
              </AccordionItem>
              {!isLast && <Divider className="bg-slate-500" />}
            </>
          );
        })}
      </Accordion>
    </ScrollView>
  );
}
