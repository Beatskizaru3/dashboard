
const currentDate = new Date();
console.log("Дата: ", currentDate);
let currentYear = currentDate.getFullYear();
console.log("Год: ", currentYear);
let currentMonth = currentDate.getMonth();
console.log("Месяц: ", currentMonth);
const dayOfWeek = currentDate.getDay();
console.log("Текущий день недели: ", dayOfWeek);
const today = currentDate.getDate();
console.log("Сегодняшнее число: ", today);

const realYear = currentDate.getFullYear();
const realMonth = currentDate.getMonth();
const realDate = currentDate.getDate();


renderCalendar(currentMonth, currentYear);

let startDate = null;
let endDate = null;




const nextBtn = document.querySelector(".personal__widget-navigate--right");
const prevBtn = document.querySelector(".personal__widget-navigate--left");

prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0){
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
})

nextBtn.addEventListener("click", () =>{
    currentMonth++;
    if (currentMonth > 11){
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
})

function renderCalendar(month, year){
    const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    const datesContainer = document.querySelector(".personal__widget-dates");
    datesContainer.innerHTML = "";

    const monthYear = document.querySelector(".personal__widget-month-year");
    monthYear.textContent = `${monthNames[month]} ${year}`;


    const daysInMonth = new Date(year, month + 1, 0).getDate(); 
    console.log("Дней в месяце: ", daysInMonth);
    // получаем количество месяцев в текущем месяце
    // елси укзаать день 0, то вернет количество дней в предидущем месяце
    const startDay = new Date(year, month, 1).getDay();
    console.log("Месяц начинается с (0 = Вс):", startDay);


    for (let i = 0; i < startDay; i++){
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("empty");
        datesContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++){
        const dayInMonth = document.createElement("div");
        const circle = document.createElement("div");
        const textInDay = document.createElement("p");
        textInDay.textContent = day;
        textInDay.classList.add("day-text");
        circle.classList.add("circle");
        dayInMonth.classList.add("personal__widget-day");
        if (day == realDate && month == realMonth && year == realYear){
            dayInMonth.classList.add("today");
            console.log("today applied");
            console.log(day , month, year);
            console.log(today, currentMonth, currentYear);
        }
        dayInMonth.addEventListener("click", () => {
            
            
            
            console.log(day , currentMonth, currentYear);
            if (startDate == null || (startDate !== null && endDate !== null)){
                startDate = new Date(currentYear, currentMonth, day);
                endDate = null;

                clearAllSelections();
                console.log("selectionCleaned");
                markAsStart(dayInMonth, textInDay);
                console.log("start marked")
                console.log("start date: ", startDate, "end date: ", endDate);
            } else if (endDate === null){
                endDate = new Date(currentYear, currentMonth, day);

                if (endDate < startDate){
                    [startDate, endDate] = [endDate, startDate];
                }

                markAsEnd(dayInMonth, textInDay);
                console.log("end marked");
                console.log("start date: ", startDate, "end date: ", endDate);
                highLightRange(startDate, endDate);
               
            }

            
        })
        dayInMonth.appendChild(textInDay)
        datesContainer.appendChild(dayInMonth);

    }

   

    function highLightRange(startDate, endDate){
        const allDays = document.querySelectorAll(".personal__widget-day");
        allDays.forEach(el => {
            const dayText = el.querySelector("p");
            const dayNumber = parseInt(dayText.textContent);
            const cellDate = new Date(currentYear, currentMonth, dayNumber);
    
            if (cellDate > startDate && cellDate < endDate){
                el.classList.add("in-range");
            } else {
                el.classList.remove("in-range");
            }
        })

    }

    function clearAllSelections(){
        const allDays = document.querySelectorAll(".personal__widget-day");
        allDays.forEach(el => {
            el.classList.remove('choosenForDay')
            el.querySelector("p").classList.remove("choosenForText");
        })
    }

    function markAsStart(div, p){
        div.classList.add('choosenForDay');
        p.classList.add('choosenForText');
    }

    function markAsEnd(div, p){
        div.classList.add('choosenForDay');
        p.classList.add('choosenForText');
    }
}
