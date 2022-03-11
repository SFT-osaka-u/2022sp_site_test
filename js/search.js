var dataArr;

function getData() {
    fetch(
        `https://script.google.com/macros/s/AKfycbxMwU-INmESsqo36ibAISYHRAvbq2PWryO4AphSU-bTZ9TrJBgz6tRpcGWbb6nStcx6/exec`,
        {
            method: "GET"
        }
    ).then((response) => {
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    }).then(function (data) {
        dataArr = data;
        // console.log(dataArr);
        // console.log(Object.keys(dataArr));
    }).catch(function (error) {
        console.log("fetch failed: " + error);
    });
}

function isbnSearch(isbn) {
    let min = 1;
    let max = Object.keys(dataArr).length - 1;

    while (min <= max) {
        let mid = Math.floor((min + max) / 2);

        if (Number(dataArr[mid].isbn) === Number(isbn)) {
            return dataArr[mid];
        }
        else if (Number(dataArr[mid].isbn) < Number(isbn)) {
            max = mid - 1;
        }
        else {
            min = mid + 1;
        }
    }
    return "nothing";
}

