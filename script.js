const boxMain = document.getElementById("boxMain");
const email = document.getElementById("email");
const form = document.getElementById("form");
const showMore = document.getElementById("showMore");
const alert = document.getElementsByClassName("alert");
const example = document.querySelectorAll(".exampleEmail");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const values = separateEmail(email);
  if (values == null) {
    showMore.style.display = "none";
    showMore.innerText = "Mais exemplos";
    example.forEach((elem) => {
      elem.classList.remove("active");
    });
    alert[0].classList.remove("error");
    alert[0].classList.remove("success");
    return;
  }

  const result = testEmail(values);

  if (result) {
    showMore.style.display = "none";
    showMore.innerText = "Mais exemplos";
    example.forEach((elem) => {
      elem.classList.remove("active");
    });
    alert[0].innerHTML = "E-mail válido!";
    alert[0].classList.add("success");
    alert[0].classList.remove("error");
    const hidden = await hiddenResp();

    if (hidden) {
      alert[0].classList.remove("success");
    }
  } else {
    alert[0].classList.add("error");
    showMore.style.display = "block";
    alert[0].innerHTML =
      "E-mail inválido!<br/>Siga este formato:<br/>seuemail@domínio";
  }
});

let hidden = false;
showMore.addEventListener("click", function () {
  if (!hidden) {
    hidden = true;
    this.innerText = "Esconder";

    example.forEach((elem) => {
      elem.classList.add("active");
    });
  } else {
    hidden = false;
    this.innerText = "Mais exemplos";

    example.forEach((elem) => {
      elem.classList.remove("active");
    });
  }
});

function separateEmail(elem) {
  if (elem.value == "") return null;
  const first = elem.value.substring(0, elem.value.indexOf("@"));

  const buffer = elem.value.substring(
    elem.value.indexOf("@") + 1,
    elem.value.length,
  );

  const middle = buffer.substring(buffer.indexOf("@") + 1, buffer.indexOf("."));

  const finish = buffer.substring(buffer.indexOf(".") + 1, buffer.length);

  const merge = {
    first,
    middle,
    finish,
  };
  return merge;
}

function testEmail(obj) {
  const regex = /\W|[0-9]/;
  if (obj.first) {
    if (obj.middle && !regex.test(obj.middle)) {
      console.log(obj.finish);

      if (obj.finish) {
        const arr = obj.finish.split(".");
        let block = true;
        arr.forEach((val) => {
          if (block) {
            if (regex.test(val)) {
              block = false;
            } else {
              if (val.length < 2) {
                block = false;
              }
            }
          }
        });
        return block;
      } else {
      }
    }
  }
  return false;
}

function hiddenResp() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3500);
  });
}
