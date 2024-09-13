document.addEventListener("DOMContentLoaded", () => {
    function updateTime() {
        const now = new Date();
        const optionsDate = { month: 'long', day: 'numeric', year: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', optionsDate);
        const timeString = now.toLocaleTimeString('en-US', { hour12: true });
        const timeZones = {
            "America/New_York": "EST",
            "America/Chicago": "CST",
            "America/Denver": "MST",
            "America/Los_Angeles": "PST",
        };
    
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timeZoneAbbr = timeZones[timeZone] || timeZone;
        document.querySelector('.home-panel p').textContent = `${dateString} | ${now.toLocaleDateString()}`;
        document.querySelector('.home-panel:last-of-type p').textContent = `${timeString} (${timeZoneAbbr})`;
        let timePeriod = document.getElementById("timeperiod");
        let hours = now.getHours();
    
        let greeting;
        if (hours >= 5 && hours < 12) {
            greeting = "Good Morning";
        } else if (hours >= 12 && hours < 18) {
            greeting = "Good Afternoon";
        } else if (hours >= 18 && hours < 22) {
            greeting = "Good Evening";
        } else {
            greeting = "Good Night";
        }
        timePeriod.textContent = `${greeting}!`
    }
    
    setInterval(updateTime, 1000);
    updateTime();    
})