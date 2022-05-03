export function getLinesAndColumnsFromCSV(source: string) {
  const rows = source.split("\n")
  const columns = rows.map((row) => row.split(","))

  return columns
}
