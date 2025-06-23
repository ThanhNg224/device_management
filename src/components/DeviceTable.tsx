"use client"
import { Plus, Eye, Circle, Settings, Download } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Device } from "../types"
import { DeviceDetailsModal } from "./DeviceDetailsModal"

interface DeviceTableProps {
  devices: Device[]
}

export function DeviceTable({ devices }: DeviceTableProps) {
  const [selectedDevice, setSelectedDevice] = React.useState<Device | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleViewDetails = (device: Device) => {
    setSelectedDevice(device)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDevice(null)
  }

  const handleEditDevice = (device: Device) => {
    // Handle edit functionality here
    console.log("Edit device:", device)
    handleCloseModal()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Devices</h1>
          <p className="text-muted-foreground">Manage and monitor your device fleet</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Device
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Device Overview</CardTitle>
          <CardDescription>Current status and performance metrics for all registered devices</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 hover:bg-muted/40">
                  <TableHead className="font-bold text-foreground py-4">Device Code</TableHead>
                  <TableHead className="font-bold text-foreground">Status</TableHead>
                  <TableHead className="font-bold text-foreground">Last Connected</TableHead>
                  <TableHead className="font-bold text-foreground">Location</TableHead>
                  <TableHead className="font-bold text-foreground">Version</TableHead>
                  <TableHead className="font-bold text-foreground">CPU</TableHead>
                  <TableHead className="font-bold text-foreground">RAM</TableHead>
                  <TableHead className="font-bold text-foreground">Temp</TableHead>
                  <TableHead className="font-bold text-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices.map((device, index) => (
                  <TableRow
                    key={device.deviceCode}
                    className={`
                      transition-all duration-200 hover:bg-muted/50 hover:shadow-sm hover:scale-[1.01]
                      ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                    `}
                  >
                    <TableCell className="font-semibold py-3">{device.deviceCode}</TableCell>
                    <TableCell>
                      <Badge
                        variant={device.status === "Online" ? "default" : "destructive"}
                        className={`
                          flex items-center gap-1.5 w-fit font-medium
                          ${
                            device.status === "Online"
                              ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-300"
                              : "bg-red-100 text-red-800 hover:bg-red-200 border-red-300"
                          }
                        `}
                      >
                        <Circle
                          className={`h-2 w-2 fill-current ${device.status === "Online" ? "text-green-600" : "text-red-600"}`}
                        />
                        {device.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground font-mono">{device.lastConnected}</TableCell>
                    <TableCell className="text-sm">{device.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">
                        {device.version}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`
                            text-xs font-semibold border-2
                            ${
                              device.lastPerformance.cpu > 80
                                ? "border-red-300 bg-red-50 text-red-700"
                                : device.lastPerformance.cpu > 60
                                  ? "border-yellow-300 bg-yellow-50 text-yellow-700"
                                  : "border-green-300 bg-green-50 text-green-700"
                            }
                          `}
                        >
                          {device.lastPerformance.cpu}%
                        </Badge>
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`
                              h-full transition-all duration-300 rounded-full
                              ${
                                device.lastPerformance.cpu > 80
                                  ? "bg-gradient-to-r from-red-400 to-red-600"
                                  : device.lastPerformance.cpu > 60
                                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                                    : "bg-gradient-to-r from-green-400 to-green-600"
                              }
                            `}
                            style={{ width: `${device.lastPerformance.cpu}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`
                            text-xs font-semibold border-2
                            ${
                              device.lastPerformance.ram > 80
                                ? "border-red-300 bg-red-50 text-red-700"
                                : device.lastPerformance.ram > 60
                                  ? "border-yellow-300 bg-yellow-50 text-yellow-700"
                                  : "border-green-300 bg-green-50 text-green-700"
                            }
                          `}
                        >
                          {device.lastPerformance.ram}%
                        </Badge>
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`
                              h-full transition-all duration-300 rounded-full
                              ${
                                device.lastPerformance.ram > 80
                                  ? "bg-gradient-to-r from-red-400 to-red-600"
                                  : device.lastPerformance.ram > 60
                                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                                    : "bg-gradient-to-r from-green-400 to-green-600"
                              }
                            `}
                            style={{ width: `${device.lastPerformance.ram}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`
                            text-xs font-semibold border-2
                            ${
                              device.lastPerformance.temp > 80
                                ? "border-red-300 bg-red-50 text-red-700"
                                : device.lastPerformance.temp > 60
                                  ? "border-orange-300 bg-orange-50 text-orange-700"
                                  : "border-blue-300 bg-blue-50 text-blue-700"
                            }
                          `}
                        >
                          {device.lastPerformance.temp}°C
                        </Badge>
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`
                              h-full transition-all duration-300 rounded-full
                              ${
                                device.lastPerformance.temp > 80
                                  ? "bg-gradient-to-r from-red-400 to-red-600"
                                  : device.lastPerformance.temp > 60
                                    ? "bg-gradient-to-r from-orange-400 to-orange-600"
                                    : "bg-gradient-to-r from-blue-400 to-blue-600"
                              }
                            `}
                            style={{ width: `${Math.min(device.lastPerformance.temp, 100)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          title="View Details"
                          onClick={() => handleViewDetails(device)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                          title="Edit Configuration"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 transition-colors"
                          title="Update Version"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <DeviceDetailsModal
        device={selectedDevice}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEditDevice}
      />
    </div>
  )
}
