var dataArr;

window.onload = function(){
	getData();
}

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


function titleSearch(srchWord) {
	// const sSs = SpreadsheetApp.openById(sSsId);
	// const sSh = sSs.getSheetByName(sSheetName);
	// const sVals = sSh.getDataRange().getValues();
	// const sLastRow = sVals.length;
	const rows = Object.keys(dataArr).length;

	const regExp = new RegExp(srchWord, 'i');
	let dtls = [];
	let j = 0;

	for (let i = 1; i < rows; i++) {
		if (dataArr[i].title.match(regExp) !== null) {
			// ttlArr.push(j+"."+sVals[i][1]);
			dtls.push(dataArr[i]);
			j = j + 1;
		}
	}

	// ttlArr.unshift(`【${ttlArr.length}件の検索結果】`);
	// return {ttlRslts:ttlArr,ttlDtls:dtls};
	return { row: j, dtls: dtls };
}

function authorSearch(srchWord) {
	const rows = Object.keys(dataArr).length;

	const regExp = new RegExp(srchWord, 'i');
	// let athrArr = [];
	let dtls = [];
	let j = 0;

	for (let i = 1; i < rows; i++) {
		if (dataArr[i].author1.match(regExp) !== null) {
			// athrArr.push(j+"."+sVals[i][1]+"/"+sVals[i][2]);
			dtls.push(dataArr[i]);
			j = j + 1;
		}
	}

	// athrArr.unshift(`【${athrArr.length}件の検索結果】`);
	// return {athrRslts:athrArr,athrDtls:dtls};
	return { row: j, dtls: dtls };
}

function isbnSearch(isbn) {
	let min = 1;
	let max = Object.keys(dataArr).length - 1;

	while (min <= max) {
		let mid = Math.floor((min + max) / 2);

		if (Number(dataArr[mid].isbn) === Number(isbn)) {
			return {row:1,dtls:[dataArr[mid]]};
		}
		else if (Number(dataArr[mid].isbn) < Number(isbn)) {
			max = mid - 1;
		}
		else {
			min = mid + 1;
		}
	}
	return {row:0,dtls:"nothing"};
}

/////////////////////////////////////

let srchWord;
let srchMethod;
let srchBtn;
let resultAccordion;

srchWord = document.getElementById("srchWord");
srchMethod = document.getElementById("srchMethod");
srchBtn = document.getElementById("srchBtn");
resultAccordion = document.getElementById("resultAccordion");

srchBtn.addEventListener('click', function () {
	if (srchWord.value === "") {
		resultAccordion.innerHTML = "キーワードを入力してください";
	}
	else {
		switch (srchMethod.value) {
			case "教科書名":{
				const results = titleSearch(srchWord.value);
				showResults(srchWord.value, results);
			}
			break;

			case "著者名":{
				const results = authorSearch(srchWord.value);
				showResults(srchWord.value, results);
			}
			break;

			case "ISBN":{
				const results = isbnSearch(srchWord.value);
				showResults(srchWord.value, results);
			}
			break;
		}
	}
}, false)

function showResults(srchWord, results) {
	const rowNum = results.row;
	const details = results.dtls;

	let contents = '';
	if (rowNum == 0) {
		contents =
			`<div class="accordion-item">
				<h2 class="accordion-header" id="flush-heading0">
					<button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#flush-collapse0" aria-expanded="false" aria-controls="flush-collapse0">
					<div>キーワードに合致する教科書はありません</div>
					</button>
				</h2>
				<div id="flush-collapse0" class="accordion-collapse collapse" aria-labelledby="flush-heading0" data-bs-parent="#resultAccordion">
					<div class="accordion-body">
						<div>申し訳ありません、${srchWord}に合致する教科書の在庫はありませんでした。</div>
						</div>
					</div>
				</div>
			</div>`;
	}
	else {
		for (let i = 0; i < rowNum; i++) {
			const isbn = details[i].isbn;
			const title = details[i].title;
			const author1 = details[i].author1;
			// const author2 = details[i][3];
			const publisher = details[i].publisher;
			const originalPrice = details[i].originalPrice;
			const sellingPrice = details[i].sellingPrice;
			// const genre = details[i][7];
			const stock = details[i].stock;

			contents = contents +
				`<div class="accordion-item">
					<h2 class="accordion-header" id="flush-heading${i}">
					<button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
						<div class="isbn">${isbn}</div>
						<div class="title">${title}</div>
					</button>
					</h2>
					<div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#resultAccordion">
						<div class="accordion-body">
							<div class="container">
								<div class="row">
									<div class="col-4 col-md-2 accoContent">残り${stock}冊</div>
									<div class="col-8 col-md-4 accoContent">¥${originalPrice}→¥${sellingPrice}</div>
									<div class="col-6 col-md-3 accoContent">${author1}</div>
									<div class="col-6 col-md-3 accoContent">${publisher}</div>
								</div>
							</div>
						</div>
					</div>
				</div>`;

		};
	}
	resultAccordion.innerHTML = contents;
}