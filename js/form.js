window.onload = function () {
  recallInfo();
  try { getData(); } catch (e) { console.log(e); };
}

document.addEventListener('DOMContentLoaded', function () {
  others("faculty");
  others("grade");
})

function others(type) {
  const textArea = document.getElementById("others_" + type);
  const val = document.getElementById("select_" + type).value;
  if (val === "その他") {
    textArea.removeAttribute("hidden");
    textArea.setAttribute("required", true);
  } else {
    textArea.setAttribute("hidden", true);
    textArea.removeAttribute("required");
  }
}

function check(type) {
  const checkBox = document.getElementById(type + "_check");
  const textArea = document.getElementById(type + "_auto");
  // try{console.log(textArea.value);}catch(e){console.log(e)};
  if (textArea.value === "") {
    checkBox.disabled = true;
    checkBox.checked = false;
    textArea.classList.add("is-invalid");
  } else {
    checkBox.disabled = false;
    textArea.classList.remove("is-invalid");
  }
}

function autoComplement() {
  const isbn = document.getElementById("isbn_input").value;
  const result = isbnSearch(isbn).dtls[0];
  document.getElementById("isbnResult").removeAttribute("hidden");

  if (result === "nothing") {
    document.getElementById("title_auto").value = "";
    document.getElementById("author_auto").value = "";
    document.getElementById("isbnResult").innerHTML = "入力されたISBNに対応する教科書が見つかりませんでした。";
  } else {
    document.getElementById("title_auto").value = result.title;
    document.getElementById("author_auto").value = result.author1;
    document.getElementById("isbnResult").innerHTML = "以下の教科書が見つかりました。" +
      `<br>
        <table class="table table-striped table-hover">
        <tbody>
        <tr>
          <td>ISBN</td>
          <td>${result.isbn}</td>
        </tr>
        <tr>
          <td>教科書名</td>
          <td>${result.title}</td>
        </tr>
        <tr>
          <td>第1著者</td>
          <td>${result.author1}</td>
        </tr>
        <tr>
          <td>出版社</td>
          <td>${result.publisher}</td>
        </tr>
        <tr>
          <td>販売額</td>
          <td id="sellingPrice">${result.sellingPrice}</td>
        </tr>
        <tr>
          <td>分野</td>
          <td>${result.genre}</td>
        </tr>
        <tr>
          <td>現時点での残り在庫数</td>
          <td>${result.stock}</td>
        </tr>
      </tbody></table>`;
  }
}

/////////////////////////////////////

// document.getElementById("submit").addEventListener("click", function () {
  const rsvForm = document.getElementById("rsvForm");
  rsvForm.addEventListener("submit",function(){
  const rsvData = {
    "sort":"rsv",
    "name": document.getElementById("input_name").value,
    "faculty": (document.getElementById("select_faculty").value === "その他") ? document.getElementById("others_faculty").value : document.getElementById("select_faculty").value,
    "grade": (document.getElementById("select_grade").value === "その他") ? document.getElementById("others_grade").value : document.getElementById("select_grade").value,
    "isbn": document.getElementById("isbn_input").value,
    "title": document.getElementById("title_auto").value,
    "author1": document.getElementById("author_auto").value,
    "sellingPrice": document.getElementById("sellingPrice").innerHTML || null,
    "date": document.getElementById("select_date").value,
    "mail": document.getElementById("email_input").value
  }

  sendData(rsvData);

  // window.alert("sendData");
  // window.alert(JSON.stringify(rsvData));
  const rsvComplete = document.getElementById("rsvComplete");
  rsvComplete.removeAttribute("hidden");
  rsvComplete.innerHTML =
    `<p font-size="small">ありがとうございます！以下の内容でご予約申し込みを受け付けました。<br>
    残り在庫数を確認の上、ご入力いただいたメールアドレス宛に予約完了／在庫切れのお知らせを送信いたしますのでご確認ください。<br>
    在庫数の確認は1日以内に行う予定ですが、時間がかかる場合もございますので予めご了承ください。</p>
    <br>
      <table class="table table-striped table-hover">
      <tbody>
      <tr>
        <td>お名前</td>
        <td>${rsvData.name}</td>
      </tr>
      <tr>
        <td>所属</td>
        <td>${rsvData.faculty}</td>
      </tr>
      <tr>
        <td>学年</td>
        <td>${rsvData.grade}</td>
      </tr>
      <tr>
        <td>ISBN</td>
        <td>${rsvData.isbn}</td>
      </tr>
      <tr>
        <td>教科書名</td>
        <td id="sellingPrice">${rsvData.title}</td>
      </tr>
      <tr>
        <td>著者名</td>
        <td>${rsvData.author1}</td>
      </tr>
      <tr>
        <td>受取日</td>
        <td>${rsvData.date}</td>
      </tr>
      <tr>
      <td>メールアドレス</td>
      <td>${rsvData.mail}</td>
    </tr>
    </tbody></table>
    <br>
    <button class="btn btn-primary" onclick="nextRsv()">他の教科書を予約する</button>`; // onclick="location.reload()"
  
  rsvComplete.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "start"
  });

}, false);

function nextRsv(){
    saveInfo();
    rsvForm.reset();
    document.getElementById("isbnResult").innerHTML = "";
    rsvComplete.innerHTML = "";
    rsvComplete.setAttribute("hidden", true);
    recallInfo();
    rsvForm.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start"
    });
  }

function sendData(data) {
  fetch(`https://script.google.com/macros/s/AKfycbxMwU-INmESsqo36ibAISYHRAvbq2PWryO4AphSU-bTZ9TrJBgz6tRpcGWbb6nStcx6/exec`,
    {
      "method": "POST",
      "mode": "no-cors",
      "Content-Type": "application/x-www-form-urlencoded",
      "body": JSON.stringify(data)
    });
}