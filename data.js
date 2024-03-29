const connection = new XMLHttpRequest;

// Filtered data from macaroo to easily display them on a chart
const personCount = [[], []];
const languagesCount = [[], [], []];
const firstNames = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
const lastNames = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

connection.addEventListener("load", e => {
    if (connection.status === 200) {
        const json = JSON.parse(connection.response);

        for (let row of json) {
            let str = `
<tr>
    <td>${row["first_name"]}</td>
    <td>${row["last_name"]}</td>
    <td>${row["birth_date"]}</td>
    <td>${row["gender"]}</td>
    <td>${row["index_number"]}</td>
    <td>${row["group"]}</td>
    <td>${row["first_language"]}</td>
    <td>${row["second_language"]}</td>
    <td>${row["due"]}</td>
    <td>${row["university_dormitory"]}</td>
</tr>`
            document.getElementById("target").innerHTML += str;
        }

        for (let row of json) {

            updateDataSet(personCount, row["group"]);

            let month = getMonthFromStringDate(row["birth_date"]);
            let firstNameLetter = row["first_name"][0];
            if (isVowel(firstNameLetter)) {
                updateDataSet(firstNames, month);
            };

            let lastNameLetter = row["last_name"][0];
            if (isVowel(lastNameLetter)) {
                updateDataSet(lastNames, month);
            }

            updateDataSetI(languagesCount, row["first_language"], 1);
            updateDataSetI(languagesCount, row["second_language"], 2);
        }

        createChart1(personCount);
        createChart2(firstNames, lastNames);
        createChart3(languagesCount);
    }
});

connection.open("GET", "https://my.api.mockaroo.com/students_database.json?key=ab70dc60", true);
connection.send();