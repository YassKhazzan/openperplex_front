function getCurrentDateContext() {
    // Create a new Date object
    const currentDate = new Date();

    // Format the date as DD/MM/YYYY using 'en-GB' locale
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Get the day of the week using 'en-US' locale for the full day name
    const dayOfWeek = currentDate.toLocaleDateString('en-US', {weekday: 'long'});

    // Format the time as HH:MM AM/PM using 'en-US' locale
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,

    });

    // Return the formatted date and time context string
    return `Today is ${dayOfWeek}, ${formattedDate} and the time is ${formattedTime}`;
}

export default getCurrentDateContext;