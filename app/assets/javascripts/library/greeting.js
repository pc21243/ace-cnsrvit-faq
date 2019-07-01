getGreeting = (localHour) => {
    const morning = [4, 5, 6, 7, 8, 9, 10, 11]
    const afternoon = [12, 13, 14, 15, 16]
    const evening = [17, 18, 19, 20]
    const night = [21, 22, 23, 24, 1, 2, 3]

    if (morning.includes(localHour)) {
        return "Good Morning"
    } else if (afternoon.includes(localHour)) {
        return "Good Afternoon"
    } else if (evening.includes(localHour)) {
        return "Good Evening"
    } else if (night.includes(localHour)) {
        return "Good Night"
    } else {
        return "Welcome"
    }
}

// console.log(getGreeting(localHour))