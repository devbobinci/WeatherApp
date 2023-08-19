"use client";

import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout } from "@tremor/react";

type Props = {
  message: string;
  warning?: boolean;
};

export default function CalloutCard({ message, warning }: Props) {
  return (
    <Callout
      title={message}
      icon={warning ? ExclamationIcon : CheckCircleIcon}
      color={warning ? "rose" : "teal"}
      className="mt-4 !flex-row"
    />
  );
}
