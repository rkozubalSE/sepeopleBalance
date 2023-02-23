const init = () => {
  const promise = new Promise((resolve) => {
    var intervalId = setInterval(() => {
      const result = document.querySelectorAll(
        ".dataRow .dataCell:last-child input"
      );

      if (result.length) {
        clearInterval(intervalId);
        resolve(Array.from(result));
      }
    }, 200);
  });
  promise.then((listBalances) => {
    const listBreaks = Array.from(
      document.querySelectorAll(
        ".dataCell input:not([style*='display:none']):not([disabled])"
      )
    );
    const listTimes = Array.from(document.querySelectorAll(".dataCell select"));
    const listBtns = Array.from(document.querySelectorAll(".btn"));
    const listInteractable = [...listBreaks, ...listTimes];
    listInteractable.forEach((elem) => {
      elem.addEventListener("change", init);
    });
    listBtns.forEach((elem) => {
      elem.addEventListener("mousedown", prepForRefresh);
    });
    if (document.querySelector(".plop") !== null) {
      document
        .querySelector(".pbBody")
        .removeChild(document.querySelector(".plop"));
    }
    const [hours, minutes] = listBalances.reduce(calculateBalance, [0, 0]);
    const indicator = document.createElement("p");
    indicator.textContent = `⏱️ You currently have: `;
    indicator.classList.add("plop");
    const hourContainer = document.createElement("span");
    hourContainer.textContent = `${hours}h and `;
    const minContainer = document.createElement("span");
    minContainer.textContent = `${minutes}min`;
    indicator.append(hourContainer, minContainer);
    const container = document.querySelector(".list");
    container.insertAdjacentElement("beforebegin", indicator);
  });
};

const calculateBalance = (acc, val) => {
  if (val.value !== "-8.00") {
    const [inputHours, inputMinutes] = val.value.split(".");
    let [accHours, accMinutes] = acc;
    accHours += +inputHours;
    if (inputHours.includes("-")) {
      accMinutes -= +inputMinutes;
    } else {
      accMinutes += +inputMinutes;
    }
    if (accMinutes >= 60) {
      accHours += 1;
      accMinutes -= 60;
    }
    if (accMinutes <= -60 || (accHours > 0 && accMinutes < 0)) {
      accHours -= 1;
      accMinutes += 60;
    }
    return [accHours, accMinutes];
  }
  return acc;
};

init();

const prepForRefresh = () => {
  const intervalId = setInterval(() => {
    const listBtns = Array.from(document.querySelectorAll(".btn"));
    const isLoading = listBtns.some((elem) => {
      return elem.value === "Processing...";
    });
    if (!isLoading) {
      clearInterval(intervalId);
      init();
    }
  }, 200);
};
