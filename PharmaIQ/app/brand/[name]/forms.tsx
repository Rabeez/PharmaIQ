import { BrandDetails } from "@/utils/data_interface";
import { useBrandDetails } from "@/utils/BrandDetailsContext";
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
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const detail = useBrandDetails();
  // TODO: show skeleton for whole page while deatail is null
  // via useQuery return values
  if (!detail || !detail.FORMS) {
    return (
      <View className="flex flex-1 p-2">
        <Text>MISSING FORMS</Text>
      </View>
    );
  }
  return (
    <View className="flex flex-1 p-2">
      <Content item={detail} />
    </View>
  );
}

function Content({ item }: { item: BrandDetails }) {
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
        {Object.entries(item.FORMS).map(([key, value], index, arr) => {
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
                      {value === null || value.length === 0 ? (
                        <Text>No relevant information available.</Text>
                      ) : (
                        <Table className="w-full">
                          <TableHeader>
                            <TableRow>
                              {Object.keys(value[0]).map((col) => (
                                <TableHead>{col}</TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {value.map((val) => (
                              <TableRow>
                                {Object.values(val).map((val) => (
                                  <TableData>{val}</TableData>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
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
