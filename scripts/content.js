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
    }, 100);
  });
  promise.then((listBalances) => {
    console.log(11111199999);
    const listBreaks = Array.from(
      document.querySelectorAll(
        ".dataCell input:not([style*='display:none']):not([disabled])"
      )
    );
    const listTimes = Array.from(document.querySelectorAll(".dataCell select"));
    listBreaks.forEach((elem) => {
      elem.addEventListener("change", init);
    });
    listTimes.forEach((elem) => {
      elem.addEventListener("change", init);
    });

    if (document.querySelector(".plop") !== null) {
      document
        .querySelector(".pbBody")
        .removeChild(document.querySelector(".plop"));
    }

    const result = listBalances.reduce(calculateBalance, [0, 0]);
    const indicator = document.createElement("p");
    indicator.textContent = `⏱️ You currently have: `;
    indicator.classList.add("plop");
    const hourContainer = document.createElement("span");
    hourContainer.textContent = `${result[0]}h and `;
    const minContainer = document.createElement("span");
    minContainer.textContent = `${result[1]}min`;
    indicator.append(hourContainer, minContainer);
    const container = document.querySelector(".list");
    container.insertAdjacentElement("beforebegin", indicator);
  });
};

const calculateBalance = (acc, val) => {
  if (val.value !== "-8.00") {
    const aa = val.value.split(".");
    acc[0] += +aa[0];
    if (aa[0].includes("-")) {
      acc[1] -= +aa[1];
    } else {
      acc[1] += +aa[1];
    }
    if (acc[1] >= 60) {
      acc[0] += 1;
      acc[1] -= 60;
    }
    if (acc[1] <= -60) {
      acc[0] -= 1;
      acc[1] += 60;
    }
    return acc;
  }
  return acc;
};

init();
