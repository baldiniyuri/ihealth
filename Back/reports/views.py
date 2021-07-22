from email.mime.base import MIMEBase
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from email.utils import formatdate
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import csv
import smtplib

email= "sample@email.com"
password = "password"

server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
server.login(email, password)

class ReportView(APIView):
    def post(self, request):
        
        user_email = request.data['email']
        message = "This is your report from IHealth, this is a automatic email, please do not answer."

        data = request.data["data"]
        type = request.data["type"]

        ReportGenerator(data, type)

        file = 'report.csv'
        
        msg = MIMEMultipart()
        msg['From'] = email
        msg['To'] = user_email
        msg['Date'] = formatdate(localtime=True)
        msg['Subject'] = "Report"

        with open(file, "rb") as fil:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(fil.read())
            part.add_header('Content-Disposition', 'attachment', filename=file)
        msg.attach(part)
        msg.attach(MIMEText(message, "plain"))

        server.sendmail(email, user_email, msg.as_string() )

        server.quit()
        
        return Response({"Email sent"}, status=status.HTTP_201_CREATED)





def ReportGenerator(data, type):
    data_values = []

    if type == "pressure":
        header = ["Systolic, Diastolic, Bpm, Hour, Date"]
        for line in data:
            data_values.append([line['systolic_level'], line['diastolic_level'], line['bpm'], line['hour'], line['date_time']])
            print(line)
    
    if type == "glucose":
        header = ["Glucose", "Hour", "Date"]
        for line in data:
            data_values.append([line['glucose_level'],line['hour'], line['date_time']])
        


    if type == "temperature":
        header = ["Temperature", "Hour", "Date"]
        for line in data:
            data_values.append([line['temperature'],line['hour'], line['date_time']])
        
    with open('report.csv', 'w', encoding='UTF8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(header)

        writer.writerows(data_values)