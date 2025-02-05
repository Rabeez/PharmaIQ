import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
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
import { Button, ButtonText } from "@/components/ui/button";

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

          <View className="gap-4">
            <Accordion
              size="md"
              variant="filled"
              type="single"
              isCollapsible={true}
              isDisabled={false}
              className="m-5 w-[90%] border border-outline-200"
            >
              <AccordionItem value="a">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText>
                            How do I place an order?
                          </AccordionTitleText>
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
                    To place an order, simply select the products you want,
                    proceed to checkout, provide shipping and payment
                    information, and finalize your purchase.
                  </AccordionContentText>
                </AccordionContent>
              </AccordionItem>
              <Divider />
              <AccordionItem value="b">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText>
                            What payment methods do you accept?
                          </AccordionTitleText>
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
                    We accept all major credit cards, including Visa,
                    Mastercard, and American Express. We also support payments
                    through PayPal.
                  </AccordionContentText>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </View>
        </View>
      </View>
    </View>
  );
}
