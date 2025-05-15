
import { AutomationTask, TaskTemplate } from "../types/automation";

export const sampleTasks: AutomationTask[] = [
  {
    id: "1",
    name: "File Organizer",
    description: "Organizes files in Downloads folder by file type",
    code: `import os
import shutil
from datetime import datetime

def organize_files(directory):
    # Get all files in the directory
    files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
    
    # Create folders for different file types
    folders = {
        'Images': ['.jpg', '.jpeg', '.png', '.gif'],
        'Documents': ['.pdf', '.doc', '.docx', '.txt'],
        'Videos': ['.mp4', '.mov', '.avi'],
        'Audio': ['.mp3', '.wav', '.flac']
    }
    
    # Create folders if they don't exist
    for folder in folders:
        folder_path = os.path.join(directory, folder)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
    
    # Move files to appropriate folders
    for file in files:
        file_ext = os.path.splitext(file)[1].lower()
        moved = False
        
        for folder, extensions in folders.items():
            if file_ext in extensions:
                shutil.move(
                    os.path.join(directory, file),
                    os.path.join(directory, folder, file)
                )
                moved = True
                break
                
    return f"Organized {len(files)} files"

# Example usage
downloads_folder = os.path.expanduser("~/Downloads")
organize_files(downloads_folder)`,
    status: "idle",
    lastRun: "2025-05-14T10:30:00Z",
    lastRunDuration: 2.4,
    logs: [
      {
        id: "log1",
        timestamp: "2025-05-14T10:30:00Z",
        level: "info",
        message: "Task started"
      },
      {
        id: "log2",
        timestamp: "2025-05-14T10:30:02Z",
        level: "success",
        message: "Organized 24 files"
      }
    ],
    createdAt: "2025-05-01T08:00:00Z"
  },
  {
    id: "2",
    name: "Daily Website Monitor",
    description: "Checks if websites are online and sends alerts",
    code: `import requests
import time
import smtplib
from email.mime.text import MIMEText

def check_website(url):
    try:
        response = requests.get(url, timeout=10)
        return response.status_code == 200
    except Exception as e:
        return False

def send_alert(website, error):
    # Replace with actual email sending logic
    print(f"ALERT: {website} is down. Error: {error}")
    
websites = [
    "https://example.com",
    "https://google.com",
    "https://github.com"
]

results = {}
for site in websites:
    is_up = check_website(site)
    results[site] = "UP" if is_up else "DOWN"
    if not is_up:
        send_alert(site, "Website not responding")
        
print("Website monitoring complete")
print(results)`,
    status: "success",
    lastRun: "2025-05-15T07:00:00Z",
    lastRunDuration: 5.7,
    schedule: "0 7 * * *",
    logs: [
      {
        id: "log3",
        timestamp: "2025-05-15T07:00:00Z",
        level: "info",
        message: "Starting website check"
      },
      {
        id: "log4",
        timestamp: "2025-05-15T07:00:03Z",
        level: "info",
        message: "Checked example.com: UP"
      },
      {
        id: "log5",
        timestamp: "2025-05-15T07:00:04Z",
        level: "info",
        message: "Checked google.com: UP"
      },
      {
        id: "log6",
        timestamp: "2025-05-15T07:00:05Z",
        level: "info",
        message: "Checked github.com: UP"
      },
      {
        id: "log7",
        timestamp: "2025-05-15T07:00:05Z",
        level: "success",
        message: "All websites are online"
      }
    ],
    createdAt: "2025-04-20T14:23:00Z"
  },
  {
    id: "3",
    name: "Data Backup",
    description: "Backs up important files to cloud storage",
    code: `import os
import shutil
import datetime
import zipfile

def backup_files(source_dir, backup_dir):
    # Create a timestamped backup folder name
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_name = f"backup_{timestamp}"
    zip_path = os.path.join(backup_dir, backup_name + ".zip")
    
    # Create a zip file of all contents
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                # Add file to zip with relative path
                zipf.write(
                    file_path, 
                    os.path.relpath(file_path, source_dir)
                )
    
    return zip_path, os.path.getsize(zip_path)

# Example usage
source_directory = "C:/important_data"
backup_directory = "D:/backups"

# Make sure backup directory exists
if not os.path.exists(backup_directory):
    os.makedirs(backup_directory)
    
# Perform backup
backup_file, size_bytes = backup_files(source_directory, backup_directory)
size_mb = size_bytes / (1024 * 1024)

print(f"Backup created: {backup_file} ({size_mb:.2f} MB)")`,
    status: "error",
    lastRun: "2025-05-14T23:00:00Z",
    lastRunDuration: 45.2,
    schedule: "0 23 * * *",
    logs: [
      {
        id: "log8",
        timestamp: "2025-05-14T23:00:00Z",
        level: "info",
        message: "Starting backup process"
      },
      {
        id: "log9",
        timestamp: "2025-05-14T23:00:32Z",
        level: "warning",
        message: "Large files detected, backup may take longer"
      },
      {
        id: "log10",
        timestamp: "2025-05-14T23:00:45Z",
        level: "error",
        message: "Backup failed: Permission denied for D:/backups"
      }
    ],
    createdAt: "2025-03-10T16:45:00Z"
  }
];

export const taskTemplates: TaskTemplate[] = [
  {
    id: "template1",
    name: "File Organizer",
    description: "Organizes files in a directory by file type",
    category: "File Management",
    code: `import os
import shutil

def organize_files(directory):
    # Get all files in the directory
    files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
    
    # Create folders for different file types
    folders = {
        'Images': ['.jpg', '.jpeg', '.png', '.gif'],
        'Documents': ['.pdf', '.doc', '.docx', '.txt'],
        'Videos': ['.mp4', '.mov', '.avi'],
        'Audio': ['.mp3', '.wav', '.flac']
    }
    
    # Create folders if they don't exist
    for folder in folders:
        folder_path = os.path.join(directory, folder)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
    
    # Move files to appropriate folders
    for file in files:
        file_ext = os.path.splitext(file)[1].lower()
        moved = False
        
        for folder, extensions in folders.items():
            if file_ext in extensions:
                shutil.move(
                    os.path.join(directory, file),
                    os.path.join(directory, folder, file)
                )
                moved = True
                break
                
    return f"Organized {len(files)} files"

# Replace with your directory
directory_to_organize = "/path/to/directory"
organize_files(directory_to_organize)`
  },
  {
    id: "template2",
    name: "Website Monitor",
    description: "Checks if websites are online and logs results",
    category: "Monitoring",
    code: `import requests
import time
from datetime import datetime

def check_website(url):
    try:
        response = requests.get(url, timeout=10)
        return response.status_code == 200
    except Exception as e:
        return False

# List of websites to monitor
websites = [
    "https://example.com",
    "https://google.com",
    "https://github.com"
]

results = {}
for site in websites:
    is_up = check_website(site)
    results[site] = "UP" if is_up else "DOWN"
    
# Log results with timestamp
timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
print(f"=== Website Status Check: {timestamp} ===")
for site, status in results.items():
    print(f"{site}: {status}")
print("="*40)`
  },
  {
    id: "template3",
    name: "CSV Data Processor",
    description: "Reads, processes, and writes CSV data",
    category: "Data Processing",
    code: `import csv
import pandas as pd
from datetime import datetime

# Function to process CSV data
def process_csv(input_file, output_file):
    # Read CSV into pandas DataFrame
    df = pd.read_csv(input_file)
    
    # Example processing: calculate some statistics
    df['Total'] = df['Quantity'] * df['Price']
    
    # Add a processed timestamp
    df['Processed'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Write processed data to new CSV
    df.to_csv(output_file, index=False)
    
    return len(df)

# Replace with your file paths
input_csv = "input.csv"
output_csv = "processed_data.csv"

# Process the CSV file
rows_processed = process_csv(input_csv, output_csv)
print(f"Processing complete: {rows_processed} rows processed")
print(f"Output saved to {output_csv}")`
  },
  {
    id: "template4",
    name: "Email Sender",
    description: "Sends emails using SMTP",
    category: "Communication",
    code: `import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(sender, recipient, subject, body):
    # Create message
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    
    # Add body to email
    msg.attach(MIMEText(body, 'plain'))
    
    # Connect to SMTP server and send email
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        # Replace with your email and app password
        server.login(sender, "your_app_password")
        text = msg.as_string()
        server.sendmail(sender, recipient, text)
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

# Email details
sender_email = "your_email@gmail.com"
recipient_email = "recipient@example.com"
email_subject = "Automated Email"
email_body = """
Hello,

This is an automated email sent by Python.

Best regards,
Your Python Bot
"""

# Send the email
success = send_email(sender_email, recipient_email, email_subject, email_body)
if success:
    print("Email sent successfully")
else:
    print("Failed to send email")`
  }
];
