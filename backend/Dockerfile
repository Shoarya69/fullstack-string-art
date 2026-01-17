FROM python:3.12.3

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
RUN chmod +x entry.sh
RUN ./entry.sh
CMD ["python", "runDocker.py"]
