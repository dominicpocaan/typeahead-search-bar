export default function HighlightedText({
  text,
  highlight,
}: Readonly<{
  text: string;
  highlight: string;
}>) {
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} style={{ color: 'yellow' }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}
