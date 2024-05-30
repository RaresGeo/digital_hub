export const COLORS = {
  primary: "#FAF0E6",
  secondary: "#000000",
};

export const getColor = (color: string | undefined): string => {
  switch (true) {
    case color === undefined:
      return "transparent";
    case color!.startsWith("$"):
      return COLORS[color.slice(1) as keyof typeof COLORS];
    default:
      return color as string;
  }
};
