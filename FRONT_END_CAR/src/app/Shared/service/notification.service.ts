import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:5096/api/Notification'; // Update with your API base URL

  constructor(private http: HttpClient) {}
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching notifications', error);
        throw error; // Rethrow or handle the error accordingly
      })
    );
  }

  // Mark a notification as read
  markAsRead(notificationId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/MarkAsRead/${notificationId}`, {}).pipe(
      catchError((error) => {
        console.error('Error marking notification as read', error);
        throw error; // Rethrow or handle the error accordingly
      })
    );
  }
}
