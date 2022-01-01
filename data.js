const connection = new XMLHttpRequest;

connection.addEventListener("load", e => {
    if (connection.status === 200) {
        const json = JSON.parse(connection.response);
        console.log(json)

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
</tr>
`
            document.getElementById("target").innerHTML += str;
        }
    }
});

connection.open("GET", "https://my.api.mockaroo.com/students_database.json?key=ab70dc60", true);
connection.send();




