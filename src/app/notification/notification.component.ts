import { Component, OnInit, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
    private connection: signalR.HubConnection | null = null;
    notifications: string[] = [];

    ngOnInit(): void {
        // Initialize SignalR connection
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:44399/notificationHub') // Ensure the route matches backend configuration
            .build();

        // Listen for notifications
        this.connection.on('ReceiveNotification', (message: string) => {
            this.notifications.push(message);

            // Auto-remove notification after 5 seconds
            setTimeout(() => this.removeNotification(message), 5000);
        });

        // Start the SignalR connection
        this.connection.start().catch(err => console.error('SignalR Error:', err));
    }

    // Remove notification from the array
    removeNotification(message: string): void {
        this.notifications = this.notifications.filter(notification => notification !== message);
    }

    // Dismiss notification manually
    dismissNotification(notification: string): void {
        this.removeNotification(notification);
    }

    ngOnDestroy(): void {
        // Stop the connection when the component is destroyed
        this.connection?.stop().catch(err => console.error('SignalR Disconnect Error:', err));
    }
}
