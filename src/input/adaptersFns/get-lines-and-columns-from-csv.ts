export function getLinesAndColumnsFromCSV(source: string) {

    const rows = source.split("\n");
    const colums = rows.map(row => row.split(","))

    return colums;
}