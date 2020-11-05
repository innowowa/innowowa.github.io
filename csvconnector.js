$(document).ready(function (datasource) {

    var indicator = $('#CSV').val();
    var datasource = "https://cors-anywhere.herokuapp.com/https://go.votomobile.org/share/a/reports/bb6006d83645c7d9eb32ace3a4d23b413024ba20";
    var myConnector = tableau.makeConnector();
    
    $('#CSV').on('change keyup paste click', function() {
    indicator = $('#CSV').val();
    datasource = "https://cors-anywhere.herokuapp.com/https://go.votomobile.org/share/a/reports/bb6006d83645c7d9eb32ace3a4d23b413024ba20";
    tableau.connectionData = datasource;
    });
    
    myConnector.getSchema = function (schemaCallback) {

        var source = tableau.connectionData;
        
        $.ajax({
            url: source,
            dataType: "text"
        }).done(successFunction);

        function successFunction(data) {
            var data = data.replace(/\"/g, "");
            var data = data.replace(/ /g, '');
            var allRows = data.split(/\r?\n|\r/);
            var cols = [];
            for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
                var rowCells = allRows[singleRow].split(',');
                for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
                    if (singleRow === 0) {
                        x = rowCells[rowCell];

                        y = {
                            id: x,
                            alias: x,
                            dataType: tableau.dataTypeEnum.string
                        };
                        cols.push(y);
                    }
                }
            }
            console.log(cols);
            var tableInfo = {
                id: "OHSPData",
                alias: "OHSPData",
                columns: cols
            };

            schemaCallback([tableInfo]);
        }
    };

    myConnector.getData = function (table, doneCallback) {

        
        var source = tableau.connectionData;
        
        $.ajax({
            url: source,
            dataType: "text",
        }).done(successFunction);

        function successFunction(data) {
            var data = data.replace(/\"/g, "");
            var allRows = data.split(/\r?\n|\r/);
            var tableData = [];
            var cols = [];
            for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
                var rowCells = allRows[singleRow].split(',');
                for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
                    if (singleRow === 0) {
                        x = rowCells[rowCell];
                        y = {
                            id: x,
                            alias: x,
                            dataType: tableau.dataTypeEnum.string
                        };
                        cols.push(y);
                    }
                }
                if (singleRow != 0) {
                    x = rowCells;

                    tableData.push(x);
                }
            }

            table.appendRows(tableData);
            doneCallback();
        }
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            indicator = $('#CSV').val();
            datasource = "https://cors-anywhere.herokuapp.com/https://go.votomobile.org/share/a/reports/bb6006d83645c7d9eb32ace3a4d23b413024ba20";
            tableau.connectionData = datasource;
            tableau.connectionName = "OHSP Data";
            tableau.connectionData = datasource;
            tableau.submit();
        });
    });
});