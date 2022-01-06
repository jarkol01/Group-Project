let monthNames = [
    "Januray", "Febuary", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

/*
    Returns month number [1; 12]
*/
let getMonthFromStringDate = (str_date) => {
    // For substring first parameter is inclusive. but the second
    // is exclusive: [3; 5)
    return parseInt(str_date.substring(3, 5));
}

/*
    Returns true if c is a vowel and false otherwise.
    Expects c to be string of length equal to 1
*/
let isVowel = (c) => {
    c = c.toLowerCase();
    return c == "a" || c == "e" || c == "i" || c == "o" || c == "u";
}

/*
    Updates a Data Set object for a given key
    with a starting value 1 incremented in subsequent calls.
    Data Set is 2D array: [[], []]
*/
let updateDataSet = (dataSet, key) => {
    let pos = -1;

    for (let i = 0; i < dataSet[0].length; i++) {
        if (dataSet[0][i] == key) {
            pos = i;
            break;
        }
    }

    if (pos == -1) {
        let i;
        for (i = 0; i < dataSet[0].length; i++) {
            if (dataSet[0][i] < key) {
                continue;
            }
        }
        
        dataSet[0].splice(i, 0, key); // insert at i-th position
        dataSet[1].splice(i, 0, 1);
    } else {
        dataSet[1][pos]++;
    }
}