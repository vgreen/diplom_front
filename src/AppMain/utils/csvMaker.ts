const processRow = function (row: any) {
    var finalVal = '';
    for (var j = 0; j < row.length; j++) {
        var innerValue = row[j] === null ? '' : row[j].toString();
        if (row[j] instanceof Date) {
            innerValue = row[j].toLocaleString();
        }
        var result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0)
            result = '"' + result + '"';
        if (j > 0)
            finalVal += ',';
        finalVal += result;
    }
    return finalVal + '\n';
};

const formatDataToCsvString = function (data: any[]): string {

    let csvFile = '';
    data.map((item) => Object.values(item)).forEach((item) => csvFile += processRow(item));
    return csvFile;
};


export const csvStringMaker = (data: any[], headers?: string[]) => {
    if (data[0]) {
        let blob = new Blob([processRow(headers || Object.keys(data[0])) + formatDataToCsvString(data)], {type: 'text/csv;charset=utf-8;'});
        return URL.createObjectURL(blob);
    }

};