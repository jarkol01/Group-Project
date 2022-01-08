let monthNames = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
]

/*
    Stores a translation map between english-polish language names
*/
let languagesMap = {
    "english": "j. angielski",
    "polish": "j. polski",
    "german": "j. niemiecki",
    "spanish": "j. hiszpański",
    "italian": "j. włoski",
    "chinese": "j. chiński",
    "french": "j. francuski",
    "russian": "j. rosyjski"
}
/*
    Returns month number [1; 12]
*/
function getMonthFromStringDate(str_date) {
    // For substring first parameter is inclusive. but the second
    // is exclusive: [3; 5)
    return parseInt(str_date.substring(3, 5));
}

/*
    Returns true if c is a vowel and false otherwise.
    Expects c to be string of length equal to 1
*/
function isVowel(c) {
    c = c.toLowerCase();
    return c == "a" || c == "e" || c == "i" || c == "o" || c == "u";
}

/*
    Updates a Data Set object for a given key
    with a starting value 1 incremented in subsequent calls.
    Data Set is 2D array: [[], []]
*/
function updateDataSet(dataSet, key) {
    updateDataSetI(dataSet, key, 1);
}

/*
    Updates a Data Set object for a given key and index
    with a starting value 1 incremented in subsequent calls.
    Supports variable number of subsets.
    Data Set is 2D array: [[], []...]
    where '[]...' detonates 1 or more array.
*/
function updateDataSetI(dataSet, key, index) {
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


        for (let j = 1; j < dataSet.length; j++) {
            if (j == index) {
                continue;
            }
            dataSet[j].splice(i, 0, 0);
        }
        dataSet[index].splice(i, 0, 1);
    } else {
        dataSet[index][pos]++;
    }
}