$(document).ready(function (datasource) {
    var indicator = $('#CSV').val();
    var datasource = "https://cors-anywhere.herokuapp.com/https://ohsp.health.gov.mw/api/29/analytics/events/query/uYjxkTbwRNf.csv?dimension=pe:THIS_YEAR&dimension=ou:lZsCb6y0KDX&dimension=dDHkBd3X8Ce.MABBsj6O2Un&dimension=dDHkBd3X8Ce.ENRjVGxVL6l&dimension=dDHkBd3X8Ce.NI0QRzJvQ0k&dimension=dDHkBd3X8Ce.Xhdn49gUd52&dimension=dDHkBd3X8Ce.ovY6E8BSdto&dimension=dDHkBd3X8Ce.HAZ7VQ730yn&stage=dDHkBd3X8Ce&displayProperty=NAME&tableLayout=true&columns=pe;ou;MABBsj6O2Un;ENRjVGxVL6l;oindugucx72;NI0QRzJvQ0k;Xhdn49gUd52;ovY6E8BSdto;HAZ7VQ730yn&rows=pe;ou;MABBsj6O2Un;ENRjVGxVL6l;oindugucx72;NI0QRzJvQ0k;Xhdn49gUd52;ovY6E8BSdto;HAZ7VQ730yn";
    var myConnector = tableau.makeConnector();

    var username = "danielmapemba";
    var password = "Covtest@20";
    
    $('#CSV').on('change keyup paste click', function() {
    indicator = $('#CSV').val();
    //datasource = "https://cors-anywhere.herokuapp.com/https://ohsp.health.gov.mw/api/29/analytics/events/query/uYjxkTbwRNf.csv?dimension=pe:THIS_YEAR&dimension=ou:lZsCb6y0KDX&dimension=dDHkBd3X8Ce.MABBsj6O2Un&dimension=dDHkBd3X8Ce.ENRjVGxVL6l&dimension=dDHkBd3X8Ce.NI0QRzJvQ0k&dimension=dDHkBd3X8Ce.Xhdn49gUd52&dimension=dDHkBd3X8Ce.ovY6E8BSdto&dimension=dDHkBd3X8Ce.HAZ7VQ730yn&stage=dDHkBd3X8Ce&displayProperty=NAME&tableLayout=true&columns=pe;ou;MABBsj6O2Un;ENRjVGxVL6l;oindugucx72;NI0QRzJvQ0k;Xhdn49gUd52;ovY6E8BSdto;HAZ7VQ730yn&rows=pe;ou;MABBsj6O2Un;ENRjVGxVL6l;oindugucx72;NI0QRzJvQ0k;Xhdn49gUd52;ovY6E8BSdto;HAZ7VQ730yn";
    tableau.connectionData = datasource;
    });
    
    myConnector.getSchema = function (schemaCallback) {

        var source = tableau.connectionData;

        function make_base_auth(username, password) {
            var tok = username + ':' + password;
            var hash = btoa(tok);
            return "Basic " + hash;
        };
        
        $.ajax({
            url: source,
            dataType: "text",
            //crossDomain: true,
            headers: { 'Authorization': make_base_auth(username, password)}

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

        function make_base_auth(username, password) {
            var tok = username + ':' + password;
            var hash = btoa(tok);
            return "Basic " + hash;
        };
        
        $.ajax({
            url: source,
            dataType: "text",
            crossDomain: true,
            headers: { 'Authorization': make_base_auth(username, password)}

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
            //datasource = "https://cors-anywhere.herokuapp.com/https://ohsp.health.gov.mw/api/29/analytics/events/query/uYjxkTbwRNf.csv?dimension=pe:THIS_YEAR&dimension=ou:lZsCb6y0KDX&dimension=dDHkBd3X8Ce.MABBsj6O2Un&dimension=dDHkBd3X8Ce.ENRjVGxVL6l&dimension=dDHkBd3X8Ce.NI0QRzJvQ0k&dimension=dDHkBd3X8Ce.Xhdn49gUd52&dimension=dDHkBd3X8Ce.ovY6E8BSdto&dimension=dDHkBd3X8Ce.HAZ7VQ730yn&stage=dDHkBd3X8Ce&displayProperty=NAME&tableLayout=true&columns=pe;ou;MABBsj6O2Un;ENRjVGxVL6l;oindugucx72;NI0QRzJvQ0k;Xhdn49gUd52;ovY6E8BSdto;HAZ7VQ730yn&rows=pe;ou;MABBsj6O2Un;ENRjVGxVL6l;oindugucx72;NI0QRzJvQ0k;Xhdn49gUd52;ovY6E8BSdto;HAZ7VQ730yn";
            tableau.connectionData = datasource;
            tableau.connectionName = "OHSP Data";
            tableau.connectionData = datasource;
            tableau.submit();
        });
    });
});