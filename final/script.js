let etfNumbers = 3;
let removeBtnID = 4;
let tickerID = 4;
let tickerIDList = [1, 2, 3];
let range = "5y";
let seriesOptions = [];
let seriesCounter = 0;

function arrayRemove(arr, value) {

    return arr.filter(function(ele) {
        return ele != value;
    });
}

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "e20fec8ccbmshabd9e19876ee1ffp11f459jsn95920f4d367e",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
    }
};

const createChart = (seriesOptions) => {
    // console.log(seriesOptions);

    Highcharts.stockChart('canvas', {

        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                formatter: function() {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true
        },

        global: {
            useUTC: false
        },

        series: seriesOptions
    });
};

const parseData = (timeStamp, adjClose) => {
    let DataList = [];
    for (var i = 0; i < timeStamp.length; i++) {
        DataList.push([timeStamp[i] * 1000, adjClose[i]]);
    }
    return DataList;
};



$(() => {
    $("#Content").on("click", "#addButton", () => {
        if (etfNumbers < 5) {
            let tickerSelector = $(`<div class="input-group custom-checkbox">` +
                `<div class="input-group-prepend">` +
                `<div class="input-group-text">` +
                `<input type="checkbox" aria-label="Checkbox for following text input" id="checkbox_${tickerID}">` +
                `</div>` +
                `</div>` +
                `<input type="text" class="form-control" aria-label="Text input with checkbox" value="" id="ticker_${tickerID}">` +
                `</div>`
            );
            let removeBtn = $(`<button type="button" class="btn btn-outline-primary remove-btn" id="remove_btn_${removeBtnID}">－</button>`)
            $("#tickerList").append(tickerSelector);
            etfNumbers++;
            $(tickerSelector).append(removeBtn);
            removeTickerID = "#" + "remove_btn_" + String(removeBtnID)
            tickerIDList.push(tickerID);
            removeBtnID++;
            tickerID++;
        } else {
            alert("Max ETF Numbers: 5!");
            // $("#addButton").hide();
        }
    });

    $("#Content").on("click", ".remove-btn", event => {
        let removeTickerID = "#" + event.target.id;
        $(removeTickerID).parent().remove();
        tickerIDList = arrayRemove(tickerIDList, event.target.id.substring(11));
        etfNumbers--;
    });

    $("#clear-btn").click(() => {
        $(".form-control").val("")
        $("input:checkbox").prop("checked", false);
    });

    $("#checkAll").click(function() {
        $('input:checkbox').not(this).prop('checked', this.checked);

    });

    $("#api-btn").click(() => {
        let apiKey = $("#api-key").val();
        settings.headers["x-rapidapi-key"] = apiKey;
        // console.log(`Your API Key = ${apiKey}`)
    });

    $("#buttonList").on("click", ".range-btn", event => {
        range = $("#" + event.target.id).text();
        // console.log(range);
    })

    $(".createBtn").on("click", () => {
        let tickerList = []
        $(".createBtn").empty();
        $(".createBtn").prepend(`<span class="spinner-border spinner-border-sm m-1 "></span>`);
        $(".createBtn").append("Loading...");
        tickerIDList.forEach(id => {
            check = "#checkbox_" + id;
            if ($(check).is(":checked")) {
                tic = "#ticker_" + id;
                ticker = $(tic);
                tickerList.push(ticker.val());
            }
            // console.log(tickerList);
        })
        let seriesOptions = [];
        let seriesCounter = 0;

        tickerList.forEach((ticker, i) => {
            settings.url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?" + "interval=1d&" + "symbol=" + ticker + "&" + "range=" + range + "&region=US";
            $.ajax(settings).done(function(response, status, xhr) {
                let originalData = response;
                let remainingCalls = xhr.getResponseHeader("x-ratelimit-requests-remaining");
                let adjClose = originalData.chart.result[0].indicators.adjclose[0].adjclose;
                let timeStamp = originalData.chart.result[0].timestamp;
                let pdata = parseData(timeStamp, adjClose);
                // console.log(data);
                seriesOptions[i] = {
                    name: ticker,
                    data: pdata
                };
                seriesCounter++;
                // console.log(ticker + ", Finish", tickerList.length)
                if (seriesCounter === tickerList.length) {
                    // console.log(seriesOptions)
                    // console.log("create");
                    createChart(seriesOptions);
                    $(".createBtn").empty()
                    $(".spinner-border").remove();
                    $(".createBtn").removeClass("has-spinner");
                    $(".createBtn").append("Create Chart")
                    $('html, body').animate({
                        scrollTop: $("#Header").offset().top
                    }, 1000);
                    $("#remaining-calls").empty();
                    $("#remaining-calls").append("Remaining calls = " + remainingCalls);
                }
            });
        });


    });
});