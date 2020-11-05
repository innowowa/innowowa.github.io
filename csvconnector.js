$(document).ready(function (datasource) {

    var indicator = $('#CSV').val();
    var datasource = "https://cors-anywhere.herokuapp.com/http://41.87.7.147:3000/api/facilities/download?data={%22where%22:{},%22format%22:%22excel%22}";
    var myConnector = tableau.makeConnector();
    
    $('#CSV').on('change keyup paste click', function() {
    indicator = $('#CSV').val();
    datasource = "https://cors-anywhere.herokuapp.com/http://41.87.7.147:3000/api/facilities/download?data={%22where%22:{},%22format%22:%22excel%22}";
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
            datasource = "https://cors-anywhere.herokuapp.com//http://41.87.7.147:3000/api/facilities/download?data={%22where%22:{},%22format%22:%22excel%22}";
            tableau.connectionData = datasource;
            tableau.connectionName = "OHSP Data";
            tableau.connectionData = datasource;
            tableau.submit();
        });
    });
});
