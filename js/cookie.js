function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
// 使用例:
// setCookie('user', 'John', { secure: true, 'max-age': 3600 });

function deleteCookie(name) {
    setCookie(name,"","'max-age'=" + 0);
}



function saveInfo() {
    const options =  {secure: true,'max-age': 14*24*3600 };
    const checkBox = document.getElementById("cookie_check");

    if (checkBox.checked) {
        setCookie("name", document.getElementById("input_name").value, options);
        setCookie("faculty", document.getElementById("select_faculty").value, options);
        setCookie("others_faculty", document.getElementById("others_faculty").value, options);
        setCookie("grade", document.getElementById("select_grade").value, options);
        setCookie("others_grade", document.getElementById("others_grade").value, options);
        setCookie("date", document.getElementById("select_date").value, options);
    } else {
        deleteCookie("name");
        deleteCookie("faculty");
        deleteCookie("others_faculty");
        deleteCookie("grade");
        deleteCookie("others_grade");
        deleteCookie("date");
    }
}

function recallInfo(){
    document.getElementById("input_name").value = getCookie("name")||"";
    document.getElementById("select_faculty").value = getCookie("faculty")||"";
    document.getElementById("others_faculty").value = getCookie("others_faculty")||"";
    document.getElementById("select_grade").value = getCookie("grade")||"";
    document.getElementById("others_grade").value = getCookie("others_grade")||"";
    document.getElementById("select_date").value = getCookie("date")||"";
}