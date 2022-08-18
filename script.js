const form = document.querySelector("form");
const Name = document.querySelector(".name");
const City = document.querySelector(".city");
// const EmailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const EmailPattern = new RegExp("[a-z0-9]+@gmail.com");
const Email = document.querySelector(".email");
const feedbackname = document.querySelector(".feedbackname");
const feedbackemail = document.querySelector(".feedbackemail");
const feedbackmobile = document.querySelector(".feedbackmobile");
const Mobile = document.querySelector(".mobile");
const tablebody = document.querySelector(".tablebody");
const tableshow = document.querySelector(".tableshow");
const deletealltablecontent = document.querySelector(".deleteall");

const uniqueId = function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

if (localStorage.getItem("userdbarray")) {
  let userdbarray = JSON.parse(localStorage.getItem("userdbarray"));
  userdbarray.map((e, index) => {
    tablebody.innerHTML += `<tr>  
                  <th scope="row">${index + 1}</th>
                  <td>${e.name}</td>
                  <td>${e.city}</td>
                  <td>${e.email}</td>
                  <td>${e.mobile}</td>
                  <td>${e.status}</td>
                  <td><button type="button" class="btn btn-link btn-sm">Delete</button></td>
                </tr>`;
  });
} else {
  tableshow.classList.add("hidetable");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    feedbackname.classList.contains("valid") &&
    City.value.trim().length > 0 &&
    feedbackemail.classList.contains("valid") &&
    feedbackmobile.classList.contains("valid")
  ) {
    const username = Name.value.trim();
    const usercity = City.value.trim();
    const useremail = Email.value.trim();
    const usermobile = Mobile.value.trim();
    const userstatus = form.status.value.trim();
    if (localStorage.getItem("userdbarray")) {
      const userobject = {
        name: username,
        city: usercity,
        email: useremail,
        mobile: usermobile,
        id: uniqueId(),
        status: userstatus,
      };
      let userdbarray = JSON.parse(localStorage.getItem("userdbarray"));
      userdbarray.push(userobject);
      localStorage.setItem("userdbarray", JSON.stringify(userdbarray));
    } else {
      let userdbarray = [];
      const userobject = {
        name: username,
        city: usercity,
        email: useremail,
        mobile: usermobile,
        id: uniqueId(),
        status: userstatus,
      };
      userdbarray.push(userobject);
      localStorage.setItem("userdbarray", JSON.stringify(userdbarray));
    }
    feedbackname.classList.remove("valid");
    feedbackemail.classList.remove("valid");
    feedbackmobile.classList.remove("valid");
    feedbackname.innerText = `First and Last name (Should be minimum 5 characters long)`;
    feedbackemail.innerText = `Enter a valid email (Gmail)`;
    feedbackmobile.innerText = `Enter a 10 digit mobile number`;
    form.reset();
    let userdblatestarray = JSON.parse(localStorage.getItem("userdbarray"));
    var localHTMLTags = ``;
    userdblatestarray.map((e, index) => {
      localHTMLTags += `<tr>  
      <th scope="row">${index + 1}</th>
      <td>${e.name}</td>
      <td>${e.city}</td>
      <td>${e.email}</td>
      <td>${e.mobile}</td>
      <td>${e.status}</td>
      <td><button type="button" class="btn btn-link btn-sm">Delete</button></td>
    </tr>`;
    });
    tablebody.innerHTML = localHTMLTags;
    tableshow.classList.remove("hidetable");
  } else {
    window.alert("Please enter all form fields");
  }
});

Name.addEventListener("keyup", (e) => {
  if (e.target.value.trim().length >= 5) {
    if (feedbackname.classList.contains("invalid")) {
      feedbackname.classList.remove("invalid");
    }
    if (feedbackname.innerText !== "Valid Name") {
      feedbackname.innerText = `Valid Name`;
    }
    if (!feedbackname.classList.contains("valid")) {
      feedbackname.classList.add("valid");
    }
  } else {
    if (feedbackname.classList.contains("valid")) {
      feedbackname.classList.remove("valid");
    }
    if (!feedbackname.classList.contains("invalid")) {
      feedbackname.classList.add("invalid");
    }
    if (
      feedbackname.innerText !==
      "First and Last name (Should be minimum 5 characters long)"
    ) {
      feedbackname.innerText = `First and Last name (Should be minimum 5 characters long)`;
    }
  }
});

Email.addEventListener("keyup", (e) => {
  if (EmailPattern.test(e.target.value)) {
    if (feedbackemail.classList.contains("invalid")) {
      feedbackemail.classList.remove("invalid");
    }
    if (feedbackemail.innerText !== "Valid Name") {
      feedbackemail.innerText = `Valid Email`;
    }
    if (!feedbackemail.classList.contains("valid")) {
      feedbackemail.classList.add("valid");
    }
  } else {
    if (feedbackemail.classList.contains("valid")) {
      feedbackemail.classList.remove("valid");
    }
    if (!feedbackemail.classList.contains("invalid")) {
      feedbackemail.classList.add("invalid");
    }
    if (feedbackemail.innerText !== "Enter a valid email (Gmail)") {
      feedbackemail.innerText = `Enter a valid email (Gmail)`;
    }
  }
});

Mobile.addEventListener("keyup", (e) => {
  if (e.target.value.length == 10) {
    if (feedbackmobile.classList.contains("invalid")) {
      feedbackmobile.classList.remove("invalid");
    }
    if (feedbackmobile.innerText !== "Valid Name") {
      feedbackmobile.innerText = `Valid Mobile`;
    }
    if (!feedbackmobile.classList.contains("valid")) {
      feedbackmobile.classList.add("valid");
    }
  } else {
    if (feedbackmobile.classList.contains("valid")) {
      feedbackmobile.classList.remove("valid");
    }
    if (!feedbackmobile.classList.contains("invalid")) {
      feedbackmobile.classList.add("invalid");
    }
    if (feedbackmobile.innerText !== "Enter a 10 digit mobile number") {
      feedbackmobile.innerText = `Enter a 10 digit mobile number`;
    }
  }
});

tablebody.addEventListener("click", (e) => {
  // console.log(e.target.parentElement.parentElement.innerText);
  let userdbarray = JSON.parse(localStorage.getItem("userdbarray"));
  let newuserdbarray = userdbarray.filter(
    (element) =>
      !e.target.parentElement.parentElement.innerText.includes(element.mobile)
  );
  if (newuserdbarray.length == 0) {
    localStorage.removeItem("userdbarray");
    tableshow.classList.add("hidetable");
  } else {
    localStorage.setItem("userdbarray", JSON.stringify(newuserdbarray));
    let userdbarray = JSON.parse(localStorage.getItem("userdbarray"));
    let localHTMLTags = ``;
    userdbarray.map((e, index) => {
      localHTMLTags += `<tr>  
                  <th scope="row">${index + 1}</th>
                  <td>${e.name}</td>
                  <td>${e.city}</td>
                  <td>${e.email}</td>
                  <td>${e.mobile}</td>
                  <td>${e.status}</td>
                  <td><button type="button" class="btn btn-link btn-sm">Delete</button></td>
                </tr>`;
    });
    tablebody.innerHTML = localHTMLTags;
  }
});

deletealltablecontent.addEventListener("click", (e) => {
  localStorage.removeItem("userdbarray");
  tableshow.classList.add("hidetable");
});
