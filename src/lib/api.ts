export async function fetchDevices() {
  try {
    const response = await fetch("/api/device/listDevice", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    // Ensure we return an array
    if (Array.isArray(data)) {
      return data
    } else if (data && Array.isArray(data.devices)) {
      return data.devices
    } else if (data && Array.isArray(data.data)) {
      return data.data
    } else {
      console.warn("API response is not in expected format:", data)
      throw new Error("Invalid data format from API")
    }
  } catch (error) {
    console.error("Failed to fetch devices:", error)
    
    // Return mock data as fallback
    const { mockDevices } = await import("../data/devicesMock")
    return mockDevices
  }
}