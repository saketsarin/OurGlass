var inc = 1000;
clock();
function clock() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const tdate = date.getDate();
  const day = date.getDay();
  const hours = ((date.getHours() + 11) % 12) + 1;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const hour = hours * 30;
  const minute = minutes * 6;
  const second = seconds * 6;
  const h = hours < 10 ? "0" + hours : hours;
  const m = minutes < 10 ? "0" + minutes : minutes;
  const tmonth = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );
  const tday = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  document.querySelector(".hours").innerHTML = h;
  document.querySelector(".mins").innerHTML = m;
  document.querySelector(".hour").style.transform = `rotate(${hour}deg)`;
  document.querySelector(".minute").style.transform = `rotate(${minute}deg)`;
  document.querySelector(".second").style.transform = `rotate(${second}deg)`;
  document.querySelector(".dateMonthYear").innerHTML =
    tdate + " " + tmonth[month].slice(0, 3) + " " + year;
  document.querySelector(".dayMonthYear").innerHTML =
    tday[day] + ", " + tmonth[month] + " " + year;
}

setInterval(clock, inc);

const setDarkMode = (active = false) => {
  const wrapper = document.querySelector(":root");
  if (active) {
    wrapper.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    wrapper.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
};

navigator.getBattery().then((battery) => {
  batteryNum = battery.level * 100 + "%";
  document.querySelector(".batteryNum").innerHTML = batteryNum;
});

const toggleDarkMode = () => {
  const theme = document.querySelector(":root").getAttribute("data-theme");
  // If the current theme is "light", we want to activate dark
  setDarkMode(theme === "light");
};

const initDarkMode = () => {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const themePreference = localStorage.getItem("theme");

  let active = query.matches;
  if (themePreference === "dark") {
    active = true;
  }
  if (themePreference === "light") {
    active = false;
  }

  setDarkMode(active);

  query.addListener((e) => setDarkMode(e.matches));

  const toggleButton = document.querySelector(".js__dark-mode-toggle");
  toggleButton.addEventListener("click", toggleDarkMode);
};

initDarkMode();
