const getSchedule = fetch('schedule.json')
	.then((response) => response.json())
	.then((data) => {
		return data;
	})

	.catch((error) => {
		// Handle error if the file could not be loaded or parsed
		console.error(error);
	});

async function update() {
	const data = await getSchedule;
	const schedule = data.schedule;
	const labs = data.labs;

	console.log(schedule);
	console.log('update');
	const currentDate = new Date();
	const currentDay = currentDate.toLocaleString('en-US', { weekday: 'short' }).slice(0, 2);
	const currentTime = currentDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
	console.log(currentTime);
	console.log(currentDay);
	const arr = [];

	schedule.forEach((course) => {
		const days = course.days;
		const matchingDay = days.find((day) => day.day === currentDay && day.start <= currentTime && day.end >= currentTime && day.type === 'Lab');
		if (matchingDay) {
			arr.push(matchingDay.room);
		}
	});
	const occupiedLabs = [...new Set(arr)];
	const freeLabs = labs.filter((lab) => !occupiedLabs.includes(lab));
	// const freeLabs = ['wolied', 'likes', 'sex'];
	const container = document.querySelector('.container');
	container.innerHTML = '';
	container.innerHTML = `Found ${freeLabs.length} free labs`;
	let i = 0;
	freeLabs.sort().forEach((lab) => {
		container.innerHTML += `<div class="lab">${i}. ${lab}</div>`;
		i++;
	});
}
