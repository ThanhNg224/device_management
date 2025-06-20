export interface Device {
  deviceCode: string
  status: "Online" | "Offline"
  lastConnected: string
  location: string
  version: string
  lastPerformance: {
    cpu: number
    ram: number
    temp: number
  }
  // Additional fields for modal
  unitCompany: string
  deviceName: string
  description: string
  imei: string
  serverAddress: string
  macAddress: string
  temperatureThreshold: number
  faceThreshold: number
  distance: number
  language: string
  area: string
  autoReboot: boolean
  soundEnabled: boolean
  ledEnabled: boolean
}

export interface DeviceLog {
  deviceCode: string
  eventType: string
  personId: string
  time: string
  result: string
  similarity: string
  note: string
}

export interface NavItem {
  title: string
  icon: any
  id: string
}
