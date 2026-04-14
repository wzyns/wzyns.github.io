"use client";

import { formatDate } from "@/lib/date";

export function LocalDate({ date }: { date: string }) {
  return <time dateTime={date}>{formatDate(new Date(date))}</time>;
}
