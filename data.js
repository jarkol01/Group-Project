const connection = new XMLHttpRequest;

connection.addEventListener("load", e => {
    if (connection.status === 200) {
        const json = JSON.parse(connection.response);
        console.log(json)

        let personCount = {};
        let foreignLanguagePercentage = {};
        let namesStartingWithVowel = {
            "Januray": {}, "Febuary": {}, "March": {},
            "April": {}, "May": {}, "June": {}, "July": {},
            "August": {}, "September": {}, "October": {},
            "November": {}, "December": {}
        };

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

            updateHashTable(personCount, row["group"])
            updateHashTable(foreignLanguagePercentage, row["second_language"]);

            let monthName = getMonthNameFromStringDate(row["birth_date"]);
            let firstNameLetter = row["first_name"][0];

            updateHashTable(namesStartingWithVowel[monthName], firstNameLetter, isVowel);

            let lastNameLetter = row["last_name"][0];

            updateHashTable(namesStartingWithVowel[monthName], lastNameLetter, isVowel);
        }
        console.log(personCount);
        console.log(foreignLanguagePercentage);
        console.log(namesStartingWithVowel);
    }
});

connection.open("GET", "https://my.api.mockaroo.com/students_database.json?key=ab70dc60", true);
connection.send();

/*
    Returns month name from a string date. Requries the date format to be:
        * dd-mm-yyyy
        * dd/mm/yyyy
    Or any other separtor as long as month is always a 2-digit number and
    starts at position 3 (counting from 0)
*/
let getMonthNameFromStringDate = (str_date) => {
    // For substring first parameter is inclusive. but the second
    // is exclusive: [3; 5)
    let monthNumber = parseInt(str_date.substring(3, 5));

    let monthNames = [
        "Januray", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    return monthNames[monthNumber - 1];
};

/*
    Returns true if c is a vowel and false otherwise.
    Expects c to be string of length equal to 1
*/
let isVowel = (c) => {
    c = c.toLowerCase();
    return c == "a" || c == "e" || c == "i" || c == "o" || c == "u";
}

/*
    Updates HashTable object for a given key
    with a starting value 1 incremented in subsequent calls
*/
let updateHashTable = (hashTable, key, keyConstraint = (_key) => { return true; }) => {
    if (keyConstraint(key)) {
        if (!(key in hashTable)) {
            hashTable[key] = 1;
        } else {
            hashTable[key]++;
        }
    }
}