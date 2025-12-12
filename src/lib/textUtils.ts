import React from "react";

export function highlightText(text: string, searchText: string) {
  if (!searchText) return text;

  const regex = new RegExp(`(${searchText})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    regex.lastIndex = 0;
    return regex.test(part)
      ? React.createElement(
          "span",
          { key: index, className: "bg-yellow-200" },
          part
        )
      : part;
  });
}
