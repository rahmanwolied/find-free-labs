const getSchedule = async ()=>{
	try {
		let data = await fetch('schedule.json')
		data = await data.json()
		// console.log(data)
		return data
	} catch (error) {
		console.log("error occured")
	}
}

async function update() {
	const data = await getSchedule();
	console.log(data)
	const schedule = data.schedule;
	const labs = data.labs;

	console.log(schedule);
	console.log('update');
	const currentDate = new Date();
	const currentDay = currentDate.toLocaleString('en-US', { weekday: 'short' }).slice(0, 2);
	let currentTime = currentDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
	console.log(currentDay);
	console.log(currentTime)
	const arr = [];
	currentTime = "11:12 AM"
	console.log(currentTime)
	console.log(typeof currentTime);

	schedule.forEach((course, index) => {
		const days = course.days;

		
		const matchingDay = days.find((day) => day.day === currentDay && convertTo24HourFormat(day.start) <= currentTime && convertTo24HourFormat(day.end) >= currentTime && day.type === 'Lab');
		if (matchingDay) {
			console.log(matchingDay)
			arr.push(matchingDay.room);
		}
	});
	console.log(arr)
	const occupiedLabs = [...new Set(arr)];
	console.log(occupiedLabs)
	const freeLabs = labs.filter((lab) => !occupiedLabs.includes(lab));
	const container = document.querySelector('.container');
	container.innerHTML = '';
	container.innerHTML = `Found ${freeLabs.length} free labs`;
	let i = 0;
	freeLabs.sort().forEach((lab) => {
		container.innerHTML += `<div class="lab">${i}. ${lab}</div>`;
		i++;
	});
}

function convertTo24HourFormat(time12Hour) {
	// Parse the time string into hours and minutes
	const timeParts = time12Hour.split(":");
	const hours = parseInt(timeParts[0]);
	const minutes = parseInt(timeParts[1].split(" ")[0]);
  
	// Determine if it's AM or PM
	const isPM = timeParts[1].includes("PM");
  
	// Convert to 24-hour format
	let hours24 = hours;
	if (isPM && hours !== 12) {
	  hours24 += 12;
	} else if (!isPM && hours === 12) {
	  hours24 = 0;
	}
  
	// Format the time as a string in 24-hour format
	const time24Hour = hours24.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
	return time24Hour;
  }
  
  // Example usage
  const time12Hour = "2:00 PM";
  const time24Hour = convertTo24HourFormat(time12Hour);
  console.log(time24Hour); // Output: "14:00"
  
