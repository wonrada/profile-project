# Project Usage Guide

## Specifications
- Frontend: Angular CLI
- Backend: Nodejs Express
- Database: MongoDB
- Deployment: Docker
- Image Store: minio

## Running the Project

1. ใช้คำสั่ง
```
    docker compose -f "docker-compose.yml" up -d --build 
```
เพื่อรันโปรเจค

2. การตั้งค่า minio policy ให้เข้าไปที่ http://localhost:9000 username: wonrada, password: wonrada1
3. ไปที่เมนู Bugkets ที่แถบด้านซ้ายมือ กดเข้าไปจะเจอ Bugket ที่สร้าง
4. กดเข้าที่ wonrada-bugket
5. กดที่รูปดินสอตรงคำว่า Acess Policy เลือก custom แล้วใส่โค้ดนี้ลงไปแทนที่
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "*"
                ]
            },
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::wonrada-bugket/*"
            ]
        }
    ]
}
```
กด set เป็นอันเสร็จสิ้นการตั้งค่า minio


## Testing

- For frontend testing, access it on port 8080 or go to [frontend test](http://localhost:8000).
- For backend testing, access it on port 3000. you can use Postman or similar tools with the link http://localhost:3000/users/.

## Additional Information

An API Document has been attached for reference. You can access it to understand the endpoints and their functionalities.