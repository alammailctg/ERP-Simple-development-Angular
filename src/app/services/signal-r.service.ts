import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root', // Automatically provides this service application-wide
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  constructor() {}

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44399/salesOrderHub') // Update with your actual SignalR hub endpoint
      .withAutomaticReconnect() // Automatically reconnect if the connection is lost
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection established'))
      .catch(err => console.error('SignalR connection error:', err));
  }

  public listenForUpdates(updateCallback: () => void) {
    this.hubConnection.on('ReceiveSalesOrderUpdate', () => {
      console.log('Real-time update received');
      updateCallback();
    });
  }
}
