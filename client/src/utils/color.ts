export const hexToRgba = (hex: string, alpha = 0.3) => {
    const cleanedHex = hex.replace("#", "");

    const r = parseInt(cleanedHex.length === 3 ? cleanedHex[0]+cleanedHex[0] : cleanedHex.slice(0,2), 16);
    const g = parseInt(cleanedHex.length === 3 ? cleanedHex[1]+cleanedHex[1] : cleanedHex.slice(2,4), 16);
    const b = parseInt(cleanedHex.length === 3 ? cleanedHex[2]+cleanedHex[2] : cleanedHex.slice(4,6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getContrastColor = (hex: string | undefined): string => {
    if (!hex) return "#000000";
    
    const cleanedHex = hex?.replace("#", "");

    const r = parseInt(cleanedHex.length === 3 ? cleanedHex[0]+cleanedHex[0] : cleanedHex.slice(0,2), 16);
    const g = parseInt(cleanedHex.length === 3 ? cleanedHex[1]+cleanedHex[1] : cleanedHex.slice(2,4), 16);
    const b = parseInt(cleanedHex.length === 3 ? cleanedHex[2]+cleanedHex[2] : cleanedHex.slice(4,6), 16);

    const yiq = (r*299 + g*587 + b*114) / 1000;

    return yiq >= 128 ? "#000000" : "#ffffff";
};
