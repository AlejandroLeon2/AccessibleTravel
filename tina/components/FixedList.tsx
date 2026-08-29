import React from "react";

export const FixedList = ({ input }: { input: any }) => {
  const items = input.value || [];
  return (
    <div>
      {items.map((item: any, i: number) => (
        <div key={i}>
          <strong>{item.labels?.es || item.labels?.en}</strong> — {item.href}
        </div>
      ))}
    </div>
  );
};
