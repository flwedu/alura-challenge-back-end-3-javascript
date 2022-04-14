export class CSVStringToArrayAdapter {

    constructor() { };

    createArrayFromData(data: string) {

        const rows = data.split("\n");
        const colums = rows.map(row => row.split(","))

        return colums;
    }
}