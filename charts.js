// Register plugin for manipulating data labels. We use it to display percentages on charts.
Chart.register(ChartDataLabels);

function createChart1(_data) {
    const chartData = {
        labels: _data[0],
        datasets: [
            {
                label: 'Person count',
                backgroundColor: [
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
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Person count of each group',
                    font: {
                        size: 25
                    }
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
                    color: '#fff',
                }
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                }
            }
        }
    };
    new Chart(document.getElementById('chart1'), chartConfig);
}

function createChart2(_data1, _data2) {
    const chartData = {
        labels: _data1[0].map((v) => monthNames[v - 1]),
        datasets: [
            {
                label: 'First Name',
                backgroundColor: 'rgb(255, 99, 132)',
                data: _data1[1]
            },
            {
                label: 'Last Name',
                backgroundColor: 'rgb(75, 192, 192)',
                data: _data2[1]
            }
        ]
    };

    const chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Popularity of names that start with a vowel of students born in a particular month',
                    font: {
                        size: 25
                    }
                }
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                },
            }
        }
    };
    new Chart(document.getElementById('chart2'), chartConfig);
}