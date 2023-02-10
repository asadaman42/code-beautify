// const daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// const tableBody = document.getElementById("table-body")
// daysName.map((day, index) => {
//     let tr = document.createElement("tr");
//     tr.innerHTML = `<th scope="row">${day}</th>
//                     <td>
//                         <form>
//                             <input class='text-center p-0' type="number" min="1" max="12" name="start-hour" id="start-hour" value="8" style="width: 40px;">
//                             :
//                             <input class='text-center p-0' type="number" min="0" max="59" name="start-minute" id="start-minute" value="00" style="width: 40px;">
//                             <select name="start-am-pm" id="start-am-pm">
//                                 <option value="AM">AM</option>
//                                 <option value="PM">PM</option>
//                             </select>
//                         </form>
//                     </td>

//                     <td>
//                         <form>
//                             <input class='text-center p-0' type="number" min="1" max="12" name="end-hour" id="end-hour" value=${index+5} style="width: 40px;">
//                             :
//                             <input class='text-center p-0' type="number" min="0" max="59" name="end-minute" id="end-minute" value="00" style="width: 40px;">
//                             <select name="end-am-pm" id="end-am-pm">
//                                 <option value="AM">AM</option>
//                                 <option selected value="PM">PM</option>
//                             </select>
//                         </form>
//                     </td>

//                     <td>
//                         <form>
//                             <input class='text-center p-0' type="number" min="1" max="12" name="break-deduction-hours" id="break-deduction-hours" value=${Math.floor(Math.random()*10)} style="width: 40px;">
//                             :
//                             <input class='text-center p-0' type="number" min="0" max="59" name="break-deduction-minutes" id="break-deduction-minutes" value="00" style="width: 40px;">                            
//                         </form>
//                     </td>

//                     <td>
//                         <p id="total"> 00:00> </p>
//                     </td>`;
//     tableBody.appendChild(tr);
// });



const calculateBtn = document.getElementById('calculate');
const clearAllBtn = document.getElementById('clear-all');

const startHours = document.querySelectorAll('#start-hour');
const startMinute = document.querySelectorAll('#start-minute');
const startAmPm = document.querySelectorAll('#start-am-pm')
const endHour = document.querySelectorAll('#end-hour');
const endMinute = document.querySelectorAll('#end-minute');
const endAmPm = document.querySelectorAll('#end-am-pm')
const breakHour = document.querySelectorAll('#break-deduction-hours');
const breakMinute = document.querySelectorAll('#break-deduction-minutes');
const totals = document.querySelectorAll('#total')
const totalHour = document.getElementById('total-hour');

const calculateTime = () => {
    let hourArr = [];
    let minuteArr = [];

    const setUpTime = (endDate, startDate, index) => {
        const difference = endDate.getTime() - startDate.getTime();
        const hours = Math.floor(difference / 1000 / 60 / 60) - breakHour[index].value;
        const minutes = Math.floor(difference / 1000 / 60) % 60 - breakMinute[index].value;
        const total = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        hourArr.push(hours);
        minuteArr.push(minutes);
        totals[index].innerText = total;
    }


    startHours.forEach((startHour, index) => {

        if (startAmPm[index].value === "PM" &&  startHours[index].value > 0) {
            const modifiedStartHour = parseInt(startHours[index].value) + 12;
            console.log("start Checking")
            const startDate = new Date(0, 0, 0, modifiedStartHour, startMinute[index].value, 0);
            const endDate = new Date(0, 0, 0, endHour[index].value, endMinute[index].value, 0);
            setUpTime(endDate, startDate, index);
        }
        else if (endAmPm[index].value === "PM" && endHour[index].value > 0) {
            const modifiedEndHour = parseInt(endHour[index].value) + 12;
            console.log('end Chking', modifiedEndHour)
            const startDate = new Date(0, 0, 0, startHours[index].value, startMinute[index].value, 0);
            const endDate = new Date(0, 0, 0, modifiedEndHour, endMinute[index].value, 0);
            setUpTime(endDate, startDate, index);
        }
        else {
            const startDate = new Date(0, 0, 0, startHours[index].value, startMinute[index].value, 0);
            const endDate = new Date(0, 0, 0, endHour[index].value, endMinute[index].value, 0);
            setUpTime(endDate, startDate, index);
        }

    })

    const totalHours = hourArr.reduce((x, y) => {
        return x + y
    });

    const totalMinutes = minuteArr.reduce((x, y) => {
        return x + y
    });

    totalHour.innerText = `${totalHours}:${totalMinutes < 10 ? '0' : ''}${totalMinutes}`;
}

const clearAll = () => {
    const allInput = document.getElementsByTagName("input");
    const allInputArr = [...allInput];
    allInputArr.map(input => {
        input.value = 0;
        calculateTime();
    })
}

calculateBtn.addEventListener('click', calculateTime);
clearAllBtn.addEventListener('click', clearAll);
calculateTime();