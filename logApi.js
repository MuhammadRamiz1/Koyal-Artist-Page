export const logApi = async (
    { user_id, action_type, operator, phone_number },
    page
) => {
    if (page == "home") {
        await getLocationDetails();
    }
    const url = "https://apiv2.koyal.pk/api/v2/web/subscriber/he-campaign-logs";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id,
            url: window.location.href,
            action_type,
            location_details: localStorage.getItem("location"),
            operator,
            platform_type: localStorage.getItem("device_info"),
            phone_number:phone_number?.startsWith('0') ? '+92' + phone_number?.slice(1) : phone_number,
            campaign_page:'languages'
        }),
    });
};

export function getDeviceInfo() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    // Browser detection
    let browserName = "Unknown";
    if (/Chrome/.test(userAgent) && !/Edge|Edg|OPR/.test(userAgent)) {
        browserName = "Chrome";
    } else if (/Firefox/.test(userAgent)) {
        browserName = "Firefox";
    } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
        browserName = "Safari";
    } else if (/Edg/.test(userAgent)) {
        browserName = "Edge";
    } else if (/OPR/.test(userAgent)) {
        browserName = "Opera";
    }
    // OS detection
    let osName = "Unknown";
    if (/Windows NT 10/.test(userAgent)) osName = "Windows 10";
    else if (/Windows NT 6.1/.test(userAgent)) osName = "Windows 7";
    else if (/Mac OS X/.test(userAgent)) osName = "macOS";
    else if (/Android/.test(userAgent)) osName = "Android";
    else if (/iPhone|iPad/.test(userAgent)) osName = "iOS";
    else if (/Linux/.test(platform)) osName = "Linux";
    // Device type
    const deviceType = /Mobi|Android/i.test(userAgent) ? "Mobile" : "Desktop";
    return {
        browser: browserName,
        operating_system: osName,
        device: deviceType,
    };
}
const getLocationDetails = async () => {

    const info = getDeviceInfo();
    const locResponse = await fetch(
        `https://pro.ip-api.com/json/?key=hhpkcv6Vl7kt8YW`
    );
    const location = await locResponse.json();
    localStorage.setItem(
        "location",
        JSON.stringify({
            ip_address: location?.query,
            city: location?.city,
            state: location?.regionName,
            country: location?.country,
        })
    );
    localStorage.setItem(
        "device_info",
        JSON.stringify({
            device: info.device,
            browser: info.browser,
            operating_system: info.operating_system,
        })
    );
    console.log("loc", location);
};

  




