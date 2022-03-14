window.onload = function () {
  recallInfo();
  try { getData(); } catch (e) { console.log(e); };
}

document.addEventListener('DOMContentLoaded',function(){
  others("faculty");
  others("grade");
})

function others(type) {
  const textArea = document.getElementById("others_" + type);
  const val = document.getElementById("select_" + type).value;
  if (val === "その他") {
    textArea.removeAttribute("hidden");
    textArea.setAttribute("required",true);
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
        <table>
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
          <td>${result.sellingPrice}</td>
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

