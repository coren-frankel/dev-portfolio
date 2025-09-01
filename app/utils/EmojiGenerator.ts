export class EmojiGenerator {
  ranges: { start: number; end: number }[];
  constructor() {
    // Define the main emoji ranges
    this.ranges = [
      { start: 0x2700, end: 0x27bf }, // Dingbats
      { start: 0x1f300, end: 0x1f5ff }, // Miscellaneous Symbols and Pictographs
      { start: 0x1f600, end: 0x1f64f }, // Emoticons
      { start: 0x1f680, end: 0x1f6ff }, // Transport and Map Symbols
      { start: 0x2600, end: 0x26ff }, // Miscellaneous Symbols
    ];
  }

  getRandomEmoji() {
    // Select a random range
    const range = this.ranges[Math.floor(Math.random() * this.ranges.length)];

    // Generate a random code point within that range
    const codePoint =
      range.start + Math.floor(Math.random() * (range.end - range.start + 1));

    // Convert to surrogate pair if needed
    if (codePoint > 0xffff) {
      const high = Math.floor((codePoint - 0x10000) / 0x400) + 0xd800;
      const low = ((codePoint - 0x10000) % 0x400) + 0xdc00;
      return String.fromCodePoint(high) + String.fromCodePoint(low);
    }

    return String.fromCodePoint(codePoint);
  }
}
