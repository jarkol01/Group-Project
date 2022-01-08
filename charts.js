// Register plugin for manipulating data labels. We use it to display percentages on charts.
Chart.register(ChartDataLabels);

function createChart1(_data) {
    const chartData = {
        labels: _data[0],
        datasets: [
            {
                label: "Liczba osób",
                backgroundColor: [
                    "rgb(255, 99, 132)", "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)", "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)", "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)"
                ],
                borderColor: [
                    "rgb(255, 99, 132)", "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)", "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)", "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)"
                ],
                data: _data[1]
            }
        ]
    };

    const chartConfig = {
        type: "doughnut",
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Liczba studentów w grupie",
                    font: {
                        size: 25
                    },
                    color: "white"
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = (value * 100 / sum) + "%";
                        return percentage;
                    },
                    color: "white"
                }
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                }
            },
            color: "white"
        }
    };
    new Chart(document.getElementById("chart1"), chartConfig);
}

function createChart2(_data1, _data2) {
    const chartData = {
        labels: _data1[0].map((v) => monthNames[v - 1]),
        datasets: [
            {
                label: "Imię",
                backgroundColor: "rgb(255, 99, 132)",
                data: _data1[1]
            },
            {
                label: "Nazwisko",
                backgroundColor: "rgb(75, 192, 192)",
                data: _data2[1]
            }
        ]
    };

    const chartConfig = {
        type: "bar",
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Ranking inicjałów, które są samogłoskami uczniów urodzonych w danym miesiącu",
                    font: {
                        size: 25
                    }
                }
            }
        }
    };
    new Chart(document.getElementById("chart2"), chartConfig);
}

function createChart3(_data) {
    const chartData = {
        labels: _data[0].map((v) => languagesMap[v]),
        datasets: [
            {
                label: "Język ojczysty",
                backgroundColor: "rgb(255,166,77)",
                data: _data[1],
                order: 1
            },
            {
                label: "Język obcy",
                backgroundColor: "rgb(77, 166, 255)",
                borderColor: "rgb(77, 166, 255)",
                data: _data[2],
                type: "line",
                order: 0
            }
        ]
    };

    const chartConfig = {
        type: "bar",
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Różnorodność języków, którymi posługują się studenci",
                    font: {
                        size: 25
                    }
                }
            }
        },
    };

    new Chart(document.getElementById("chart3"), chartConfig);
}