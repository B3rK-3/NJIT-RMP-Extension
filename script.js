instructorElements = document.querySelectorAll(".sec-table > tbody > tr");

const insertDiv = (row, index) => {
    //skip if done already
    if (row.dataset.processed) return;
    row.dataset.processed = true;
    //create the div
    const div = document.createElement("div");
    div.textContent = "RMP: ";
    div.style.position = "absolute";
    div.style.background = "white";
    div.style.padding = "5px";
    div.style.width = "100px";
    div.style.height = "75px";
    div.style.borderRadius = "4px";
    div.style.border = "1px solid black";
    div.style.boxShadow = "1px 1.5px 3px gray";
    div.style.display = "none";
    div.id = `hover-div-${index}`;
    div.dataset.hovering = false;

    document.body.appendChild(div);

    const updatePosition = () => {
        if (div.style.display === "block") {
            const rect = row.getBoundingClientRect();
            div.style.left = `${rect.left + window.scrollX + rect.width / 3 - 20}px`;
            div.style.top = `${rect.top + window.scrollY - rect.height - 65}px`;
        }
    }

    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    let isHoveredOverRowOrDiv = false;

    const showDiv = () => {
        isHoveredOverRowOrDiv = true;
        div.style.display = "block";
        updatePosition();
    };

    const hideDiv = () => {
        if (!isHoveredOverRowOrDiv) {
            div.style.display = "none";
        }
    };

    row.addEventListener("mouseover", showDiv);
    row.addEventListener("mouseout", () => {
        isHoveredOverRowOrDiv = false;
        setTimeout(hideDiv, 5); // Small delay to allow hover transition
    });

    div.addEventListener("mouseover", () => {
        isHoveredOverRowOrDiv = true;
    });

    div.addEventListener("mouseout", () => {
        isHoveredOverRowOrDiv = false;
        setTimeout(hideDiv, 5); // Small delay to allow hover transition
    });

}
check = () => {
    instructorElements = document.querySelectorAll(".sec-table > tbody > tr");

    if (instructorElements.length === 0) {
        setTimeout(check, 1000);
    }
    else {
        instructorElements.forEach((element, index) => {
            insertDiv(element, index);
        })
    }
}
//keep checking if the page has table that could have professors
//until found
check();
console.log("found trs");


