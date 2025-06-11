#!/usr/bin/env python3
"""
Notification Generator Cron Job
Run this script periodically to generate notifications automatically
"""

import requests
import schedule
import time
import os
from datetime import datetime

# Configuration
API_BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:3000')
ADMIN_KEY = os.getenv('NOTIFICATION_ADMIN_KEY', 'generate_notifications_2024')

def generate_notifications():
    """Generate notifications by calling the API"""
    try:
        print(f"🔔 [{datetime.now()}] Running notification generator...")
        
        url = f"{API_BASE_URL}/api/notifications/generate"
        response = requests.get(url, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success: {data.get('message', 'Notifications generated')}")
            print(f"📊 Total created: {data.get('totalCreated', 0)}")
        else:
            print(f"❌ Error: HTTP {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Network error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

def main():
    """Main function to set up scheduled jobs"""
    print("🚀 Starting Notification Cron Job Service")
    print(f"📡 API Base URL: {API_BASE_URL}")
    
    # Schedule jobs
    schedule.every(30).minutes.do(generate_notifications)  # Every 30 minutes
    schedule.every().hour.at(":00").do(generate_notifications)  # Every hour
    schedule.every().day.at("09:00").do(generate_notifications)  # Daily at 9 AM
    schedule.every().day.at("18:00").do(generate_notifications)  # Daily at 6 PM
    
    print("⏰ Scheduled jobs:")
    print("  - Every 30 minutes")
    print("  - Every hour")
    print("  - Daily at 9:00 AM")
    print("  - Daily at 6:00 PM")
    
    # Run once immediately
    generate_notifications()
    
    # Keep running
    print("🔄 Cron job is running... Press Ctrl+C to stop")
    try:
        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute
    except KeyboardInterrupt:
        print("\n👋 Cron job stopped")

if __name__ == "__main__":
    main()
